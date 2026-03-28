import { useState, useCallback } from 'react'
import type { Quote, QuoteMode } from './quoteConfig'
import allQuotes from './quotes.json'

const FALLBACK_QUOTE: Quote = {
  text: 'The only way to do great work is to love what you do.',
  author: 'Steve Jobs'
}

export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  return Math.floor(diff / 86400000)
}

export function selectQuote(
  quotes: Quote[],
  mode: QuoteMode,
  date: Date,
  categories?: string[]
): Quote {
  let pool = quotes.length ? quotes : [FALLBACK_QUOTE]

  if (categories?.length) {
    const filtered = pool.filter(q => q.category && categories.includes(q.category))
    if (filtered.length) pool = filtered
  }

  if (mode === 'random') {
    return pool[Math.floor(Math.random() * pool.length)]
  }

  // daily: deterministic based on day of year
  const day = getDayOfYear(date)
  return pool[day % pool.length]
}

type UseQuoteConfig = {
  mode: QuoteMode
  categories: string[]
  customQuotes: { text: string; author: string }[]
}

export function useQuote(config: UseQuoteConfig) {
  const { mode, categories, customQuotes } = config
  const pool = mode === 'custom' && customQuotes.length ? customQuotes : allQuotes

  const [quote, setQuote] = useState(() =>
    selectQuote(pool, mode, new Date(), categories)
  )

  const refresh = useCallback(() => {
    setQuote(selectQuote(pool, 'random', new Date(), categories))
  }, [pool, categories])

  return { quote, refresh }
}
