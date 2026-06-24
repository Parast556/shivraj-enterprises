import type { FormEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useProducts } from '../../context/ProductsContext'
import AddToCartButton from '../AddToCartButton'
import type { Product } from '../../types'
import { getProductEnquiryUrl } from '../../utils/whatsapp'

type ChatRole = 'user' | 'assistant'

interface ChatMessage {
  id: string
  role: ChatRole
  text: string
  recommendedProductIds?: string[]
  navigationPaths?: Array<{ path: string; label: string }>
}

interface ChatbotApiPayload {
  clientId: string
  sessionId: string
  messages: Array<{ role: ChatRole; content: string }>
  userContext: {
    path: string
  }
}

interface ChatbotApiResponse {
  replyText: string
  recommendedProductIds?: string[]
  navigationPaths?: Array<{ path: string; label: string }>
}

const FIRST_OPEN_SESSION_KEY = 'shivraj-chatbot-first-opened'
const CLIENT_ID_KEY = 'shivraj-chatbot-client-id'

function getClientId(): string {
  try {
    const existing = localStorage.getItem(CLIENT_ID_KEY)
    if (existing) return existing
    const id = crypto.randomUUID()
    localStorage.setItem(CLIENT_ID_KEY, id)
    return id
  } catch {
    // Extremely defensive fallback for older browsers / blocked storage.
    const id = `client_${Date.now()}_${Math.random().toString(16).slice(2)}`
    return id
  }
}

function getWhatsAppFallbackUrl(): string {
  // Keep it simple: a direct WhatsApp chat; user can explain their query.
  return 'https://wa.me/919917202763'
}

