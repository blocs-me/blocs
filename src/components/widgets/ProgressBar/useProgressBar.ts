import { useState, useEffect, useCallback } from 'react'
import { ProgressWidgetConfig } from './progressBarConfig'

export function computeManualProgress(current: number, startValue: number, total: number): number {
  const range = total - startValue
  if (range <= 0) return 0
  const raw = ((current - startValue) / range) * 100
  return Math.min(100, Math.max(0, raw))
}

export function computeDateRangeProgress(now: Date, start: Date, end: Date): number {
  const totalMs = end.getTime() - start.getTime()
  if (totalMs <= 0) return 0
  const elapsedMs = now.getTime() - start.getTime()
  const raw = (elapsedMs / totalMs) * 100
  return Math.min(100, Math.max(0, Math.round(raw * 100) / 100))
}

export type CalendarProgressResult = {
  year: number
  month: number
  week: number
  day: number
}

export function computeCalendarProgress(now: Date): CalendarProgressResult {
  const year = now.getFullYear()

  // Year progress
  const yearStart = new Date(year, 0, 1)
  const yearEnd = new Date(year + 1, 0, 1)
  const yearProgress = ((now.getTime() - yearStart.getTime()) / (yearEnd.getTime() - yearStart.getTime())) * 100

  // Month progress
  const monthStart = new Date(year, now.getMonth(), 1)
  const monthEnd = new Date(year, now.getMonth() + 1, 1)
  const monthProgress = ((now.getTime() - monthStart.getTime()) / (monthEnd.getTime() - monthStart.getTime())) * 100

  // Week progress (Monday = start)
  const dayOfWeek = (now.getDay() + 6) % 7 // Monday=0 ... Sunday=6
  const weekProgress = ((dayOfWeek * 24 + now.getHours() + now.getMinutes() / 60) / (7 * 24)) * 100

  // Day progress
  const dayProgress = ((now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400) * 100

  return {
    year: Math.round(yearProgress * 100) / 100,
    month: Math.round(monthProgress * 100) / 100,
    week: Math.round(weekProgress * 100) / 100,
    day: Math.round(dayProgress * 100) / 100
  }
}

function getStorageKey(config: ProgressWidgetConfig): string {
  const raw = `${config.title}|${config.total}|${config.startValue}`
  let hash = 0
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0
  }
  return `progress_${Math.abs(hash)}`
}

export function useManualProgress(config: ProgressWidgetConfig) {
  const key = getStorageKey(config)

  const [current, setCurrent] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (typeof parsed.current === 'number') return parsed.current
      }
    } catch {}
    return config.startValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ current, updatedAt: new Date().toISOString() }))
  }, [key, current])

  const increment = useCallback(() => {
    setCurrent((prev: number) => Math.min(config.total, prev + config.increment))
  }, [config.total, config.increment])

  const decrement = useCallback(() => {
    setCurrent((prev: number) => Math.max(config.startValue, prev - config.increment))
  }, [config.startValue, config.increment])

  const percentage = computeManualProgress(current, config.startValue, config.total)

  return { current, percentage, increment, decrement }
}

export function useDateRangeProgress(config: ProgressWidgetConfig) {
  const [percentage, setPercentage] = useState(() => {
    const start = new Date(config.startDate)
    const end = new Date(config.endDate)
    return computeDateRangeProgress(new Date(), start, end)
  })

  useEffect(() => {
    const tick = () => {
      const start = new Date(config.startDate)
      const end = new Date(config.endDate)
      setPercentage(computeDateRangeProgress(new Date(), start, end))
    }
    tick()
    const interval = setInterval(tick, 60000)
    return () => clearInterval(interval)
  }, [config.startDate, config.endDate])

  return { percentage }
}

export function useCalendarProgress() {
  const [progress, setProgress] = useState(() => computeCalendarProgress(new Date()))

  useEffect(() => {
    const tick = () => setProgress(computeCalendarProgress(new Date()))
    tick()
    const interval = setInterval(tick, 60000)
    return () => clearInterval(interval)
  }, [])

  return progress
}
