import {
  getDefaultConfig,
  configFromParams,
  configToParams,
  configToEmbedUrl,
  ProgressWidgetConfig
} from './progressBarConfig'

describe('progressBarConfig', () => {
  describe('getDefaultConfig', () => {
    it('returns manual mode with sensible defaults', () => {
      const config = getDefaultConfig()
      expect(config.mode).toBe('manual')
      expect(config.style).toBe('bar')
      expect(config.total).toBe(100)
      expect(config.startValue).toBe(0)
      expect(config.increment).toBe(1)
      expect(config.showTitle).toBe(true)
      expect(config.theme).toBe('light')
    })
  })

  describe('configToParams / configFromParams roundtrip', () => {
    it('roundtrips manual mode config', () => {
      const config: ProgressWidgetConfig = {
        ...getDefaultConfig(),
        mode: 'manual',
        style: 'ring',
        title: 'Pages Read',
        total: 350,
        startValue: 20,
        increment: 0.5,
        fillColor: '#4CAF50',
        theme: 'dark'
      }
      const params = new URLSearchParams(configToParams(config))
      const restored = configFromParams(params)
      expect(restored.mode).toBe('manual')
      expect(restored.style).toBe('ring')
      expect(restored.title).toBe('Pages Read')
      expect(restored.total).toBe(350)
      expect(restored.startValue).toBe(20)
      expect(restored.increment).toBe(0.5)
      expect(restored.fillColor).toBe('#4CAF50')
      expect(restored.theme).toBe('dark')
    })

    it('roundtrips date range mode config', () => {
      const config: ProgressWidgetConfig = {
        ...getDefaultConfig(),
        mode: 'dateRange',
        style: 'gauge',
        title: 'Q2 Sprint',
        startDate: '2026-04-01T00:00',
        endDate: '2026-06-30T23:59',
        timezone: 'America/New_York'
      }
      const params = new URLSearchParams(configToParams(config))
      const restored = configFromParams(params)
      expect(restored.mode).toBe('dateRange')
      expect(restored.style).toBe('gauge')
      expect(restored.title).toBe('Q2 Sprint')
      expect(restored.startDate).toBe('2026-04-01T00:00')
      expect(restored.endDate).toBe('2026-06-30T23:59')
      expect(restored.timezone).toBe('America/New_York')
    })

    it('roundtrips calendar mode config', () => {
      const config: ProgressWidgetConfig = {
        ...getDefaultConfig(),
        mode: 'calendar',
        style: 'ring',
        calendarBars: { year: true, month: true, week: false, day: true }
      }
      const params = new URLSearchParams(configToParams(config))
      const restored = configFromParams(params)
      expect(restored.mode).toBe('calendar')
      expect(restored.style).toBe('ring')
      expect(restored.calendarBars).toEqual({ year: true, month: true, week: false, day: true })
    })

    it('omits default values from params string', () => {
      const config = getDefaultConfig()
      const paramStr = configToParams(config)
      expect(paramStr).not.toContain('theme=')
      expect(paramStr).not.toContain('startVal=')
    })
  })

  describe('configToEmbedUrl', () => {
    it('produces a valid URL', () => {
      const config = getDefaultConfig()
      const url = configToEmbedUrl(config)
      expect(url).toMatch(/^https:\/\/blocs\.me\/progress-bar\?/)
      expect(url).toContain('mode=manual')
    })
  })
})
