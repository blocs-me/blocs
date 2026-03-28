import { formatTime, formatDate } from './useClock'

describe('formatTime', () => {
  it('formats in 12h with seconds', () => {
    const date = new Date('2026-03-28T14:05:09Z')
    const result = formatTime(date, { format: '12h', showSeconds: true, timezone: 'UTC' })

    expect(result.hours).toBe('2')
    expect(result.minutes).toBe('05')
    expect(result.seconds).toBe('09')
    expect(result.ampm).toBe('PM')
  })

  it('formats in 24h without seconds', () => {
    const date = new Date('2026-03-28T14:05:09Z')
    const result = formatTime(date, { format: '24h', showSeconds: false, timezone: 'UTC' })

    expect(result.hours).toBe('14')
    expect(result.minutes).toBe('05')
    expect(result.seconds).toBe(undefined)
    expect(result.ampm).toBe(undefined)
  })

  it('formats midnight as 12 in 12h mode', () => {
    const date = new Date('2026-03-28T00:00:00Z')
    const result = formatTime(date, { format: '12h', showSeconds: false, timezone: 'UTC' })

    expect(result.hours).toBe('12')
    expect(result.ampm).toBe('AM')
  })

  it('formats noon as 12 PM in 12h mode', () => {
    const date = new Date('2026-03-28T12:00:00Z')
    const result = formatTime(date, { format: '12h', showSeconds: false, timezone: 'UTC' })

    expect(result.hours).toBe('12')
    expect(result.ampm).toBe('PM')
  })

  it('formats midnight as 0 in 24h mode', () => {
    const date = new Date('2026-03-28T00:30:00Z')
    const result = formatTime(date, { format: '24h', showSeconds: false, timezone: 'UTC' })

    expect(result.hours).toBe('00')
    expect(result.minutes).toBe('30')
  })

  it('respects timezone', () => {
    const date = new Date('2026-03-28T00:00:00Z')
    const result = formatTime(date, { format: '24h', showSeconds: false, timezone: 'Asia/Tokyo' })

    // UTC midnight = 9:00 AM in Tokyo (JST = UTC+9)
    expect(result.hours).toBe('09')
    expect(result.minutes).toBe('00')
  })

  it('includes timezone label', () => {
    const date = new Date('2026-03-28T00:00:00Z')
    const result = formatTime(date, { format: '12h', showSeconds: false, timezone: 'America/New_York' })

    expect(result.timezoneLabel).toBeTruthy()
  })
})

describe('formatDate', () => {
  it('formats short date', () => {
    const date = new Date('2026-03-28T12:00:00Z')
    const result = formatDate(date, 'short', 'UTC')

    expect(result).toMatch(/Mar/)
    expect(result).toMatch(/28/)
  })

  it('formats long date', () => {
    const date = new Date('2026-03-28T12:00:00Z')
    const result = formatDate(date, 'long', 'UTC')

    expect(result).toMatch(/March/)
    expect(result).toMatch(/28/)
    expect(result).toMatch(/2026/)
  })

  it('formats ISO date', () => {
    const date = new Date('2026-03-28T12:00:00Z')
    const result = formatDate(date, 'iso', 'UTC')

    expect(result).toBe('2026-03-28')
  })
})
