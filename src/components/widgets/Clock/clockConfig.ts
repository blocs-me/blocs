export type ClockTimerMode = 'clock' | 'timer'
export type DisplayStyle = 'digital' | 'flip' | 'minimal'
export type DateFormatOption = 'short' | 'long' | 'iso'

export type ClockTimerWidgetConfig = {
  mode: ClockTimerMode
  style: DisplayStyle
  theme: 'light' | 'dark'
  title: string
  showTitle: boolean
  numberColor: string
  labelColor: string
  // Clock mode
  format: '12h' | '24h'
  showSeconds: boolean
  showDate: boolean
  dateFormat: DateFormatOption
  timezone: string
  showTimezone: boolean
  // Timer mode
  direction: 'up' | 'down'
  duration: number
  autoStart: boolean
}

export function getDefaultConfig(): ClockTimerWidgetConfig {
  return {
    mode: 'clock',
    style: 'digital',
    theme: 'light',
    title: '',
    showTitle: false,
    numberColor: '',
    labelColor: '',
    format: '12h',
    showSeconds: true,
    showDate: false,
    dateFormat: 'short',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    showTimezone: false,
    direction: 'up',
    duration: 300,
    autoStart: false
  }
}

export function configFromParams(params: URLSearchParams): ClockTimerWidgetConfig {
  const defaults = getDefaultConfig()

  return {
    mode: (params.get('mode') as ClockTimerMode) || defaults.mode,
    style: (params.get('style') as DisplayStyle) || defaults.style,
    theme: (params.get('theme') as 'light' | 'dark') || defaults.theme,
    title: params.get('title') || defaults.title,
    showTitle: params.get('showTitle') === '1',
    numberColor: params.get('numColor') || '',
    labelColor: params.get('labelColor') || '',
    format: params.get('fmt') === '24' ? '24h' : '12h',
    showSeconds: params.get('sec') !== '0',
    showDate: params.get('date') === '1',
    dateFormat: (params.get('dateFmt') as DateFormatOption) || defaults.dateFormat,
    timezone: params.get('tz') || defaults.timezone,
    showTimezone: params.get('showTz') === '1',
    direction: params.get('dir') === 'down' ? 'down' : 'up',
    duration: params.has('dur') ? Number(params.get('dur')) : defaults.duration,
    autoStart: params.get('auto') === '1'
  }
}

export function configToParams(config: ClockTimerWidgetConfig): string {
  const params = new URLSearchParams()

  params.set('mode', config.mode)
  if (config.style !== 'digital') params.set('style', config.style)
  if (config.theme !== 'light') params.set('theme', config.theme)
  if (config.title) params.set('title', config.title)
  if (config.showTitle) params.set('showTitle', '1')
  if (config.numberColor) params.set('numColor', config.numberColor)
  if (config.labelColor) params.set('labelColor', config.labelColor)

  if (config.mode === 'clock') {
    if (config.format === '24h') params.set('fmt', '24')
    if (!config.showSeconds) params.set('sec', '0')
    if (config.showDate) params.set('date', '1')
    if (config.showDate && config.dateFormat !== 'short') params.set('dateFmt', config.dateFormat)
    params.set('tz', config.timezone)
    if (config.showTimezone) params.set('showTz', '1')
  }

  if (config.mode === 'timer') {
    if (config.direction !== 'up') params.set('dir', config.direction)
    if (config.direction === 'down') params.set('dur', String(config.duration))
    if (config.autoStart) params.set('auto', '1')
  }

  return params.toString()
}

export function configToEmbedUrl(config: ClockTimerWidgetConfig): string {
  return `https://blocs.me/clock?${configToParams(config)}`
}
