import {
  getDefaultConfig,
  configFromParams,
  configToParams,
  parseMarkers,
  serializeMarkers,
  CalendarWidgetConfig,
  DateMarker
} from './calendarConfig'

describe('calendarConfig', () => {
  describe('getDefaultConfig', () => {
    it('returns month view with light theme', () => {
      const config = getDefaultConfig()
      expect(config.view).toBe('month')
      expect(config.theme).toBe('light')
      expect(config.startOfWeek).toBe(0)
      expect(config.showWeekNumbers).toBe(false)
      expect(config.markers).toEqual([])
      expect(config.showTitle).toBe(false)
    })
  })

  describe('parseMarkers / serializeMarkers', () => {
    it('parses date-only markers', () => {
      const result = parseMarkers('2026-04-15,2026-05-01')
      expect(result).toEqual([
        { date: '2026-04-15', color: '', label: '' },
        { date: '2026-05-01', color: '', label: '' }
      ])
    })

    it('parses markers with color', () => {
      const result = parseMarkers('2026-04-15:%23ff0000')
      expect(result).toEqual([
        { date: '2026-04-15', color: '#ff0000', label: '' }
      ])
    })

    it('parses markers with color and label', () => {
      const result = parseMarkers('2026-05-01:%23ff0000:Launch%20Day')
      expect(result).toEqual([
        { date: '2026-05-01', color: '#ff0000', label: 'Launch Day' }
      ])
    })

    it('handles empty string', () => {
      expect(parseMarkers('')).toEqual([])
    })

    it('roundtrips markers through serialize/parse', () => {
      const markers: DateMarker[] = [
        { date: '2026-04-15', color: '#ff0000', label: 'Deadline' },
        { date: '2026-05-01', color: '', label: '' },
        { date: '2026-06-30', color: '#00ff00', label: 'Launch' }
      ]
      const serialized = serializeMarkers(markers)
      const parsed = parseMarkers(serialized)
      expect(parsed).toEqual(markers)
    })

    it('serializes date-only markers compactly', () => {
      const markers: DateMarker[] = [
        { date: '2026-04-15', color: '', label: '' }
      ]
      const serialized = serializeMarkers(markers)
      expect(serialized).toBe('2026-04-15')
    })

    it('serializes empty array as empty string', () => {
      expect(serializeMarkers([])).toBe('')
    })
  })

  describe('configFromParams / configToParams roundtrip', () => {
    it('roundtrips a full config', () => {
      const config: CalendarWidgetConfig = {
        ...getDefaultConfig(),
        view: 'year',
        theme: 'dark',
        title: 'My Calendar',
        showTitle: true,
        startOfWeek: 1,
        showWeekNumbers: true,
        fillColor: '#4CAF50',
        headerColor: '#333333',
        markers: [
          { date: '2026-04-15', color: '#ff0000', label: 'Tax Day' },
          { date: '2026-07-04', color: '', label: '' }
        ],
        timezone: 'America/New_York'
      }

      const params = configToParams(config)
      const restored = configFromParams(new URLSearchParams(params))

      expect(restored.view).toBe('year')
      expect(restored.theme).toBe('dark')
      expect(restored.title).toBe('My Calendar')
      expect(restored.showTitle).toBe(true)
      expect(restored.startOfWeek).toBe(1)
      expect(restored.showWeekNumbers).toBe(true)
      expect(restored.fillColor).toBe('#4CAF50')
      expect(restored.headerColor).toBe('#333333')
      expect(restored.markers).toEqual(config.markers)
      expect(restored.timezone).toBe('America/New_York')
    })

    it('roundtrips defaults', () => {
      const config = getDefaultConfig()
      const params = configToParams(config)
      const restored = configFromParams(new URLSearchParams(params))

      expect(restored.view).toBe('month')
      expect(restored.theme).toBe('light')
      expect(restored.startOfWeek).toBe(0)
      expect(restored.showWeekNumbers).toBe(false)
      expect(restored.markers).toEqual([])
    })
  })

  describe('configToParams', () => {
    it('omits default values to keep URL short', () => {
      const config = getDefaultConfig()
      const params = configToParams(config)

      expect(params).not.toContain('view=')
      expect(params).not.toContain('theme=')
      expect(params).not.toContain('sow=')
      expect(params).not.toContain('wn=')
      expect(params).not.toContain('marks=')
      expect(params).not.toContain('showTitle=')
    })
  })

  describe('configFromParams edge cases', () => {
    it('returns defaults for empty params', () => {
      const restored = configFromParams(new URLSearchParams(''))
      expect(restored.view).toBe('month')
      expect(restored.theme).toBe('light')
      expect(restored.startOfWeek).toBe(0)
      expect(restored.markers).toEqual([])
    })
  })
})
