import { configFromParams, configToParams, getDefaultConfig } from './weatherConfig'

describe('weatherConfig', () => {
  describe('configFromParams', () => {
    it('parses lat and lng', () => {
      const params = new URLSearchParams('lat=40.7128&lng=-74.006')
      const config = configFromParams(params)
      expect(config.latitude).toBeCloseTo(40.7128)
      expect(config.longitude).toBeCloseTo(-74.006)
    })

    it('parses location name', () => {
      const config = configFromParams(new URLSearchParams('lat=0&lng=0&loc=New+York'))
      expect(config.locationName).toBe('New York')
    })

    it('parses fahrenheit unit', () => {
      const config = configFromParams(new URLSearchParams('lat=0&lng=0&unit=f'))
      expect(config.tempUnit).toBe('fahrenheit')
    })

    it('defaults to celsius', () => {
      const config = configFromParams(new URLSearchParams('lat=0&lng=0'))
      expect(config.tempUnit).toBe('celsius')
    })

    it('parses display mode', () => {
      const config = configFromParams(new URLSearchParams('lat=0&lng=0&display=forecast'))
      expect(config.display).toBe('forecast')
    })

    it('parses boolean flags', () => {
      const config = configFromParams(new URLSearchParams('lat=0&lng=0&feels=1&humidity=1&wind=1&hl=0'))
      expect(config.showFeelsLike).toBe(true)
      expect(config.showHumidity).toBe(true)
      expect(config.showWind).toBe(true)
      expect(config.showHighLow).toBe(false)
    })

    it('clamps forecast days to 3-7', () => {
      expect(configFromParams(new URLSearchParams('lat=0&lng=0&days=1')).forecastDays).toBe(3)
      expect(configFromParams(new URLSearchParams('lat=0&lng=0&days=10')).forecastDays).toBe(7)
      expect(configFromParams(new URLSearchParams('lat=0&lng=0&days=5')).forecastDays).toBe(5)
    })

    it('uses defaults for missing params', () => {
      const config = configFromParams(new URLSearchParams('lat=0&lng=0'))
      expect(config.display).toBe('current')
      expect(config.theme).toBe('light')
      expect(config.showHighLow).toBe(true)
      expect(config.forecastDays).toBe(5)
    })
  })

  describe('configToParams roundtrip', () => {
    it('round-trips default config', () => {
      const defaults = getDefaultConfig()
      defaults.latitude = 51.5074
      defaults.longitude = -0.1278
      const params = configToParams(defaults)
      const parsed = configFromParams(new URLSearchParams(params))
      expect(parsed.latitude).toBeCloseTo(defaults.latitude)
      expect(parsed.longitude).toBeCloseTo(defaults.longitude)
      expect(parsed.display).toBe(defaults.display)
      expect(parsed.tempUnit).toBe(defaults.tempUnit)
    })

    it('round-trips full config', () => {
      const config = {
        ...getDefaultConfig(),
        latitude: 40.7128,
        longitude: -74.006,
        locationName: 'New York',
        display: 'forecast' as const,
        theme: 'dark' as const,
        tempUnit: 'fahrenheit' as const,
        showFeelsLike: true,
        showHumidity: true,
        showWind: true,
        showHighLow: false,
        forecastDays: 7,
        tempColor: '#ff0000',
        labelColor: '#00ff00',
      }
      const params = configToParams(config)
      const parsed = configFromParams(new URLSearchParams(params))
      expect(parsed.latitude).toBeCloseTo(config.latitude)
      expect(parsed.longitude).toBeCloseTo(config.longitude)
      expect(parsed.locationName).toBe(config.locationName)
      expect(parsed.display).toBe(config.display)
      expect(parsed.theme).toBe(config.theme)
      expect(parsed.tempUnit).toBe(config.tempUnit)
      expect(parsed.showFeelsLike).toBe(config.showFeelsLike)
      expect(parsed.showHumidity).toBe(config.showHumidity)
      expect(parsed.showWind).toBe(config.showWind)
      expect(parsed.showHighLow).toBe(config.showHighLow)
      expect(parsed.forecastDays).toBe(config.forecastDays)
      expect(parsed.tempColor).toBe(config.tempColor)
      expect(parsed.labelColor).toBe(config.labelColor)
    })

    it('omits default values from params string', () => {
      const defaults = getDefaultConfig()
      defaults.latitude = 10
      defaults.longitude = 20
      const params = configToParams(defaults)
      expect(params).not.toContain('display=')
      expect(params).not.toContain('theme=')
      expect(params).not.toContain('unit=')
      expect(params).not.toContain('feels=')
      expect(params).toContain('lat=10')
      expect(params).toContain('lng=20')
    })
  })
})