export default function ChatbotWidget() {
  const location = useLocation()
  const { products } = useProducts()

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [limitReached, setLimitReached] = useState(false)

  const [clientId, setClientId] = useState<string>('')
  const [sessionId, setSessionId] = useState<string>('')

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')

  const listEndRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const recommendedProducts = useMemo(() => {
    const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant')
    if (!lastAssistant?.recommendedProductIds?.length) return []
    const byId = new Map(products.map((p) => [p.id, p]))
    return lastAssistant.recommendedProductIds.map((id) => byId.get(id)).filter((p): p is Product => Boolean(p))
  }, [messages, products])

  const enquiryUrl = useMemo(() => {
    const first = recommendedProducts[0]
    if (first) return getProductEnquiryUrl(first)
    return getWhatsAppFallbackUrl()
  }, [recommendedProducts])

  useEffect(() => {
    setClientId(getClientId())
  }, [])

  useEffect(() => {
    // Keep the message list pinned to the latest message.
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    listEndRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'end',
    })
  }, [messages, isOpen])

  useEffect(() => {
    if (!isOpen) return
    inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeChat()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const injectFirstTimeGreeting = () => {
    const hasOpened = sessionStorage.getItem(FIRST_OPEN_SESSION_KEY) === 'true'
    if (hasOpened) return

    // Mark as opened for this browser session.
    sessionStorage.setItem(FIRST_OPEN_SESSION_KEY, 'true')

    const greeting: ChatMessage = {
      id: `a_${Date.now()}`,
      role: 'assistant',
      text:
        'Hi! I can help you find the right decorative statue or home decor piece. What are you looking for?',
    }

    const suggestedChips: ChatMessage = {
      id: `a_${Date.now()}_suggested`,
      role: 'assistant',
      text: 'Try one of these:',
    }

    setMessages([greeting, suggestedChips])
  }

  const startNewSession = () => {
    setLimitReached(false)
    setMessages([])
    try {
      setSessionId(crypto.randomUUID())
    } catch {
      setSessionId(`sess_${Date.now()}_${Math.random().toString(16).slice(2)}`)
    }
    // Show greeting after the new session is created.
    injectFirstTimeGreeting()
  }

  const openChat = () => {
    if (!sessionId) startNewSession()
    setIsOpen(true)
  }

  const closeChat = () => {
    // Create a fresh “chat” next time the user opens the widget.
    setIsOpen(false)
    setSessionId('')
    setMessages([])
    setInput('')
  }

  const suggestedPrompts = [
    'Help me choose a statue for a temple',
    'Show me categories / browse the shop',
    'I want to enquire about a specific item',
  ]

  const sendMessage = async (content: string) => {
    if (!clientId || !sessionId) return
    const trimmed = content.trim()
    if (!trimmed) return
    if (limitReached) return
    if (isLoading) return

    const userMsg: ChatMessage = { id: `u_${Date.now()}`, role: 'user', text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    const payload: ChatbotApiPayload = {
      clientId,
      sessionId,
      messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.text })),
      userContext: { path: location.pathname },
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        // Common case: daily quota reached.
        if (res.status === 429) {
          setLimitReached(true)
          setMessages((prev) => [
            ...prev,
            {
              id: `a_limit_${Date.now()}`,
              role: 'assistant',
              text: 'Sorry — you’ve reached today’s chat limit. I can still help you on WhatsApp.',
            },
          ])
          return
        }

        throw new Error(`Request failed (${res.status})`)
      }

      const data = (await res.json()) as ChatbotApiResponse

      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: 'assistant',
          text: data.replyText,
          recommendedProductIds: data.recommendedProductIds,
          navigationPaths: data.navigationPaths,
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `a_err_${Date.now()}`,
          role: 'assistant',
          text: 'Something went wrong while getting help. Please try again in a moment.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isLoading || limitReached) return
    void sendMessage(input)
  }

  return (
    <>
      {/* Minimized widget button */}
      {!isOpen && (
        <button
          type="button"
          onClick={openChat}
          className="fixed bottom-6 right-6 z-[300] flex h-12 w-12 items-center justify-center rounded-full bg-forest text-white shadow-float transition-all hover:scale-[1.03] active:scale-100"
          aria-label="Open product assistant"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.418-4.03 8-9 8a10.77 10.77 0 01-4.69-1.03L3 20l1.11-3.31A7.4 7.4 0 012 12c0-4.418 4.03-8 9-8s10 3.582 10 8z" />
          </svg>
        </button>
      )}

      {/* Open state */}
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-end justify-end">
          {/* lightweight backdrop; keeps it non-intrusive */}
          <div className="absolute inset-0 z-0 bg-black/0" onClick={closeChat} />

          <section
            className="relative z-10 w-full max-w-[380px] rounded-t-3xl bg-white shadow-card md:bottom-6 md:right-6 md:top-auto md:rounded-2xl"
            role="dialog"
            aria-label="Product assistant chat"
          >
            <header className="flex items-center justify-between border-b border-forest/[0.08] px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-forest">Product Assistant</p>
                <p className="truncate text-xs text-forest/55">Ask about statues, decor, and gifts</p>
              </div>
              <button
                type="button"
                onClick={closeChat}
                className="rounded-full px-3 py-2 text-sm font-medium text-forest/60 hover:bg-forest/[0.06] hover:text-forest"
              >
                Close
              </button>
            </header>

            <div className="max-h-[65vh] overflow-y-auto px-4 py-4" role="log" aria-live="polite">
              {messages.length === 0 ? (
                <p className="text-sm text-forest/55">How can I help you today?</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {messages.map((m) => (
                    <div key={m.id} className={m.role === 'user' ? 'self-end max-w-[85%]' : 'self-start max-w-[85%]'}>
                      <div
                        className={
                          m.role === 'user'
                            ? 'rounded-2xl bg-forest px-4 py-2 text-sm text-white shadow-soft'
                            : 'rounded-2xl border border-forest/[0.08] bg-white px-4 py-2 text-sm text-forest shadow-soft'
                        }
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {recommendedProducts.length > 0 && (
                    <div className="mt-2 grid grid-cols-1 gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">Recommended</p>
                      {recommendedProducts.slice(0, 3).map((p, idx) => (
                        <div
                          key={p.id}
                          className="flex items-center gap-3 rounded-2xl border border-forest/[0.06] bg-white p-3"
                          style={{ animationDelay: `${Math.min(idx * 60, 240)}ms` }}
                        >
                          <div className="h-14 w-12 overflow-hidden rounded-xl bg-beige-dark">
                            <img src={p.image} alt={p.name} className="h-full w-full object-contain" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <Link to={`/products/${p.id}`} className="block truncate font-display text-sm font-semibold text-forest">
                              {p.name}
                            </Link>
                            <p className="mt-1 line-clamp-2 text-xs text-forest/55">{p.description}</p>
                          </div>
                          <div>
                            <AddToCartButton product={p} variant="icon" />
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Link to="/shop" className="btn-outline mt-3 flex-1 !py-2 !px-4 text-center">
                          Browse more
                        </Link>
                        <a
                          href={enquiryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gold mt-3 flex-1 !py-2 !px-4 text-center"
                        >
                          Enquire on WhatsApp
                        </a>
                      </div>
                    </div>
                  )}

                  <div ref={listEndRef} />
                </div>
              )}

              {limitReached && (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-700">Daily limit reached.</p>
                  <p className="mt-1 text-xs text-red-700/80">You can continue via WhatsApp.</p>
                  <a
                    href={getWhatsAppFallbackUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold mt-3 inline-flex w-full justify-center"
                  >
                    Continue on WhatsApp
                  </a>
                </div>
              )}
            </div>

            {!limitReached && (
              <form onSubmit={handleSubmit} className="border-t border-forest/[0.08] px-4 py-3">
                {/* Suggested prompts for first-time visitors */}
                {messages.length <= 2 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {suggestedPrompts.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => void sendMessage(p)}
                        className="rounded-full border border-forest/10 bg-white px-3 py-1 text-xs font-medium text-forest/70 hover:bg-forest/[0.04]"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about products…"
                    className="flex-1 rounded-full border border-forest/[0.10] bg-white px-4 py-2 text-sm text-forest shadow-soft outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                    disabled={isLoading}
                    aria-label="Chat input"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white shadow-soft transition-all disabled:cursor-not-allowed disabled:bg-forest/40"
                  >
                    {isLoading ? '…' : 'Send'}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  )
}

