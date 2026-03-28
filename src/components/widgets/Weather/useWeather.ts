import { useState, useEffect, useCallback, useRef } from 'react'
import type { TempUnit } from './weatherConfig'
import { celsiusToFahrenheit } from './weatherCodes'

export type CurrentWeather = {
  temp: number
  feelsLike: number
  humidity: number
  windSpeed: number
  weatherCode: number
  high: number
  low: number
}

export type ForecastDay = {
  date: string
  high: number
  low: number
  weatherCode: number
}

type ApiResponse = {
  current: {
    temperature_2m: number
    apparent_temperature: number
    relative_humidity_2m: number
    weather_code: number
    wind_speed_10m: number
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weather_code: number[]
  }
}

function convertTemp(celsius: number, unit: TempUnit): number {
  return unit === 'fahrenheit' ? celsiusToFahrenheit(celsius) : Math.round(celsius)
}

export function transformResponse(data: ApiResponse, unit: TempUnit): { current: CurrentWeather; forecast: ForecastDay[] } {
  const current: CurrentWeather = {
    temp: convertTemp(data.current.temperature_2m, unit),
    feelsLike: convertTemp(data.current.apparent_temperature, unit),
    humidity: Math.round(data.current.relative_humidity_2m),
    windSpeed: Math.round(data.current.wind_speed_10m),
    weatherCode: data.current.weather_code,
    high: convertTemp(data.daily.temperature_2m_max[0], unit),
    low: convertTemp(data.daily.temperature_2m_min[0], unit),
  }

  const forecast: ForecastDay[] = data.daily.time.map((date, i) => ({
    date,
    high: convertTemp(data.daily.temperature_2m_max[i], unit),
    low: convertTemp(data.daily.temperature_2m_min[i], unit),
    weatherCode: data.daily.weather_code[i],
  }))

  return { current, forecast }
}

function buildApiUrl(lat: number, lng: number, tz: string, days: number): string {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lng.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    daily: 'temperature_2m_max,temperature_2m_min,weather_code',
    temperature_unit: 'celsius',
    timezone: tz,
    forecast_days: days.toString(),
  })
  return `https://api.open-meteo.com/v1/forecast?${params}`
}

const REFRESH_INTERVAL = 15 * 60 * 1000

type UseWeatherConfig = {
  latitude: number
  longitude: number
  timezone: string
  tempUnit: TempUnit
  forecastDays: number
}

export function useWeather(config: UseWeatherConfig) {
  const { latitude, longitude, timezone, tempUnit, forecastDays } = config
  const [current, setCurrent] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchWeather = useCallback(async () => {
    if (!latitude && !longitude) return
    try {
      const url = buildApiUrl(latitude, longitude, timezone, forecastDays)
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: ApiResponse = await res.json()
      const result = transformResponse(data, tempUnit)
      setCurrent(result.current)
      setForecast(result.forecast)
      setError(null)
      setLastUpdated(new Date())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch weather')
    } finally {
      setIsLoading(false)
    }
  }, [latitude, longitude, timezone, tempUnit, forecastDays])

  useEffect(() => {
    setIsLoading(true)
    fetchWeather()
    intervalRef.current = setInterval(fetchWeather, REFRESH_INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [fetchWeather])

  return { current, forecast, isLoading, error, lastUpdated }
}
