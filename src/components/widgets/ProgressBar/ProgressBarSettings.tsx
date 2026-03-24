import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Switch from '@/design-system/Switch'
import { ProgressWidgetConfig, ProgressMode, VisualStyle } from './progressBarConfig'

const COMMON_TIMEZONES = [
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Toronto', 'America/Vancouver', 'America/Sao_Paulo', 'America/Mexico_City',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Madrid', 'Europe/Rome',
  'Europe/Amsterdam', 'Europe/Stockholm', 'Europe/Moscow',
  'Asia/Dubai', 'Asia/Kolkata', 'Asia/Singapore', 'Asia/Tokyo', 'Asia/Shanghai',
  'Asia/Hong_Kong', 'Asia/Seoul', 'Asia/Bangkok',
  'Australia/Sydney', 'Australia/Melbourne', 'Pacific/Auckland',
  'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Lagos'
]

const Label = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize="xs" fontWeight={500} color="foreground" m={0}>
    {children}
  </Text>
)

const Row = ({ children }: { children: React.ReactNode }) => (
  <Flex justifyContent="space-between" alignItems="center" py="6px">
    {children}
  </Flex>
)

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '13px',
  background: 'transparent',
  color: 'var(--colors-foreground)',
  outline: 'none',
  marginBottom: '4px'
}

const MODES: { key: ProgressMode; label: string }[] = [
  { key: 'manual', label: 'Manual' },
  { key: 'dateRange', label: 'Date Range' },
  { key: 'calendar', label: 'Calendar' }
]

const STYLES: { key: VisualStyle; label: string }[] = [
  { key: 'bar', label: 'Bar' },
  { key: 'ring', label: 'Ring' },
  { key: 'gauge', label: 'Gauge' }
]

type Props = {
  config: ProgressWidgetConfig
  onChange: (updates: Partial<ProgressWidgetConfig>) => void
}

const ProgressBarSettings = ({ config, onChange }: Props) => {
  return (
    <Flex flexDirection="column" css={{ gap: '2px' }}>
      <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
        Settings
      </Text>

      {/* Mode selector */}
      <Row><Label>Mode</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {MODES.map(m => (
          <Box
            key={m.key}
            as="button"
            flex="1"
            py="4px"
            borderRadius="sm"
            bg={config.mode === m.key ? 'brand.accent-1' : 'primary.accent-2'}
            color={config.mode === m.key ? 'neutral.white' : 'foreground'}
            css={{
              border: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: config.mode === m.key ? 600 : 400
            }}
            onClick={() => onChange({ mode: m.key })}
          >
            {m.label}
          </Box>
        ))}
      </Flex>

      {/* Style selector */}
      <Row><Label>Style</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {STYLES.map(s => (
          <Box
            key={s.key}
            as="button"
            flex="1"
            py="4px"
            borderRadius="sm"
            bg={config.style === s.key ? 'brand.accent-1' : 'primary.accent-2'}
            color={config.style === s.key ? 'neutral.white' : 'foreground'}
            css={{
              border: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: config.style === s.key ? 600 : 400
            }}
            onClick={() => onChange({ style: s.key })}
          >
            {s.label}
          </Box>
        ))}
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Title */}
      <Row><Label>Title</Label></Row>
      <input
        type="text"
        value={config.title}
        onChange={(e) => onChange({ title: e.target.value })}
        style={inputStyle}
      />

      <Row>
        <Label>Show Title</Label>
        <Switch
          id="progress-show-title"
          ariaLabel="show title"
          checked={config.showTitle}
          onChange={() => onChange({ showTitle: !config.showTitle })}
        />
      </Row>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Manual mode fields */}
      {config.mode === 'manual' && (
        <>
          <Row><Label>Total (target)</Label></Row>
          <input
            type="number"
            value={config.total}
            onChange={(e) => onChange({ total: Number(e.target.value) || 0 })}
            min={1}
            style={inputStyle}
          />

          <Row><Label>Start Value</Label></Row>
          <input
            type="number"
            value={config.startValue}
            onChange={(e) => onChange({ startValue: Number(e.target.value) || 0 })}
            style={inputStyle}
          />

          <Row><Label>Increment</Label></Row>
          <input
            type="number"
            value={config.increment}
            onChange={(e) => onChange({ increment: Number(e.target.value) || 1 })}
            min={0.1}
            step={0.1}
            style={inputStyle}
          />

          <Box height="1px" bg="primary.accent-1" my="xxs" />
        </>
      )}

      {/* Date range mode fields */}
      {config.mode === 'dateRange' && (
        <>
          <Row><Label>Start Date</Label></Row>
          <input
            type="datetime-local"
            value={config.startDate.slice(0, 16)}
            onChange={(e) => onChange({ startDate: e.target.value })}
            style={inputStyle}
          />

          <Row><Label>End Date</Label></Row>
          <input
            type="datetime-local"
            value={config.endDate.slice(0, 16)}
            onChange={(e) => onChange({ endDate: e.target.value })}
            style={inputStyle}
          />

          <Row><Label>Timezone</Label></Row>
          <select
            value={config.timezone}
            onChange={(e) => onChange({ timezone: e.target.value })}
            style={inputStyle}
          >
            {COMMON_TIMEZONES.map(tz => (
              <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
            ))}
          </select>

          <Box height="1px" bg="primary.accent-1" my="xxs" />
        </>
      )}

      {/* Calendar mode fields */}
      {config.mode === 'calendar' && (
        <>
          <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xxs" mt="xxs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
            Show
          </Text>
          {(['year', 'month', 'week', 'day'] as const).map(key => (
            <Row key={key}>
              <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              <Switch
                id={`progress-cal-${key}`}
                ariaLabel={`show ${key}`}
                checked={config.calendarBars[key]}
                onChange={() => onChange({
                  calendarBars: { ...config.calendarBars, [key]: !config.calendarBars[key] }
                })}
              />
            </Row>
          ))}

          <Box height="1px" bg="primary.accent-1" my="xxs" />
        </>
      )}

      {/* Theme */}
      <Row><Label>Theme</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {(['light', 'dark'] as const).map(t => (
          <Box
            key={t}
            as="button"
            flex="1"
            py="4px"
            borderRadius="sm"
            bg={config.theme === t ? 'brand.accent-1' : 'primary.accent-2'}
            color={config.theme === t ? 'neutral.white' : 'foreground'}
            css={{
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: config.theme === t ? 600 : 400,
              textTransform: 'capitalize'
            }}
            onClick={() => onChange({ theme: t })}
          >
            {t}
          </Box>
        ))}
      </Flex>

      {/* Fill color */}
      <Row>
        <Label>Fill Color</Label>
        <input
          type="color"
          value={config.fillColor || '#4CAF50'}
          onChange={(e) => onChange({ fillColor: e.target.value })}
          style={{ width: '32px', height: '24px', border: 'none', cursor: 'pointer', background: 'transparent' }}
        />
      </Row>
    </Flex>
  )
}

export default ProgressBarSettings
