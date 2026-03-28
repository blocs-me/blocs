import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Switch from '@/design-system/Switch'
import type { ClockTimerWidgetConfig, ClockTimerMode, DisplayStyle, DateFormatOption } from './clockConfig'

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

const DURATION_PRESETS = [
  { label: '1 min', value: 60 },
  { label: '5 min', value: 300 },
  { label: '10 min', value: 600 },
  { label: '15 min', value: 900 },
  { label: '30 min', value: 1800 },
  { label: '1 hr', value: 3600 }
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
  config: ClockTimerWidgetConfig
  onChange: (updates: Partial<ClockTimerWidgetConfig>) => void
}

const ClockTimerSettings = ({ config, onChange }: Props) => {
  return (
    <Flex flexDirection="column" css={{ gap: '2px' }}>
      <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
        Settings
      </Text>

      {/* Mode */}
      <Row><Label>Mode</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {(['clock', 'timer'] as const).map(m => (
          <ModeButton key={m} label={m} active={config.mode === m} onClick={() => onChange({ mode: m })} />
        ))}
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Style */}
      <Row><Label>Style</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {(['digital', 'flip', 'minimal'] as const).map(s => (
          <ModeButton key={s} label={s} active={config.style === s} onClick={() => onChange({ style: s })} />
        ))}
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Title */}
      <Row><Label>Title</Label></Row>
      <input
        type="text"
        value={config.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder={config.mode === 'clock' ? 'e.g. Tokyo Time' : 'e.g. Focus Timer'}
        style={inputStyle}
      />
      <Row>
        <Label>Show Title</Label>
        <Switch
          id="clock-show-title"
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
          <ModeButton key={t} label={t} active={config.theme === t} onClick={() => onChange({ theme: t })} />
        ))}
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Mode-specific settings */}
      {config.mode === 'clock' ? (
        <ClockSettings config={config} onChange={onChange} />
      ) : (
        <TimerSettings config={config} onChange={onChange} />
      )}

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Colors */}
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

const ClockSettings = ({ config, onChange }: Props) => (
  <>
    <Row>
      <Label>Format</Label>
    </Row>
    <Flex css={{ gap: '4px' }} mb="xxs">
      {(['12h', '24h'] as const).map(f => (
        <ModeButton key={f} label={f} active={config.format === f} onClick={() => onChange({ format: f })} />
      ))}
    </Flex>

    <Row>
      <Label>Show Seconds</Label>
      <Switch
        id="clock-show-seconds"
        ariaLabel="show seconds"
        checked={config.showSeconds}
        onChange={() => onChange({ showSeconds: !config.showSeconds })}
      />
    </Row>

    <Row>
      <Label>Show Date</Label>
      <Switch
        id="clock-show-date"
        ariaLabel="show date"
        checked={config.showDate}
        onChange={() => onChange({ showDate: !config.showDate })}
      />
    </Row>

    {config.showDate && (
      <>
        <Row><Label>Date Format</Label></Row>
        <select
          value={config.dateFormat}
          onChange={(e) => onChange({ dateFormat: e.target.value as DateFormatOption })}
          style={inputStyle}
        >
          <option value="short">Mon, Mar 28</option>
          <option value="long">March 28, 2026</option>
          <option value="iso">2026-03-28</option>
        </select>
      </>
    )}

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

    <Row>
      <Label>Show Timezone</Label>
      <Switch
        id="clock-show-timezone"
        ariaLabel="show timezone"
        checked={config.showTimezone}
        onChange={() => onChange({ showTimezone: !config.showTimezone })}
      />
    </Row>
  </>
)

const TimerSettings = ({ config, onChange }: Props) => (
  <>
    <Row><Label>Direction</Label></Row>
    <Flex css={{ gap: '4px' }} mb="xxs">
      {([{ value: 'up', label: 'Stopwatch' }, { value: 'down', label: 'Countdown' }] as const).map(d => (
        <ModeButton key={d.value} label={d.label} active={config.direction === d.value} onClick={() => onChange({ direction: d.value })} />
      ))}
    </Flex>

    {config.direction === 'down' && (
      <>
        <Row><Label>Duration</Label></Row>
        <Flex css={{ gap: '4px', flexWrap: 'wrap' }} mb="xxs">
          {DURATION_PRESETS.map(p => (
            <ModeButton
              key={p.value}
              label={p.label}
              active={config.duration === p.value}
              onClick={() => onChange({ duration: p.value })}
            />
          ))}
        </Flex>
        <input
          type="number"
          value={config.duration}
          onChange={(e) => onChange({ duration: Math.max(1, Number(e.target.value)) })}
          min={1}
          style={inputStyle}
          placeholder="Duration in seconds"
        />
      </>
    )}

    <Row>
      <Label>Auto-start on Load</Label>
      <Switch
        id="clock-auto-start"
        ariaLabel="auto start"
        checked={config.autoStart}
        onChange={() => onChange({ autoStart: !config.autoStart })}
      />
    </Row>
  </>
)

const ModeButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
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

export default ClockTimerSettings
