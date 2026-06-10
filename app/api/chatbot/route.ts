import { getAllProducts } from '@/lib/products'

interface AnthropicMessage {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM_PROMPT_BASE = `당신은 조이몰(JOY)의 제품 추천 AI 어시스턴트입니다.

사용자가 피부 고민이나 건강 고민을 설명하면, 아래 [현재 등록된 제품 목록]에서만 골라서 1~3개 추천하세요.

규칙:
- 목록에 없는 제품은 절대 추천하지 말 것
- 추천 시 반드시 제품의 slug를 정확히 사용할 것
- 한국어로 답변 (사용자가 영어로 쓰면 영어로)
- 간결하고 친근한 어조
- 의학적 진단이 아닌 제품 안내임을 명심할 것

응답 형식:
1. 고민에 대한 공감 (1~2문장)
2. 추천 제품과 이유

반드시 응답 마지막에 아래 JSON 블록을 포함하세요:
<recommendations>
[{"slug": "정확한-제품-slug", "name": "제품명", "reason": "추천 이유 20자 이내", "category": "카테고리"}]
</recommendations>`

export async function POST(request: Request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || apiKey.startsWith('sk-ant-xxx')) {
    return Response.json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' }, { status: 500, headers: corsHeaders })
  }

  let body: { message: string; history: AnthropicMessage[] }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: '잘못된 요청입니다.' }, { status: 400, headers: corsHeaders })
  }

  const { message, history = [] } = body
  if (!message?.trim()) {
    return Response.json({ error: '메시지를 입력해 주세요.' }, { status: 400, headers: corsHeaders })
  }

  // Shopify에서 실제 등록된 제품 가져오기 (1시간 캐시)
  const products = await getAllProducts()
  const catalogContext = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.subcategory || p.category,
    description: p.shortDescription,
    tags: p.tags,
  }))

  if (catalogContext.length === 0) {
    return Response.json({ error: '등록된 제품이 없습니다.' }, { status: 500, headers: corsHeaders })
  }

  const systemPrompt = `${SYSTEM_PROMPT_BASE}

[현재 등록된 제품 목록]
${JSON.stringify(catalogContext, null, 2)}`

  const messages: AnthropicMessage[] = [
    ...history.slice(-6),
    { role: 'user', content: message.trim() },
  ]

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Anthropic API error:', err)
    return Response.json({ error: 'AI 서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' }, { status: 502, headers: corsHeaders })
  }

  const data = await res.json()
  const rawText: string = data.content?.[0]?.text ?? ''

  const match = rawText.match(/<recommendations>([\s\S]*?)<\/recommendations>/)
  let recommendations: { slug: string; name: string; reason: string; category: string }[] = []
  if (match) {
    try {
      const parsed = JSON.parse(match[1].trim())
      // slug가 실제 제품 목록에 있는 것만 필터링
      const validSlugs = new Set(products.map((p) => p.slug))
      recommendations = parsed.filter((r: { slug: string }) => validSlugs.has(r.slug))
    } catch {
      recommendations = []
    }
  }

  const displayText = rawText.replace(/<recommendations>[\s\S]*?<\/recommendations>/, '').trim()

  return Response.json({ text: displayText, recommendations }, { headers: corsHeaders })
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
