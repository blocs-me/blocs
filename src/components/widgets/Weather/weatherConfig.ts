export type WeatherDisplay = 'current' | 'forecast' | 'compact'
export type TempUnit = 'celsius' | 'fahrenheit'

export type WeatherWidgetConfig = {
  display: WeatherDisplay
  theme: 'light' | 'dark'
  latitude: number
  longitude: number
  locationName: string
  timezone: string
  tempUnit: TempUnit
  showFeelsLike: boolean
  showHumidity: boolean
  showWind: boolean
  showHighLow: boolean
  forecastDays: number
  tempColor: string
  labelColor: string
}

export function getDefaultConfig(): WeatherWidgetConfig {
  return {
    display: 'current',
    theme: 'light',
    latitude: 0,
    longitude: 0,
    locationName: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    tempUnit: 'celsius',
    showFeelsLike: false,
    showHumidity: false,
    showWind: false,
    showHighLow: true,
    forecastDays: 5,
    tempColor: '',
    labelColor: '',
  }
}

export function configFromParams(params: URLSearchParams): WeatherWidgetConfig {
  const defaults = getDefaultConfig()
  return {
    display: (params.get('display') as WeatherDisplay) || defaults.display,
    theme: (params.get('theme') as 'light' | 'dark') || defaults.theme,
    latitude: parseFloat(params.get('lat') || '0'),
    longitude: parseFloat(params.get('lng') || '0'),
    locationName: params.get('loc') || '',
    timezone: params.get('tz') || defaults.timezone,
    tempUnit: params.get('unit') === 'f' ? 'fahrenheit' : 'celsius',
    showFeelsLike: params.get('feels') === '1',
    showHumidity: params.get('humidity') === '1',
    showWind: params.get('wind') === '1',
    showHighLow: params.get('hl') !== '0',
    forecastDays: Math.min(7, Math.max(3, parseInt(params.get('days') || '5', 10))),
    tempColor: params.get('tempColor') || '',
    labelColor: params.get('labelColor') || '',
  }
}

export function configToParams(config: WeatherWidgetConfig): string {
  const params = new URLSearchParams()

  params.set('lat', config.latitude.toString())
  params.set('lng', config.longitude.toString())

  if (config.locationName) params.set('loc', config.locationName)
  if (config.timezone !== getDefaultConfig().timezone) params.set('tz', config.timezone)
  if (config.display !== 'current') params.set('display', config.display)
  if (config.theme !== 'light') params.set('theme', config.theme)
  if (config.tempUnit === 'fahrenheit') params.set('unit', 'f')
  if (config.showFeelsLike) params.set('feels', '1')
  if (config.showHumidity) params.set('humidity', '1')
  if (config.showWind) params.set('wind', '1')
  if (!config.showHighLow) params.set('hl', '0')
  if (config.forecastDays !== 5) params.set('days', config.forecastDays.toString())
  if (config.tempColor) params.set('tempColor', config.tempColor)
  if (config.labelColor) params.set('labelColor', config.labelColor)

  return params.toString()
}

export function configToEmbedUrl(config: WeatherWidgetConfig): string {
  const params = configToParams(config)
  return `https://blocs.me/weather?${params}`
}
