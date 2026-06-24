import { kv } from '@vercel/kv'
import { allProducts, searchProducts } from '../src/data/catalog'

type ChatRole = 'user' | 'assistant'

interface ChatbotApiPayload {
  clientId: string
  sessionId: string
  messages: Array<{ role: ChatRole; content: string }>
  userContext: {
    path: string
  }
}

function utcDayKey(d: Date): string {
  // YYYY-MM-DD in UTC.
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(
    2,
    '0',
  )}`
}

function secondsUntilUtcMidnight(now: Date): number {
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0))
  return Math.max(1, Math.floor((next.getTime() - now.getTime()) / 1000))
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    return undefined
  }
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })

    const body = (await request.json()) as Partial<ChatbotApiPayload>
    const clientId = body.clientId
    const messages = body.messages
    const userPath = body.userContext?.path

    if (!clientId || !Array.isArray(messages) || typeof userPath !== 'string') {
      return new Response('Bad request', { status: 400 })
    }

    // ---- Daily rate limit (5 chat requests/day per browser/device) ----
    const limit = 5
    const now = new Date()
    const dayKey = utcDayKey(now)
    const countKey = `chatLimit:${clientId}:${dayKey}`

    // Initialize if needed.
    const current = (await kv.get<number>(countKey)) ?? 0
    if (current >= limit) {
      return new Response(JSON.stringify({ error: 'CHAT_LIMIT', limit }), {
        status: 429,
        headers: { 'content-type': 'application/json' },
      })
    }

    // Increment and set TTL so it auto-resets tomorrow.
    await kv.set(countKey, current + 1, { ex: secondsUntilUtcMidnight(now) })

    // ---- Grounded retrieval from local catalog ----
    const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content?.trim() ?? ''
    const query = lastUser.length ? lastUser : 'decorative statues home decor'

    const matches = searchProducts(allProducts, query).slice(0, 6)
    const productContext = matches
      .map(
        (p) =>
          `- id: ${p.id}\n  name: ${p.name}\n  description: ${p.description}\n  categories: ${p.categories.join(', ')}`,
      )
      .join('\n')

    const shopPath = '/shop'
    const categoryFallback = matches[0]?.categories?.[0] ? `/category/${matches[0].categories[0]}` : '/shop'

    const systemPrompt =
      'You are a helpful shopping assistant for Shivraj Enterprises. You MUST only recommend products from the provided product context. ' +
      'If the user asks for something not in the context, do not invent products; instead guide them to browse the shop/categories and suggest WhatsApp enquiry. ' +
      'Return ONLY valid JSON with this shape: ' +
      '{ "replyText": string, "recommendedProductIds": string[], "navigationPaths": Array<{ "path": string, "label": string }> }. ' +
      'navigationPaths must include at least one path when guidance is needed. ' +
      'Keep replyText concise and friendly.'

    const openAiModel = process.env.OPENAI_MODEL ?? 'gpt-4o-mini'
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Missing OPENAI_API_KEY' }), { status: 500 })
    }

    const payloadForModel = {
      model: openAiModel,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content:
            `User message:\n${lastUser}\n\n` +
            `Current page path: ${userPath}\n\n` +
            `Product context (choose only from these):\n${productContext}\n\n` +
            `Available navigation shortcuts:\n- ${shopPath}\n- ${categoryFallback}\n`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.4,
    }

    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payloadForModel),
    })

    if (!aiRes.ok) {
      const errText = await aiRes.text().catch(() => '')
      return new Response(JSON.stringify({ error: 'AI request failed', details: errText }), { status: 502 })
    }

    const aiJson = (await aiRes.json()) as any
    const content = aiJson?.choices?.[0]?.message?.content
    if (typeof content !== 'string') {
      return new Response(JSON.stringify({ error: 'AI response invalid' }), { status: 502 })
    }

    const parsed = safeJsonParse(content) as any
    const replyText = typeof parsed?.replyText === 'string' ? parsed.replyText : 'Thanks — I can help you find a suitable item.'
    const recommendedProductIds = Array.isArray(parsed?.recommendedProductIds)
      ? parsed.recommendedProductIds.filter((x: unknown) => typeof x === 'string')
      : []
    const navigationPaths = Array.isArray(parsed?.navigationPaths)
      ? parsed.navigationPaths
          .map((x: any) => ({
            path: typeof x?.path === 'string' ? x.path : shopPath,
            label: typeof x?.label === 'string' ? x.label : 'Browse shop',
          }))
          .slice(0, 3)
      : []

    return new Response(
      JSON.stringify({
        replyText,
        recommendedProductIds,
        navigationPaths,
      }),
      { headers: { 'content-type': 'application/json' } },
    )
  },
}

