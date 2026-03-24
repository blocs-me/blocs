import { useState, useEffect, useCallback } from 'react'

export type CountdownParts = {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export type CountdownResult = {
  parts: CountdownParts
  totalMs: number
  isPast: boolean
}

export type UnitKey = keyof CountdownParts

const UNIT_ORDER: UnitKey[] = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']

export function computeCountdown(now: Date, end: Date, countUp: boolean): CountdownResult {
  let diffMs = end.getTime() - now.getTime()
  const isPast = diffMs < 0

  if (isPast && !countUp) {
    return {
      parts: { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 },
      totalMs: 0,
      isPast: true
    }
  }

  if (isPast) diffMs = Math.abs(diffMs)

  let remaining = Math.floor(diffMs / 1000)

  const years = Math.floor(remaining / (365.25 * 24 * 3600))
  remaining -= Math.floor(years * 365.25 * 24 * 3600)

  const months = Math.floor(remaining / (30.44 * 24 * 3600))
  remaining -= Math.floor(months * 30.44 * 24 * 3600)

  const weeks = Math.floor(remaining / (7 * 24 * 3600))
  remaining -= weeks * 7 * 24 * 3600

  const days = Math.floor(remaining / (24 * 3600))
  remaining -= days * 24 * 3600

  const hours = Math.floor(remaining / 3600)
  remaining -= hours * 3600

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining - minutes * 60

  return {
    parts: { years, months, weeks, days, hours, minutes, seconds },
    totalMs: diffMs,
    isPast
  }
}

export function autoDetectUnits(parts: CountdownParts): UnitKey[] {
  let startIdx = UNIT_ORDER.length - 2 // default: minutes

  for (let i = 0; i < UNIT_ORDER.length; i++) {
    if (parts[UNIT_ORDER[i]] > 0) {
      startIdx = i
      break
    }
  }

  return UNIT_ORDER.slice(startIdx)
}

export type CountdownConfig = {
  endDate: Date
  countUp: boolean
  visibleUnits?: UnitKey[]
}

export function useCountdown(config: CountdownConfig) {
  const { endDate, countUp, visibleUnits } = config
  const endMs = endDate.getTime()

  const [state, setState] = useState(() => {
    const result = computeCountdown(new Date(), endDate, countUp)
    const units = visibleUnits ?? autoDetectUnits(result.parts)
    return { ...result, visibleUnits: units }
  })

  useEffect(() => {
    const tick = () => {
      const target = new Date(endMs)
      const result = computeCountdown(new Date(), target, countUp)
      const units = visibleUnits ?? autoDetectUnits(result.parts)
      setState({ ...result, visibleUnits: units })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [endMs, countUp, visibleUnits])

  return state
}
