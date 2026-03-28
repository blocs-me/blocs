export type QuoteMode = 'daily' | 'random' | 'custom'

export type Quote = {
  text: string
  author: string
  category?: string
}

export type QuoteWidgetConfig = {
  mode: QuoteMode
  theme: 'light' | 'dark'
  showAuthor: boolean
  categories: string[]
  fontSize: 'sm' | 'md' | 'lg'
  textAlign: 'left' | 'center'
  quoteColor: string
  authorColor: string
  customQuotes: { text: string; author: string }[]
}

export function getDefaultConfig(): QuoteWidgetConfig {
  return {
    mode: 'daily',
    theme: 'light',
    showAuthor: true,
    categories: [],
    fontSize: 'md',
    textAlign: 'center',
    quoteColor: '',
    authorColor: '',
    customQuotes: []
  }
}

export function encodeCustomQuotes(quotes: { text: string; author: string }[]): string {
  if (!quotes.length) return ''
  return btoa(encodeURIComponent(JSON.stringify(quotes)))
}

export function decodeCustomQuotes(encoded: string): { text: string; author: string }[] {
  if (!encoded) return []
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)))
  } catch {
    return []
  }
}

export function configFromParams(params: URLSearchParams): QuoteWidgetConfig {
  const defaults = getDefaultConfig()
  const catParam = params.get('cat')

  return {
    mode: (params.get('mode') as QuoteMode) || defaults.mode,
    theme: (params.get('theme') as 'light' | 'dark') || defaults.theme,
    showAuthor: params.get('showAuthor') !== '0',
    categories: catParam ? catParam.split(',').filter(Boolean) : [],
    fontSize: (params.get('fontSize') as 'sm' | 'md' | 'lg') || defaults.fontSize,
    textAlign: (params.get('align') as 'left' | 'center') || defaults.textAlign,
    quoteColor: params.get('quoteColor') || '',
    authorColor: params.get('authorColor') || '',
    customQuotes: decodeCustomQuotes(params.get('quotes') || '')
  }
}

export function configToParams(config: QuoteWidgetConfig): string {
  const params = new URLSearchParams()

  if (config.mode !== 'daily') params.set('mode', config.mode)
  if (config.theme !== 'light') params.set('theme', config.theme)
  if (!config.showAuthor) params.set('showAuthor', '0')
  if (config.categories.length) params.set('cat', config.categories.join(','))
  if (config.fontSize !== 'md') params.set('fontSize', config.fontSize)
  if (config.textAlign !== 'center') params.set('align', config.textAlign)
  if (config.quoteColor) params.set('quoteColor', config.quoteColor)
  if (config.authorColor) params.set('authorColor', config.authorColor)
  const encoded = encodeCustomQuotes(config.customQuotes)
  if (encoded) params.set('quotes', encoded)

  return params.toString()
}

export function configToEmbedUrl(config: QuoteWidgetConfig): string {
  const params = configToParams(config)
  return params ? `https://blocs.me/quote?${params}` : 'https://blocs.me/quote'
}
