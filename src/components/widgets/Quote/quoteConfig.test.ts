import {
  getDefaultConfig,
  configFromParams,
  configToParams,
  encodeCustomQuotes,
  decodeCustomQuotes,
  QuoteWidgetConfig
} from './quoteConfig'

describe('quoteConfig', () => {
  describe('getDefaultConfig', () => {
    it('returns daily mode centered with author shown', () => {
      const config = getDefaultConfig()
      expect(config.mode).toBe('daily')
      expect(config.showAuthor).toBe(true)
      expect(config.textAlign).toBe('center')
      expect(config.fontSize).toBe('md')
      expect(config.categories).toEqual([])
      expect(config.customQuotes).toEqual([])
    })
  })

  describe('encodeCustomQuotes / decodeCustomQuotes', () => {
    it('roundtrips custom quotes', () => {
      const quotes = [
        { text: 'Hello world', author: 'Me' },
        { text: 'Goodbye world', author: 'Also Me' }
      ]
      const encoded = encodeCustomQuotes(quotes)
      expect(encoded).toBeTruthy()
      expect(decodeCustomQuotes(encoded)).toEqual(quotes)
    })

    it('handles empty array', () => {
      expect(encodeCustomQuotes([])).toBe('')
      expect(decodeCustomQuotes('')).toEqual([])
    })

    it('handles invalid base64 gracefully', () => {
      expect(decodeCustomQuotes('not-valid-base64!!!')).toEqual([])
    })

    it('handles quotes with special characters', () => {
      const quotes = [
        { text: "It's a beautiful day — isn't it?", author: 'José García' }
      ]
      const encoded = encodeCustomQuotes(quotes)
      expect(decodeCustomQuotes(encoded)).toEqual(quotes)
    })
  })

  describe('configFromParams / configToParams roundtrip', () => {
    it('roundtrips a full config', () => {
      const config: QuoteWidgetConfig = {
        ...getDefaultConfig(),
        mode: 'random',
        theme: 'dark',
        showAuthor: false,
        categories: ['motivation', 'wisdom'],
        fontSize: 'lg',
        textAlign: 'left',
        quoteColor: '#ff0000',
        authorColor: '#00ff00',
        customQuotes: []
      }

      const params = configToParams(config)
      const restored = configFromParams(new URLSearchParams(params))

      expect(restored.mode).toBe('random')
      expect(restored.theme).toBe('dark')
      expect(restored.showAuthor).toBe(false)
      expect(restored.categories).toEqual(['motivation', 'wisdom'])
      expect(restored.fontSize).toBe('lg')
      expect(restored.textAlign).toBe('left')
      expect(restored.quoteColor).toBe('#ff0000')
      expect(restored.authorColor).toBe('#00ff00')
    })

    it('roundtrips config with custom quotes', () => {
      const config: QuoteWidgetConfig = {
        ...getDefaultConfig(),
        mode: 'custom',
        customQuotes: [
          { text: 'Test quote', author: 'Tester' }
        ]
      }

      const params = configToParams(config)
      const restored = configFromParams(new URLSearchParams(params))

      expect(restored.mode).toBe('custom')
      expect(restored.customQuotes).toEqual(config.customQuotes)
    })

    it('roundtrips defaults with minimal params', () => {
      const config = getDefaultConfig()
      const params = configToParams(config)
      expect(params).toBe('')

      const restored = configFromParams(new URLSearchParams(params))
      expect(restored.mode).toBe('daily')
      expect(restored.showAuthor).toBe(true)
      expect(restored.categories).toEqual([])
    })
  })

  describe('configToParams', () => {
    it('omits default values', () => {
      const config = getDefaultConfig()
      const params = configToParams(config)
      expect(params).toBe('')
    })
  })
})
