export type ProgressMode = 'manual' | 'dateRange' | 'calendar'
export type VisualStyle = 'bar' | 'ring' | 'gauge'

export type CalendarBars = {
  year: boolean
  month: boolean
  week: boolean
  day: boolean
}

export type ProgressWidgetConfig = {
  mode: ProgressMode
  style: VisualStyle
  title: string
  showTitle: boolean
  theme: 'light' | 'dark'
  fillColor: string
  // Manual mode
  total: number
  startValue: number
  increment: number
  // Date range mode
  startDate: string
  endDate: string
  timezone: string
  // Calendar mode
  calendarBars: CalendarBars
}

export function getDefaultConfig(): ProgressWidgetConfig {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 30)
  tomorrow.setHours(23, 59, 0, 0)

  return {
    mode: 'manual',
    style: 'bar',
    title: 'Progress',
    showTitle: true,
    theme: 'light',
    fillColor: '',
    total: 100,
    startValue: 0,
    increment: 1,
    startDate: new Date().toISOString().slice(0, 16),
    endDate: tomorrow.toISOString().slice(0, 16),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    calendarBars: { year: true, month: true, week: true, day: true }
  }
}

const MODE_SHORT: Record<ProgressMode, string> = {
  manual: 'manual',
  dateRange: 'date',
  calendar: 'cal'
}

const SHORT_TO_MODE: Record<string, ProgressMode> = {
  manual: 'manual',
  date: 'dateRange',
  cal: 'calendar'
}

export function configToParams(config: ProgressWidgetConfig): string {
  const params = new URLSearchParams()

  params.set('mode', MODE_SHORT[config.mode])
  params.set('style', config.style)
  params.set('title', config.title)
  if (!config.showTitle) params.set('showTitle', '0')
  if (config.theme !== 'light') params.set('theme', config.theme)
  if (config.fillColor) params.set('fill', config.fillColor)

  if (config.mode === 'manual') {
    params.set('total', String(config.total))
    if (config.startValue !== 0) params.set('startVal', String(config.startValue))
    if (config.increment !== 1) params.set('inc', String(config.increment))
  }

  if (config.mode === 'dateRange') {
    params.set('from', config.startDate)
    params.set('to', config.endDate)
    params.set('tz', config.timezone)
  }

  if (config.mode === 'calendar') {
    const bars = config.calendarBars
    const show = Object.entries(bars)
      .filter(([, v]) => v)
      .map(([k]) => k[0])
      .join(',')
    if (show !== 'y,m,w,d') params.set('show', show)
  }

  return params.toString()
}

export function configFromParams(params: URLSearchParams): ProgressWidgetConfig {
  const defaults = getDefaultConfig()

  const modeStr = params.get('mode') || 'manual'
  const mode = SHORT_TO_MODE[modeStr] || 'manual'
  const style = (params.get('style') as VisualStyle) || 'bar'

  const showParam = params.get('show')
  let calendarBars = { ...defaults.calendarBars }
  if (showParam) {
    calendarBars = { year: false, month: false, week: false, day: false }
    const keys = showParam.split(',')
    for (const k of keys) {
      if (k === 'y') calendarBars.year = true
      else if (k === 'm') calendarBars.month = true
      else if (k === 'w') calendarBars.week = true
      else if (k === 'd') calendarBars.day = true
    }
  }

  return {
    mode,
    style,
    title: params.get('title') || defaults.title,
    showTitle: params.get('showTitle') !== '0',
    theme: (params.get('theme') as 'light' | 'dark') || 'light',
    fillColor: params.get('fill') || '',
    total: Number(params.get('total')) || defaults.total,
    startValue: Number(params.get('startVal')) || 0,
    increment: Number(params.get('inc')) || 1,
    startDate: params.get('from') || defaults.startDate,
    endDate: params.get('to') || defaults.endDate,
    timezone: params.get('tz') || defaults.timezone,
    calendarBars
  }
}

export function configToEmbedUrl(config: ProgressWidgetConfig): string {
  return `https://blocs.me/progress-bar?${configToParams(config)}`
}
