import { useState, useEffect } from 'react'
import type { DateFormatOption } from './clockConfig'

type FormatTimeOptions = {
  format: '12h' | '24h'
  showSeconds: boolean
  timezone: string
}

type TimeResult = {
  hours: string
  minutes: string
  seconds: string | undefined
  ampm: string | undefined
  timezoneLabel: string
}

export function formatTime(date: Date, options: FormatTimeOptions): TimeResult {
  const { format, showSeconds, timezone } = options

  const parts = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,
    hour12: format === '12h',
    timeZone: timezone
  }).formatToParts(date)

  const get = (type: string) => parts.find(p => p.type === type)?.value || ''

  const tzLabel = new Intl.DateTimeFormat('en-US', {
    timeZoneName: 'short',
    timeZone: timezone
  }).formatToParts(date).find(p => p.type === 'timeZoneName')?.value || ''

  return {
    hours: get('hour'),
    minutes: get('minute'),
    seconds: showSeconds ? get('second') : undefined,
    ampm: format === '12h' ? get('dayPeriod') : undefined,
    timezoneLabel: tzLabel
  }
}

export function formatDate(date: Date, dateFormat: DateFormatOption, timezone: string): string {
  if (dateFormat === 'iso') {
    const parts = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: timezone
    }).format(date)
    return parts
  }

  if (dateFormat === 'long') {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: timezone
    }).format(date)
  }

  // short
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: timezone
  }).format(date)
}

type UseClockConfig = {
  format: '12h' | '24h'
  showSeconds: boolean
  timezone: string
  showDate: boolean
  dateFormat: DateFormatOption
}

export function useClock(config: UseClockConfig) {
  const { format, showSeconds, timezone, showDate, dateFormat } = config

  const [state, setState] = useState(() => {
    const now = new Date()
    return {
      ...formatTime(now, { format, showSeconds, timezone }),
      dateString: showDate ? formatDate(now, dateFormat, timezone) : undefined
    }
  })

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setState({
        ...formatTime(now, { format, showSeconds, timezone }),
        dateString: showDate ? formatDate(now, dateFormat, timezone) : undefined
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [format, showSeconds, timezone, showDate, dateFormat])

  return state
}
