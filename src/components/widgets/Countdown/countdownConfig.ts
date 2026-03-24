import { UnitKey } from './useCountdown'

export type CountdownWidgetConfig = {
  title: string
  showTitle: boolean
  endDate: string
  timezone: string
  theme: 'light' | 'dark'
  countUp: boolean
  visibleUnits: UnitKey[] | null
  numberColor: string
  labelColor: string
}

const UNIT_SHORT: Record<UnitKey, string> = {
  years: 'y', months: 'mo', weeks: 'w', days: 'd',
  hours: 'h', minutes: 'm', seconds: 's'
}

const SHORT_TO_UNIT: Record<string, UnitKey> = Object.fromEntries(
  Object.entries(UNIT_SHORT).map(([k, v]) => [v, k as UnitKey])
)

function getDefaultEndDate(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(12, 0, 0, 0)
  return tomorrow.toISOString().slice(0, 16)
}

export function getDefaultConfig(): CountdownWidgetConfig {
  return {
    title: 'Countdown',
    showTitle: true,
    endDate: getDefaultEndDate(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    theme: 'light',
    countUp: false,
    visibleUnits: null,
    numberColor: '',
    labelColor: ''
  }
}

export function configFromParams(params: URLSearchParams): CountdownWidgetConfig {
  const defaults = getDefaultConfig()

  const showParam = params.get('show')
  const visibleUnits = showParam
    ? showParam.split(',').map(s => SHORT_TO_UNIT[s]).filter(Boolean)
    : null

  return {
    title: params.get('title') || defaults.title,
    showTitle: params.get('showTitle') !== '0',
    endDate: params.get('end') || defaults.endDate,
    timezone: params.get('tz') || defaults.timezone,
    theme: (params.get('theme') as 'light' | 'dark') || defaults.theme,
    countUp: params.get('countUp') === '1',
    visibleUnits: visibleUnits?.length ? visibleUnits : null,
    numberColor: params.get('numColor') || '',
    labelColor: params.get('labelColor') || ''
  }
}

export function configToParams(config: CountdownWidgetConfig): string {
  const params = new URLSearchParams()

  params.set('title', config.title)
  if (!config.showTitle) params.set('showTitle', '0')
  params.set('end', config.endDate)
  params.set('tz', config.timezone)
  if (config.theme !== 'light') params.set('theme', config.theme)
  if (config.countUp) params.set('countUp', '1')
  if (config.visibleUnits?.length) {
    params.set('show', config.visibleUnits.map(u => UNIT_SHORT[u]).join(','))
  }
  if (config.numberColor) params.set('numColor', config.numberColor)
  if (config.labelColor) params.set('labelColor', config.labelColor)

  return params.toString()
}

export function configToEmbedUrl(config: CountdownWidgetConfig): string {
  return `https://blocs.me/countdown?${configToParams(config)}`
}
