export type PlateStyle = 'ceramic' | 'matte' | 'minimal'

export type OnMyPlateConfig = {
  title: string
  showTitle: boolean
  items: string[]
  theme: 'light' | 'dark'
  plateStyle: PlateStyle
  plateColor: string
  itemColor: string
  showCount: boolean
}

const PLATE_STYLES: PlateStyle[] = ['ceramic', 'matte', 'minimal']

function withHash(value: string | null): string {
  if (!value) return ''
  return value.startsWith('#') ? value : `#${value}`
}

export function getDefaultConfig(): OnMyPlateConfig {
  return {
    title: 'On My Plate',
    showTitle: true,
    items: ['Big project', 'Errands', 'Family time', 'Self-care'],
    theme: 'light',
    plateStyle: 'ceramic',
    plateColor: '#e8e2d9',
    itemColor: '#7c9c8b',
    showCount: true
  }
}

export function configFromParams(params: URLSearchParams): OnMyPlateConfig {
  const defaults = getDefaultConfig()

  let items = defaults.items
  const itemsParam = params.get('items')
  if (itemsParam !== null) {
    try {
      const parsed = JSON.parse(itemsParam)
      items = Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []
    } catch {
      items = []
    }
  }

  const styleParam = params.get('style') as PlateStyle | null
  const plateStyle = styleParam && PLATE_STYLES.includes(styleParam) ? styleParam : defaults.plateStyle

  return {
    title: params.get('title') || defaults.title,
    showTitle: params.get('showTitle') !== '0',
    items,
    theme: (params.get('theme') as 'light' | 'dark') || defaults.theme,
    plateStyle,
    plateColor: withHash(params.get('plate')) || defaults.plateColor,
    itemColor: withHash(params.get('item')) || defaults.itemColor,
    showCount: params.get('count') !== '0'
  }
}

export function configToParams(config: OnMyPlateConfig): string {
  const params = new URLSearchParams()

  params.set('title', config.title)
  if (!config.showTitle) params.set('showTitle', '0')
  if (config.theme !== 'light') params.set('theme', config.theme)
  if (config.plateStyle !== 'ceramic') params.set('style', config.plateStyle)
  if (config.plateColor) params.set('plate', config.plateColor.replace('#', ''))
  if (config.itemColor) params.set('item', config.itemColor.replace('#', ''))
  if (!config.showCount) params.set('count', '0')
  params.set('items', JSON.stringify(config.items.filter((item) => item.trim().length > 0)))

  return params.toString()
}

export function configToEmbedUrl(config: OnMyPlateConfig): string {
  return `https://blocs.me/on-my-plate?${configToParams(config)}`
}
