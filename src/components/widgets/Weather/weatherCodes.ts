export type WeatherCondition = {
  label: string
  icon: 'clear' | 'partly-cloudy' | 'overcast' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm'
}

const conditions: Record<string, WeatherCondition> = {
  clear: { label: 'Clear sky', icon: 'clear' },
  partlyCloudy: { label: 'Partly cloudy', icon: 'partly-cloudy' },
  overcast: { label: 'Overcast', icon: 'overcast' },
  fog: { label: 'Fog', icon: 'fog' },
  drizzle: { label: 'Drizzle', icon: 'drizzle' },
  rain: { label: 'Rain', icon: 'rain' },
  snow: { label: 'Snow', icon: 'snow' },
  thunderstorm: { label: 'Thunderstorm', icon: 'thunderstorm' },
}

export function getWeatherCondition(code: number): WeatherCondition {
  if (code === 0) return conditions.clear
  if (code <= 3) return code <= 2 ? conditions.partlyCloudy : conditions.overcast
  if (code === 45 || code === 48) return conditions.fog
  if (code >= 51 && code <= 57) return conditions.drizzle
  if (code >= 61 && code <= 67) return conditions.rain
  if (code >= 71 && code <= 77) return conditions.snow
  if (code >= 80 && code <= 82) return conditions.rain
  if (code >= 85 && code <= 86) return conditions.snow
  if (code >= 95 && code <= 99) return conditions.thunderstorm
  return conditions.clear
}

export function celsiusToFahrenheit(c: number): number {
  return Math.round((c * 9) / 5 + 32)
}
