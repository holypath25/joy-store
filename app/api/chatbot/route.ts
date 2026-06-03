import { CATALOG_PRODUCTS } from '@/lib/catalog'

interface AnthropicMessage {
  role: 'user' | 'assistant'
  content: string
}

const CATALOG_CONTEXT = CATALOG_PRODUCTS.map((p) => ({
  id: p.id,
  name: p.name,
  brandKo: p.brandKo,
  category: p.categoryLabel,
  description: p.description,
  indications: p.indications,
}))

const SYSTEM_PROMPT = `당신은 JOY(조이몰)의 제품 추천 어시스턴트 "조이"입니다. JOY는 한국 의료 미용 제품을 전문으로 하는 B2B 도매 공급업체입니다.

사용자가 피부 고민이나 건강 고민을 설명하면, 아래 제품 카탈로그에서 가장 적합한 제품을 1~3개 추천하세요.

[제품 카탈로그]
${JSON.stringify(CATALOG_CONTEXT, null, 2)}

응답 형식:
1. 고민에 대한 간단한 공감 또는 설명 (1~2문장)
2. 추천 제품과 추천 이유

반드시 응답 마지막에 아래 형식으로 JSON을 포함하세요:
<recommendations>
[{"id": "제품ID", "name": "제품명", "reason": "이 고민에 맞는 이유 (20자 이내)"}]
</recommendations>

규칙:
- 한국어로 답변 (사용자가 영어로 쓰면 영어로)
- 간결하고 전문적인 어조 유지
- 카탈로그에 없는 제품은 절대 추천하지 말 것
- 의학적 진단이 아닌 제품 안내임을 명심할 것`

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || apiKey.startsWith('sk-ant-xxx')) {
    return Response.json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' }, { status: 500 })
  }

  let body: { message: string; history: AnthropicMessage[] }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const { message, history = [] } = body
  if (!message?.trim()) {
    return Response.json({ error: '메시지를 입력해 주세요.' }, { status: 400 })
  }

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
      system: SYSTEM_PROMPT,
      messages,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Anthropic API error:', err)
    return Response.json({ error: 'AI 서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' }, { status: 502 })
  }

  const data = await res.json()
  const rawText: string = data.content?.[0]?.text ?? ''

  const match = rawText.match(/<recommendations>([\s\S]*?)<\/recommendations>/)
  let recommendations: { id: string; name: string; reason: string }[] = []
  if (match) {
    try {
      recommendations = JSON.parse(match[1].trim())
    } catch {
      recommendations = []
    }
  }

  const displayText = rawText.replace(/<recommendations>[\s\S]*?<\/recommendations>/, '').trim()

  return Response.json({ text: displayText, recommendations }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
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
