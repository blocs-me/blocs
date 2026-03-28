export type CalendarView = 'month' | 'year'

export type DateMarker = {
  date: string
  color: string
  label: string
}

export type CalendarWidgetConfig = {
  view: CalendarView
  theme: 'light' | 'dark'
  title: string
  showTitle: boolean
  startOfWeek: 0 | 1
  showWeekNumbers: boolean
  fillColor: string
  headerColor: string
  markers: DateMarker[]
  timezone: string
}

export function getDefaultConfig(): CalendarWidgetConfig {
  return {
    view: 'month',
    theme: 'light',
    title: '',
    showTitle: false,
    startOfWeek: 0,
    showWeekNumbers: false,
    fillColor: '',
    headerColor: '',
    markers: [],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }
}

export function parseMarkers(str: string): DateMarker[] {
  if (!str) return []
  return str.split(',').map(part => {
    const [date, color, ...labelParts] = part.split(':')
    return {
      date: date || '',
      color: color ? decodeURIComponent(color) : '',
      label: labelParts.join(':') ? decodeURIComponent(labelParts.join(':')) : ''
    }
  }).filter(m => m.date)
}

export function serializeMarkers(markers: DateMarker[]): string {
  if (!markers.length) return ''
  return markers.map(m => {
    let s = m.date
    if (m.color || m.label) s += ':' + encodeURIComponent(m.color)
    if (m.label) s += ':' + encodeURIComponent(m.label)
    return s
  }).join(',')
}

export function configFromParams(params: URLSearchParams): CalendarWidgetConfig {
  const defaults = getDefaultConfig()

  return {
    view: (params.get('view') as CalendarView) || defaults.view,
    theme: (params.get('theme') as 'light' | 'dark') || defaults.theme,
    title: params.get('title') || defaults.title,
    showTitle: params.get('showTitle') === '1',
    startOfWeek: params.get('sow') === '1' ? 1 : 0,
    showWeekNumbers: params.get('wn') === '1',
    fillColor: params.get('fill') || '',
    headerColor: params.get('headerColor') || '',
    markers: parseMarkers(params.get('marks') || ''),
    timezone: params.get('tz') || defaults.timezone
  }
}

export function configToParams(config: CalendarWidgetConfig): string {
  const params = new URLSearchParams()

  if (config.view !== 'month') params.set('view', config.view)
  if (config.theme !== 'light') params.set('theme', config.theme)
  if (config.title) params.set('title', config.title)
  if (config.showTitle) params.set('showTitle', '1')
  if (config.startOfWeek === 1) params.set('sow', '1')
  if (config.showWeekNumbers) params.set('wn', '1')
  if (config.fillColor) params.set('fill', config.fillColor)
  if (config.headerColor) params.set('headerColor', config.headerColor)
  const marks = serializeMarkers(config.markers)
  if (marks) params.set('marks', marks)
  params.set('tz', config.timezone)

  return params.toString()
}

export function configToEmbedUrl(config: CalendarWidgetConfig): string {
  return `https://blocs.me/calendar?${configToParams(config)}`
}
