import { transformResponse } from './useWeather'

const sampleApiResponse = {
  current: {
    temperature_2m: 18.5,
    apparent_temperature: 16.2,
    relative_humidity_2m: 65,
    weather_code: 3,
    wind_speed_10m: 12.4,
  },
  daily: {
    time: ['2026-03-28', '2026-03-29', '2026-03-30'],
    temperature_2m_max: [20, 22, 19],
    temperature_2m_min: [12, 14, 11],
    weather_code: [3, 1, 61],
  },
}

describe('transformResponse', () => {
  it('extracts current weather in celsius', () => {
    const { current } = transformResponse(sampleApiResponse, 'celsius')
    expect(current.temp).toBe(19) // 18.5 rounded
    expect(current.feelsLike).toBe(16) // 16.2 rounded
    expect(current.humidity).toBe(65)
    expect(current.windSpeed).toBe(12) // 12.4 rounded
    expect(current.weatherCode).toBe(3)
    expect(current.high).toBe(20)
    expect(current.low).toBe(12)
  })

  it('converts to fahrenheit', () => {
    const { current } = transformResponse(sampleApiResponse, 'fahrenheit')
    // 18.5°C = 65.3°F → 65
    expect(current.temp).toBe(65)
    // 16.2°C = 61.16°F → 61
    expect(current.feelsLike).toBe(61)
    // high: 20°C = 68°F
    expect(current.high).toBe(68)
    // low: 12°C = 53.6°F → 54
    expect(current.low).toBe(54)
  })

  it('extracts forecast days', () => {
    const { forecast } = transformResponse(sampleApiResponse, 'celsius')
    expect(forecast).toHaveLength(3)
    expect(forecast[0]).toEqual({ date: '2026-03-28', high: 20, low: 12, weatherCode: 3 })
    expect(forecast[1]).toEqual({ date: '2026-03-29', high: 22, low: 14, weatherCode: 1 })
    expect(forecast[2]).toEqual({ date: '2026-03-30', high: 19, low: 11, weatherCode: 61 })
  })

  it('converts forecast to fahrenheit', () => {
    const { forecast } = transformResponse(sampleApiResponse, 'fahrenheit')
    expect(forecast[0].high).toBe(68) // 20°C
    expect(forecast[0].low).toBe(54) // 12°C
  })

  it('handles zero values', () => {
    const data = {
      current: {
        temperature_2m: 0,
        apparent_temperature: 0,
        relative_humidity_2m: 0,
        weather_code: 0,
        wind_speed_10m: 0,
      },
      daily: {
        time: ['2026-01-01'],
        temperature_2m_max: [0],
        temperature_2m_min: [0],
        weather_code: [0],
      },
    }
    const { current } = transformResponse(data, 'celsius')
    expect(current.temp).toBe(0)
    expect(current.humidity).toBe(0)
    expect(current.weatherCode).toBe(0)
  })

  it('handles negative temperatures', () => {
    const data = {
      current: {
        temperature_2m: -10,
        apparent_temperature: -15,
        relative_humidity_2m: 80,
        weather_code: 71,
        wind_speed_10m: 20,
      },
      daily: {
        time: ['2026-01-15'],
        temperature_2m_max: [-5],
        temperature_2m_min: [-18],
        weather_code: [71],
      },
    }
    const { current } = transformResponse(data, 'celsius')
    expect(current.temp).toBe(-10)
    expect(current.feelsLike).toBe(-15)

    const { current: f } = transformResponse(data, 'fahrenheit')
    expect(f.temp).toBe(14) // -10°C = 14°F
    expect(f.feelsLike).toBe(5) // -15°C = 5°F
  })
})
