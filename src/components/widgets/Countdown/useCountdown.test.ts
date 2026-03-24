import { computeCountdown, autoDetectUnits } from './useCountdown'

describe('computeCountdown', () => {
  it('computes days, hours, minutes, seconds for a future date', () => {
    const now = new Date('2026-03-24T12:00:00Z')
    const end = new Date('2026-03-26T14:30:45Z')
    const result = computeCountdown(now, end, false)

    expect(result.totalMs).toBeGreaterThan(0)
    expect(result.isPast).toBe(false)
    expect(result.parts.days).toBe(2)
    expect(result.parts.hours).toBe(2)
    expect(result.parts.minutes).toBe(30)
    expect(result.parts.seconds).toBe(45)
  })

  it('returns all zeros when end date equals now', () => {
    const now = new Date('2026-03-24T12:00:00Z')
    const result = computeCountdown(now, now, false)

    expect(result.totalMs).toBe(0)
    expect(result.isPast).toBe(false)
    expect(result.parts.days).toBe(0)
    expect(result.parts.hours).toBe(0)
    expect(result.parts.minutes).toBe(0)
    expect(result.parts.seconds).toBe(0)
  })

  it('returns zeros for a past date when countUp is false', () => {
    const now = new Date('2026-03-26T12:00:00Z')
    const end = new Date('2026-03-24T12:00:00Z')
    const result = computeCountdown(now, end, false)

    expect(result.isPast).toBe(true)
    expect(result.parts.days).toBe(0)
    expect(result.parts.hours).toBe(0)
    expect(result.parts.minutes).toBe(0)
    expect(result.parts.seconds).toBe(0)
  })

  it('counts up from a past date when countUp is true', () => {
    const now = new Date('2026-03-26T14:30:45Z')
    const end = new Date('2026-03-24T12:00:00Z')
    const result = computeCountdown(now, end, true)

    expect(result.isPast).toBe(true)
    expect(result.parts.days).toBe(2)
    expect(result.parts.hours).toBe(2)
    expect(result.parts.minutes).toBe(30)
    expect(result.parts.seconds).toBe(45)
  })

  it('handles large differences with years, months, weeks', () => {
    const now = new Date('2026-03-24T00:00:00Z')
    const end = new Date('2028-06-15T00:00:00Z')
    const result = computeCountdown(now, end, false)

    expect(result.parts.years).toBeGreaterThanOrEqual(2)
    expect(result.totalMs).toBeGreaterThan(0)
  })

  it('computes weeks correctly', () => {
    const now = new Date('2026-03-24T00:00:00Z')
    const end = new Date('2026-04-14T00:00:00Z') // exactly 21 days = 3 weeks
    const result = computeCountdown(now, end, false)

    expect(result.parts.weeks).toBe(3)
    expect(result.parts.days).toBe(0)
  })
})

describe('autoDetectUnits', () => {
  it('shows only hours, minutes, seconds for a few-hour countdown', () => {
    const parts = { years: 0, months: 0, weeks: 0, days: 0, hours: 3, minutes: 15, seconds: 30 }
    const units = autoDetectUnits(parts)

    expect(units).toEqual(['hours', 'minutes', 'seconds'])
  })

  it('shows days, hours, minutes, seconds for a multi-day countdown', () => {
    const parts = { years: 0, months: 0, weeks: 0, days: 5, hours: 2, minutes: 0, seconds: 30 }
    const units = autoDetectUnits(parts)

    expect(units).toEqual(['days', 'hours', 'minutes', 'seconds'])
  })

  it('shows weeks and below for a multi-week countdown', () => {
    const parts = { years: 0, months: 0, weeks: 3, days: 2, hours: 0, minutes: 0, seconds: 0 }
    const units = autoDetectUnits(parts)

    expect(units).toEqual(['weeks', 'days', 'hours', 'minutes', 'seconds'])
  })

  it('shows years and below for a multi-year countdown', () => {
    const parts = { years: 2, months: 3, weeks: 1, days: 2, hours: 5, minutes: 30, seconds: 0 }
    const units = autoDetectUnits(parts)

    expect(units).toEqual(['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'])
  })

  it('shows at least minutes and seconds even for zero diff', () => {
    const parts = { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
    const units = autoDetectUnits(parts)

    expect(units).toEqual(['minutes', 'seconds'])
  })

  it('shows only minutes and seconds for a sub-hour countdown', () => {
    const parts = { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 45, seconds: 10 }
    const units = autoDetectUnits(parts)

    expect(units).toEqual(['minutes', 'seconds'])
  })
})
