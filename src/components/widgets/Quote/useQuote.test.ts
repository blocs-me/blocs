import { selectQuote, getDayOfYear } from './useQuote'
import type { Quote } from './quoteConfig'

const testQuotes: Quote[] = [
  { text: 'Quote A', author: 'Author A', category: 'motivation' },
  { text: 'Quote B', author: 'Author B', category: 'wisdom' },
  { text: 'Quote C', author: 'Author C', category: 'productivity' },
  { text: 'Quote D', author: 'Author D', category: 'motivation' },
  { text: 'Quote E', author: 'Author E', category: 'creativity' }
]

describe('getDayOfYear', () => {
  it('returns 1 for January 1', () => {
    expect(getDayOfYear(new Date(2026, 0, 1))).toBe(1)
  })

  it('returns 365 for December 31 (non-leap year)', () => {
    expect(getDayOfYear(new Date(2026, 11, 31))).toBe(365)
  })

  it('returns 60 for March 1 in non-leap year', () => {
    expect(getDayOfYear(new Date(2026, 2, 1))).toBe(60)
  })
})

describe('selectQuote', () => {
  describe('daily mode', () => {
    it('returns the same quote for the same date', () => {
      const date = new Date(2026, 2, 28)
      const q1 = selectQuote(testQuotes, 'daily', date)
      const q2 = selectQuote(testQuotes, 'daily', date)
      expect(q1).toEqual(q2)
    })

    it('returns a different quote for a different date', () => {
      const q1 = selectQuote(testQuotes, 'daily', new Date(2026, 2, 28))
      const q2 = selectQuote(testQuotes, 'daily', new Date(2026, 2, 29))
      // With 5 quotes, adjacent days will differ (87 % 5 !== 88 % 5)
      expect(q1).not.toEqual(q2)
    })

    it('returns a valid quote from the list', () => {
      const q = selectQuote(testQuotes, 'daily', new Date(2026, 5, 15))
      expect(testQuotes).toContainEqual(q)
    })
  })

  describe('random mode', () => {
    it('returns a valid quote from the list', () => {
      const q = selectQuote(testQuotes, 'random', new Date())
      expect(testQuotes).toContainEqual(q)
    })
  })

  describe('with category filter', () => {
    it('returns only quotes from filtered categories', () => {
      const filtered = testQuotes.filter(q => q.category === 'motivation')
      for (let day = 0; day < 10; day++) {
        const q = selectQuote(testQuotes, 'daily', new Date(2026, 0, day + 1), ['motivation'])
        expect(q.category).toBe('motivation')
      }
    })

    it('falls back to full list if filter matches nothing', () => {
      const q = selectQuote(testQuotes, 'daily', new Date(2026, 2, 28), ['nonexistent'])
      expect(testQuotes).toContainEqual(q)
    })
  })

  describe('empty list', () => {
    it('returns a fallback quote', () => {
      const q = selectQuote([], 'daily', new Date())
      expect(q.text).toBeTruthy()
      expect(q.author).toBeTruthy()
    })
  })
})
