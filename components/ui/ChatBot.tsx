'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import Link from 'next/link'
import { CATALOG_PRODUCTS } from '@/lib/catalog'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Recommendation {
  id: string
  name: string
  reason: string
}

interface ChatResponse {
  text: string
  recommendations: Recommendation[]
  error?: string
}

const QUICK_SUGGESTIONS = ['주름 개선', '피부 탄력', '여드름 흉터', '볼 볼륨', '피부 재생']

function getProduct(id: string) {
  return CATALOG_PRODUCTS.find((p) => p.id === id)
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [lastRecs, setLastRecs] = useState<Recommendation[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return
    const trimmed = text.trim()
    setInput('')
    setLastRecs([])

    const userMsg: Message = { role: 'user', content: trimmed }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: messages }),
      })
      const data: ChatResponse = await res.json()
      const assistantText = data.error ?? data.text ?? '죄송합니다. 다시 시도해 주세요.'
      setMessages([...nextMessages, { role: 'assistant', content: assistantText }])
      setLastRecs(data.recommendations ?? [])
    } catch {
      setMessages([...nextMessages, { role: 'assistant', content: '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#4db8b8] hover:bg-[#3da8a8] text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="피부 고민 상담"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">AI</span>
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-100 transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
        style={{ width: '380px', maxWidth: 'calc(100vw - 24px)', height: '580px', maxHeight: 'calc(100svh - 80px)' }}
        role="dialog"
        aria-label="JOY 제품 추천 챗봇"
      >
        {/* Header */}
        <div className="bg-[#0f2340] text-white px-5 py-4 rounded-t-2xl flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4db8b8] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              J
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight">JOY 제품 추천</p>
              <p className="text-white/50 text-xs">피부·건강 고민을 입력하세요</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            aria-label="닫기"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {messages.length === 0 && (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#4db8b8]/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-[#4db8b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <p className="text-ink text-sm font-medium mb-1">안녕하세요! 저는 조이예요 👋</p>
              <p className="text-ink-muted text-xs leading-relaxed mb-5">피부 고민이나 건강 고민을 알려주시면<br />맞춤 제품을 추천해 드릴게요.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {QUICK_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs bg-[#f0fafa] text-[#008080] border border-[#4db8b8]/30 px-3 py-1.5 rounded-full hover:bg-[#4db8b8]/20 transition-colors font-medium"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-[#4db8b8] flex-shrink-0 flex items-center justify-center text-white font-bold text-xs mr-2 mt-0.5">
                  J
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-[#0f2340] text-white rounded-br-sm'
                    : 'bg-slate-50 text-ink rounded-bl-sm border border-slate-100'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-6 h-6 rounded-full bg-[#4db8b8] flex-shrink-0 flex items-center justify-center text-white font-bold text-xs mr-2 mt-0.5">
                J
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 bg-[#4db8b8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[#4db8b8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[#4db8b8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* Product recommendation cards */}
          {lastRecs.length > 0 && (
            <div className="space-y-2 pt-1">
              <p className="text-xs text-ink-faint font-medium px-1">추천 제품</p>
              {lastRecs.map((rec) => {
                const product = getProduct(rec.id)
                if (!product) return null
                return (
                  <Link
                    key={rec.id}
                    href={`/products/${rec.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 bg-white border border-slate-100 hover:border-[#4db8b8] rounded-xl p-3 transition-all hover:shadow-sm group"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex-shrink-0 flex items-end px-2 pb-1"
                      style={{ backgroundColor: product.imageColor }}
                    >
                      <span className="text-white font-bold text-[8px] leading-tight truncate">{product.name}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-ink text-sm leading-tight">{product.name}</p>
                      <p className="text-xs text-ink-muted mt-0.5 truncate">{rec.reason}</p>
                      <p className="text-[10px] text-ink-faint mt-0.5">{product.categoryLabel}</p>
                    </div>
                    <svg
                      className="w-4 h-4 text-ink-faint group-hover:text-[#008080] flex-shrink-0 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )
              })}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-100 flex-shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="피부 고민을 입력하세요..."
              className="flex-1 text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4db8b8]/50 focus:border-[#4db8b8] transition-all bg-white placeholder:text-ink-faint"
              disabled={loading}
              maxLength={300}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-10 h-10 bg-[#4db8b8] hover:bg-[#3da8a8] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
              aria-label="전송"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
          <p className="text-[10px] text-ink-faint text-center mt-2">AI 추천은 참고용이며 의학적 진단이 아닙니다.</p>
        </div>
      </div>
    </>
  )
}
