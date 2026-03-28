import { getWeatherCondition, celsiusToFahrenheit } from './weatherCodes'

describe('getWeatherCondition', () => {
  it('returns clear for code 0', () => {
    expect(getWeatherCondition(0)).toEqual({ label: 'Clear sky', icon: 'clear' })
  })

  it('returns partly cloudy for codes 1-2', () => {
    expect(getWeatherCondition(1).icon).toBe('partly-cloudy')
    expect(getWeatherCondition(2).icon).toBe('partly-cloudy')
  })

  it('returns overcast for code 3', () => {
    expect(getWeatherCondition(3).icon).toBe('overcast')
  })

  it('returns fog for codes 45, 48', () => {
    expect(getWeatherCondition(45).icon).toBe('fog')
    expect(getWeatherCondition(48).icon).toBe('fog')
  })

  it('returns drizzle for codes 51-57', () => {
    expect(getWeatherCondition(51).icon).toBe('drizzle')
    expect(getWeatherCondition(55).icon).toBe('drizzle')
    expect(getWeatherCondition(57).icon).toBe('drizzle')
  })

  it('returns rain for codes 61-67 and 80-82', () => {
    expect(getWeatherCondition(61).icon).toBe('rain')
    expect(getWeatherCondition(65).icon).toBe('rain')
    expect(getWeatherCondition(80).icon).toBe('rain')
    expect(getWeatherCondition(82).icon).toBe('rain')
  })

  it('returns snow for codes 71-77 and 85-86', () => {
    expect(getWeatherCondition(71).icon).toBe('snow')
    expect(getWeatherCondition(75).icon).toBe('snow')
    expect(getWeatherCondition(85).icon).toBe('snow')
    expect(getWeatherCondition(86).icon).toBe('snow')
  })

  it('returns thunderstorm for codes 95-99', () => {
    expect(getWeatherCondition(95).icon).toBe('thunderstorm')
    expect(getWeatherCondition(99).icon).toBe('thunderstorm')
  })

  it('falls back to clear for unknown codes', () => {
    expect(getWeatherCondition(999).icon).toBe('clear')
  })
})

describe('celsiusToFahrenheit', () => {
  it('converts 0°C to 32°F', () => {
    expect(celsiusToFahrenheit(0)).toBe(32)
  })

  it('converts 100°C to 212°F', () => {
    expect(celsiusToFahrenheit(100)).toBe(212)
  })

  it('converts negative temperatures', () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40)
  })

  it('rounds to nearest integer', () => {
    expect(celsiusToFahrenheit(22.5)).toBe(73)
  })
})
