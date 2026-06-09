import { useState, useEffect, useRef } from 'react'

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

const UNIT_SECONDS: Record<UnitKey, number> = {
  years: 365.25 * 24 * 3600,
  months: 30.44 * 24 * 3600,
  weeks: 7 * 24 * 3600,
  days: 24 * 3600,
  hours: 3600,
  minutes: 60,
  seconds: 1
}

// Distribute a total number of seconds across the given units (in descending
// size order). Only the supplied units receive a value, so when a larger unit
// is hidden its time rolls down into the largest visible unit instead of being
// dropped — e.g. hiding "months" turns "1 month 0 weeks" into "4 weeks".
export function distributeParts(totalSeconds: number, units: UnitKey[]): CountdownParts {
  const parts: CountdownParts = { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  let remaining = totalSeconds

  for (const unit of UNIT_ORDER) {
    if (!units.includes(unit)) continue
    const size = UNIT_SECONDS[unit]
    const value = Math.floor(remaining / size)
    parts[unit] = value
    remaining -= Math.floor(value * size)
  }

  return parts
}

export function computeCountdown(
  now: Date,
  end: Date,
  countUp: boolean,
  units: UnitKey[] = UNIT_ORDER
): CountdownResult {
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

  const totalSeconds = Math.floor(diffMs / 1000)

  return {
    parts: distributeParts(totalSeconds, units),
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

function computeState(now: Date, end: Date, countUp: boolean, visibleUnits?: UnitKey[]) {
  // Full breakdown drives auto-detection and exposes totalMs / isPast.
  const base = computeCountdown(now, end, countUp)
  const units = visibleUnits ?? autoDetectUnits(base.parts)
  // When units are explicitly chosen, re-distribute against just those units so
  // hidden larger units roll down into the largest visible one. Auto-detected
  // units always start at the largest non-zero unit, so the base parts are fine.
  const parts = visibleUnits ? computeCountdown(now, end, countUp, units).parts : base.parts
  return { ...base, parts, visibleUnits: units }
}

export function useCountdown(config: CountdownConfig) {
  const { endDate, countUp, visibleUnits } = config
  const endMs = endDate.getTime()
  const visibleUnitsKey = visibleUnits?.join(',') ?? ''
  const visibleUnitsRef = useRef(visibleUnits)
  visibleUnitsRef.current = visibleUnits

  const [state, setState] = useState(() => computeState(new Date(), endDate, countUp, visibleUnits))

  useEffect(() => {
    const tick = () => {
      const target = new Date(endMs)
      setState(computeState(new Date(), target, countUp, visibleUnitsRef.current))
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endMs, countUp, visibleUnitsKey])

  return state
}
