import { useState, useEffect, useCallback } from 'react'

export type CalendarDay = {
  date: string          // YYYY-MM-DD
  dayOfMonth: number
  isCurrentMonth: boolean
  isToday: boolean
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

export function buildMonthGrid(
  year: number,
  month: number, // 0-indexed
  startOfWeek: 0 | 1,
  todayStr?: string
): CalendarDay[][] {
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const totalDays = daysInMonth(year, month)

  // How many leading days from previous month
  let leadingDays = firstDayOfMonth - startOfWeek
  if (leadingDays < 0) leadingDays += 7

  const prevMonth = month === 0 ? 11 : month - 1
  const prevYear = month === 0 ? year - 1 : year
  const prevMonthDays = daysInMonth(prevYear, prevMonth)

  const cells: CalendarDay[] = []

  // Previous month trailing days
  for (let i = leadingDays - 1; i >= 0; i--) {
    const day = prevMonthDays - i
    cells.push({
      date: formatDate(prevYear, prevMonth, day),
      dayOfMonth: day,
      isCurrentMonth: false,
      isToday: formatDate(prevYear, prevMonth, day) === todayStr
    })
  }

  // Current month days
  for (let day = 1; day <= totalDays; day++) {
    cells.push({
      date: formatDate(year, month, day),
      dayOfMonth: day,
      isCurrentMonth: true,
      isToday: formatDate(year, month, day) === todayStr
    })
  }

  // Next month leading days to fill remaining rows
  const nextMonth = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year
  const remaining = 7 - (cells.length % 7)
  if (remaining < 7) {
    for (let day = 1; day <= remaining; day++) {
      cells.push({
        date: formatDate(nextYear, nextMonth, day),
        dayOfMonth: day,
        isCurrentMonth: false,
        isToday: formatDate(nextYear, nextMonth, day) === todayStr
      })
    }
  }

  // Split into weeks
  const grid: CalendarDay[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    grid.push(cells.slice(i, i + 7))
  }

  return grid
}

function getTodayInTimezone(timezone: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timezone
  }).format(new Date())
  return parts
}

function getCurrentMonthInTimezone(timezone: string): { year: number; month: number } {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    timeZone: timezone
  }).formatToParts(now)
  const year = Number(parts.find(p => p.type === 'year')?.value)
  const month = Number(parts.find(p => p.type === 'month')?.value) - 1
  return { year, month }
}

type UseCalendarConfig = {
  timezone: string
  startOfWeek: 0 | 1
}

export function useCalendar(config: UseCalendarConfig) {
  const { timezone, startOfWeek } = config
  const { year: initYear, month: initMonth } = getCurrentMonthInTimezone(timezone)

  const [year, setYear] = useState(initYear)
  const [month, setMonth] = useState(initMonth)
  const [today, setToday] = useState(() => getTodayInTimezone(timezone))

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(getTodayInTimezone(timezone))
    }, 60000)
    return () => clearInterval(interval)
  }, [timezone])

  const grid = buildMonthGrid(year, month, startOfWeek, today)

  const monthLabel = new Date(year, month).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  const goToPrevMonth = useCallback(() => {
    setMonth(prev => {
      if (prev === 0) {
        setYear(y => y - 1)
        return 11
      }
      return prev - 1
    })
  }, [])

  const goToNextMonth = useCallback(() => {
    setMonth(prev => {
      if (prev === 11) {
        setYear(y => y + 1)
        return 0
      }
      return prev + 1
    })
  }, [])

  const goToMonth = useCallback((m: number, y: number) => {
    setMonth(m)
    setYear(y)
  }, [])

  const goToPrevYear = useCallback(() => setYear(y => y - 1), [])
  const goToNextYear = useCallback(() => setYear(y => y + 1), [])

  return {
    year,
    month,
    grid,
    today,
    monthLabel,
    goToPrevMonth,
    goToNextMonth,
    goToMonth,
    goToPrevYear,
    goToNextYear
  }
}
