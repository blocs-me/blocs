import { configFromParams, configToParams, getDefaultConfig, ClockTimerWidgetConfig } from './clockConfig'

describe('clockConfig', () => {
  describe('getDefaultConfig', () => {
    it('returns clock mode with digital style', () => {
      const config = getDefaultConfig()
      expect(config.mode).toBe('clock')
      expect(config.style).toBe('digital')
      expect(config.theme).toBe('light')
      expect(config.format).toBe('12h')
      expect(config.showSeconds).toBe(true)
      expect(config.showDate).toBe(false)
      expect(config.showTitle).toBe(false)
      expect(config.direction).toBe('up')
      expect(config.duration).toBe(300)
      expect(config.autoStart).toBe(false)
    })
  })

  describe('configFromParams / configToParams roundtrip', () => {
    it('roundtrips a clock config', () => {
      const config: ClockTimerWidgetConfig = {
        ...getDefaultConfig(),
        mode: 'clock',
        style: 'flip',
        theme: 'dark',
        title: 'Tokyo',
        showTitle: true,
        numberColor: '#ff0000',
        labelColor: '#00ff00',
        format: '24h',
        showSeconds: false,
        showDate: true,
        dateFormat: 'long',
        timezone: 'Asia/Tokyo',
        showTimezone: true
      }

      const params = configToParams(config)
      const restored = configFromParams(new URLSearchParams(params))

      expect(restored.mode).toBe('clock')
      expect(restored.style).toBe('flip')
      expect(restored.theme).toBe('dark')
      expect(restored.title).toBe('Tokyo')
      expect(restored.showTitle).toBe(true)
      expect(restored.numberColor).toBe('#ff0000')
      expect(restored.labelColor).toBe('#00ff00')
      expect(restored.format).toBe('24h')
      expect(restored.showSeconds).toBe(false)
      expect(restored.showDate).toBe(true)
      expect(restored.dateFormat).toBe('long')
      expect(restored.timezone).toBe('Asia/Tokyo')
      expect(restored.showTimezone).toBe(true)
    })

    it('roundtrips a timer config', () => {
      const config: ClockTimerWidgetConfig = {
        ...getDefaultConfig(),
        mode: 'timer',
        style: 'minimal',
        direction: 'down',
        duration: 600,
        autoStart: true
      }

      const params = configToParams(config)
      const restored = configFromParams(new URLSearchParams(params))

      expect(restored.mode).toBe('timer')
      expect(restored.style).toBe('minimal')
      expect(restored.direction).toBe('down')
      expect(restored.duration).toBe(600)
      expect(restored.autoStart).toBe(true)
    })

    it('roundtrips defaults (clock mode)', () => {
      const config = getDefaultConfig()
      const params = configToParams(config)
      const restored = configFromParams(new URLSearchParams(params))

      expect(restored.mode).toBe('clock')
      expect(restored.style).toBe('digital')
      expect(restored.theme).toBe('light')
      expect(restored.format).toBe('12h')
      expect(restored.showSeconds).toBe(true)
    })
  })

  describe('configFromParams edge cases', () => {
    it('returns defaults for empty params', () => {
      const restored = configFromParams(new URLSearchParams(''))
      const defaults = getDefaultConfig()

      expect(restored.mode).toBe(defaults.mode)
      expect(restored.style).toBe(defaults.style)
      expect(restored.format).toBe(defaults.format)
      expect(restored.showSeconds).toBe(true)
      expect(restored.duration).toBe(300)
    })

    it('parses sec=0 as showSeconds false', () => {
      const restored = configFromParams(new URLSearchParams('sec=0'))
      expect(restored.showSeconds).toBe(false)
    })

    it('parses fmt=24 as 24h format', () => {
      const restored = configFromParams(new URLSearchParams('fmt=24'))
      expect(restored.format).toBe('24h')
    })
  })

  describe('configToParams', () => {
    it('omits clock-specific params in timer mode', () => {
      const config: ClockTimerWidgetConfig = {
        ...getDefaultConfig(),
        mode: 'timer',
        timezone: 'Asia/Tokyo',
        showDate: true
      }

      const params = configToParams(config)
      expect(params).not.toContain('tz=')
      expect(params).not.toContain('date=')
    })

    it('omits timer-specific params in clock mode', () => {
      const config: ClockTimerWidgetConfig = {
        ...getDefaultConfig(),
        mode: 'clock',
        direction: 'down',
        duration: 600,
        autoStart: true
      }

      const params = configToParams(config)
      expect(params).not.toContain('dir=')
      expect(params).not.toContain('dur=')
      expect(params).not.toContain('auto=')
    })

    it('omits default values to keep URL short', () => {
      const config = getDefaultConfig()
      const params = configToParams(config)

      expect(params).not.toContain('style=')
      expect(params).not.toContain('theme=')
      expect(params).not.toContain('fmt=')
      expect(params).not.toContain('showTitle=')
    })
  })
})
