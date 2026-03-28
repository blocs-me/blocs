import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Switch from '@/design-system/Switch'
import MarkerEditor from './MarkerEditor'
import type { CalendarWidgetConfig, CalendarView } from './calendarConfig'

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

type Props = {
  config: CalendarWidgetConfig
  onChange: (updates: Partial<CalendarWidgetConfig>) => void
}

const CalendarSettings = ({ config, onChange }: Props) => {
  return (
    <Flex flexDirection="column" css={{ gap: '2px' }}>
      <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
        Settings
      </Text>

      {/* View */}
      <Row><Label>View</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {(['month', 'year'] as const).map(v => (
          <ToggleButton key={v} label={v} active={config.view === v} onClick={() => onChange({ view: v })} />
        ))}
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Title */}
      <Row><Label>Title</Label></Row>
      <input
        type="text"
        value={config.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="e.g. Team Calendar"
        style={inputStyle}
      />
      <Row>
        <Label>Show Title</Label>
        <Switch
          id="cal-show-title"
          ariaLabel="show title"
          checked={config.showTitle}
          onChange={() => onChange({ showTitle: !config.showTitle })}
        />
      </Row>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Theme */}
      <Row><Label>Theme</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {(['light', 'dark'] as const).map(t => (
          <ToggleButton key={t} label={t} active={config.theme === t} onClick={() => onChange({ theme: t })} />
        ))}
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Start of week */}
      <Row><Label>Start of Week</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        <ToggleButton label="Sunday" active={config.startOfWeek === 0} onClick={() => onChange({ startOfWeek: 0 })} />
        <ToggleButton label="Monday" active={config.startOfWeek === 1} onClick={() => onChange({ startOfWeek: 1 })} />
      </Flex>

      <Row>
        <Label>Week Numbers</Label>
        <Switch
          id="cal-week-numbers"
          ariaLabel="show week numbers"
          checked={config.showWeekNumbers}
          onChange={() => onChange({ showWeekNumbers: !config.showWeekNumbers })}
        />
      </Row>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Timezone */}
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

      {/* Colors */}
      <Row>
        <Label>Accent Color</Label>
        <input
          type="color"
          value={config.fillColor || (config.theme === 'dark' ? '#6C9CFF' : '#4A7AFF')}
          onChange={(e) => onChange({ fillColor: e.target.value })}
          style={{ width: '32px', height: '24px', border: 'none', cursor: 'pointer', background: 'transparent' }}
        />
      </Row>
      <Row>
        <Label>Header Color</Label>
        <input
          type="color"
          value={config.headerColor || (config.theme === 'dark' ? '#ffffff' : '#333333')}
          onChange={(e) => onChange({ headerColor: e.target.value })}
          style={{ width: '32px', height: '24px', border: 'none', cursor: 'pointer', background: 'transparent' }}
        />
      </Row>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Markers */}
      <MarkerEditor
        markers={config.markers}
        onChange={(markers) => onChange({ markers })}
      />
    </Flex>
  )
}

const ToggleButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <Box
    as="button"
    flex="1"
    py="4px"
    borderRadius="sm"
    bg={active ? 'brand.accent-1' : 'primary.accent-2'}
    color={active ? 'neutral.white' : 'foreground'}
    css={{
      border: 'none',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: active ? 600 : 400,
      textTransform: 'capitalize'
    }}
    onClick={onClick}
  >
    {label}
  </Box>
)

export default CalendarSettings
