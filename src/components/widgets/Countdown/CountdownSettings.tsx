import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Switch from '@/design-system/Switch'
import { CountdownWidgetConfig } from './countdownConfig'
import { UnitKey } from './useCountdown'

const ALL_UNITS: { key: UnitKey; label: string }[] = [
  { key: 'years', label: 'Years' },
  { key: 'months', label: 'Months' },
  { key: 'weeks', label: 'Weeks' },
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' }
]

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

type Props = {
  config: CountdownWidgetConfig
  autoUnits: UnitKey[]
  onChange: (updates: Partial<CountdownWidgetConfig>) => void
}

const CountdownSettings = ({ config, autoUnits, onChange }: Props) => {
  const activeUnits = config.visibleUnits ?? autoUnits

  const toggleUnit = (unit: UnitKey) => {
    const current = [...activeUnits]
    const idx = current.indexOf(unit)
    if (idx >= 0) {
      if (current.length <= 1) return
      current.splice(idx, 1)
    } else {
      current.push(unit)
      current.sort((a, b) => ALL_UNITS.findIndex(u => u.key === a) - ALL_UNITS.findIndex(u => u.key === b))
    }
    onChange({ visibleUnits: current })
  }

  return (
    <Flex flexDirection="column" css={{ gap: '2px' }}>
      <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
        Settings
      </Text>

      <Row>
        <Label>Title</Label>
      </Row>
      <input
        type="text"
        value={config.title}
        onChange={(e) => onChange({ title: e.target.value })}
        style={{
          width: '100%',
          padding: '6px 10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '13px',
          background: 'transparent',
          color: 'var(--colors-foreground)',
          outline: 'none',
          marginBottom: '4px'
        }}
      />

      <Row>
        <Label>Show Title</Label>
        <Switch
          id="countdown-show-title"
          ariaLabel="show title"
          checked={config.showTitle}
          onChange={() => onChange({ showTitle: !config.showTitle })}
        />
      </Row>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      <Row>
        <Label>Target Date & Time</Label>
      </Row>
      <input
        type="datetime-local"
        value={config.endDate.slice(0, 16)}
        onChange={(e) => onChange({ endDate: e.target.value })}
        style={{
          width: '100%',
          padding: '6px 10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '13px',
          background: 'transparent',
          color: 'var(--colors-foreground)',
          outline: 'none',
          marginBottom: '4px'
        }}
      />

      <Row>
        <Label>Timezone</Label>
      </Row>
      <select
        value={config.timezone}
        onChange={(e) => onChange({ timezone: e.target.value })}
        style={{
          width: '100%',
          padding: '6px 10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '13px',
          background: 'transparent',
          color: 'var(--colors-foreground)',
          outline: 'none',
          marginBottom: '4px'
        }}
      >
        {COMMON_TIMEZONES.map(tz => (
          <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
        ))}
      </select>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      <Row>
        <Label>Count Up</Label>
        <Switch
          id="countdown-count-up"
          ariaLabel="count up mode"
          checked={config.countUp}
          onChange={() => onChange({ countUp: !config.countUp })}
        />
      </Row>

      <Row>
        <Label>Theme</Label>
      </Row>
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

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xxs" mt="xxs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
        Visible Units
      </Text>
      {ALL_UNITS.map(({ key, label }) => (
        <Row key={key}>
          <Label>{label}</Label>
          <Switch
            id={`countdown-unit-${key}`}
            ariaLabel={`show ${label}`}
            checked={activeUnits.includes(key)}
            onChange={() => toggleUnit(key)}
          />
        </Row>
      ))}

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      <Row>
        <Label>Number Color</Label>
        <input
          type="color"
          value={config.numberColor || (config.theme === 'dark' ? '#ffffff' : '#333333')}
          onChange={(e) => onChange({ numberColor: e.target.value })}
          style={{ width: '32px', height: '24px', border: 'none', cursor: 'pointer', background: 'transparent' }}
        />
      </Row>
      <Row>
        <Label>Label Color</Label>
        <input
          type="color"
          value={config.labelColor || (config.theme === 'dark' ? '#999999' : '#888888')}
          onChange={(e) => onChange({ labelColor: e.target.value })}
          style={{ width: '32px', height: '24px', border: 'none', cursor: 'pointer', background: 'transparent' }}
        />
      </Row>
    </Flex>
  )
}

export default CountdownSettings
