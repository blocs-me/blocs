import {
  computeManualProgress,
  computeDateRangeProgress,
  computeCalendarProgress
} from './useProgressBar'

describe('computeManualProgress', () => {
  it('computes percentage from current, startValue, and total', () => {
    expect(computeManualProgress(50, 0, 100)).toBe(50)
    expect(computeManualProgress(75, 0, 100)).toBe(75)
  })

  it('accounts for non-zero startValue', () => {
    // 30 out of range 20..100 = 10/80 = 12.5%
    expect(computeManualProgress(30, 20, 100)).toBe(12.5)
  })

  it('returns 0 when current equals startValue', () => {
    expect(computeManualProgress(20, 20, 100)).toBe(0)
  })

  it('returns 100 when current equals total', () => {
    expect(computeManualProgress(100, 0, 100)).toBe(100)
  })

  it('clamps to 0-100', () => {
    expect(computeManualProgress(-5, 0, 100)).toBe(0)
    expect(computeManualProgress(150, 0, 100)).toBe(100)
  })

  it('handles decimal values', () => {
    const result = computeManualProgress(2.5, 0, 10)
    expect(result).toBe(25)
  })

  it('returns 0 when total equals startValue (division by zero)', () => {
    expect(computeManualProgress(5, 5, 5)).toBe(0)
  })
})

describe('computeDateRangeProgress', () => {
  it('returns 0 before start date', () => {
    const now = new Date('2026-03-01T00:00:00Z')
    const start = new Date('2026-04-01T00:00:00Z')
    const end = new Date('2026-06-30T00:00:00Z')
    expect(computeDateRangeProgress(now, start, end)).toBe(0)
  })

  it('returns 100 after end date', () => {
    const now = new Date('2026-07-15T00:00:00Z')
    const start = new Date('2026-04-01T00:00:00Z')
    const end = new Date('2026-06-30T00:00:00Z')
    expect(computeDateRangeProgress(now, start, end)).toBe(100)
  })

  it('returns ~50 at midpoint', () => {
    const start = new Date('2026-01-01T00:00:00Z')
    const end = new Date('2026-01-11T00:00:00Z')
    const mid = new Date('2026-01-06T00:00:00Z')
    expect(computeDateRangeProgress(mid, start, end)).toBe(50)
  })

  it('returns 0 when start equals end', () => {
    const d = new Date('2026-01-01T00:00:00Z')
    expect(computeDateRangeProgress(d, d, d)).toBe(0)
  })
})

describe('computeCalendarProgress', () => {
  it('returns percentages for year, month, week, day', () => {
    // Use a local-time date to avoid UTC offset issues
    const now = new Date(2026, 2, 24, 12, 0, 0) // March 24, noon local
    const result = computeCalendarProgress(now)

    expect(result.year).toBeGreaterThan(0)
    expect(result.year).toBeLessThan(100)
    expect(result.month).toBeGreaterThan(0)
    expect(result.month).toBeLessThan(100)
    expect(result.week).toBeGreaterThan(0)
    expect(result.week).toBeLessThan(100)
    expect(result.day).toBe(50) // noon = exactly 50%
  })

  it('returns 0 for day at midnight', () => {
    const now = new Date(2026, 0, 1, 0, 0, 0) // Jan 1, midnight local
    expect(computeCalendarProgress(now).day).toBe(0)
  })
})
