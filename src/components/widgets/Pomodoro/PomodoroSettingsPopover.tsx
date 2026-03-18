import { useEffect, useRef, useState } from 'react'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import Switch from '@/design-system/Switch'
import { usePomodoroStore, usePomodoroDispatch } from './usePomodoroStore'
import { setPomodoroPreferences } from './pomodoroActions'

const Label = ({ children }: { children: React.ReactNode }) => (
  <Text m={0} fontSize="xs" fontWeight={400} color="foreground">
    {children}
  </Text>
)

const Row = ({ children }: { children: React.ReactNode }) => (
  <Flex
    justifyContent="space-between"
    alignItems="center"
    py="6px"
  >
    {children}
  </Flex>
)

const PomodoroSettingsPopover = ({ onClose }: { onClose: () => void }) => {
  const { preferences } = usePomodoroStore()
  const dispatch = usePomodoroDispatch()
  const ref = useRef<HTMLDivElement>(null)

  const [alarmVolume, setAlarmVolume] = useState(preferences.alarmVolume ?? 30)
  const [autoStartPomodoro, setAutoStartPomodoro] = useState(!!preferences.autoStartPomodoro)
  const [autoStartBreak, setAutoStartBreak] = useState(!!preferences.autoStartBreak)
  const [deepFocus, setDeepFocus] = useState(!!preferences.deepFocus)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const save = (updates: Record<string, unknown>) => {
    const next = { ...preferences, ...updates }
    dispatch(setPomodoroPreferences(next))
    localStorage.setItem('pomodoroPreferences', JSON.stringify(next))
  }

  const handleVolumeChange = (val: number) => {
    setAlarmVolume(val)
    save({ alarmVolume: val })
  }

  return (
    <Box
      ref={ref}
      position="absolute"
      top="48px"
      right="0"
      width="220px"
      bg="background"
      borderRadius="md"
      boxShadow="lg"
      p="sm"
      zIndex={100}
      css={{ border: '1px solid var(--colors-primary-accent-1)' }}
    >
      <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
        Settings
      </Text>

      <Row>
        <Label>Sound Volume</Label>
      </Row>
      <Box mb="xs">
        <input
          type="range"
          min={0}
          max={100}
          value={alarmVolume}
          onChange={(e) => handleVolumeChange(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--colors-brand-accent-1)' }}
        />
      </Box>

      <Box height="1px" bg="primary.accent-1" my="xs" />

      <Row>
        <Label>Auto-start Pomodoro</Label>
        <Switch
          id="popover-auto-start-pomodoro"
          ariaLabel="auto start pomodoro"
          checked={autoStartPomodoro}
          onChange={() => {
            setAutoStartPomodoro(!autoStartPomodoro)
            save({ autoStartPomodoro: !autoStartPomodoro })
          }}
        />
      </Row>

      <Row>
        <Label>Auto-start Break</Label>
        <Switch
          id="popover-auto-start-break"
          ariaLabel="auto start break"
          checked={autoStartBreak}
          onChange={() => {
            setAutoStartBreak(!autoStartBreak)
            save({ autoStartBreak: !autoStartBreak })
          }}
        />
      </Row>

      <Row>
        <Label>Deep Focus</Label>
        <Switch
          id="popover-deep-focus"
          ariaLabel="deep focus mode"
          checked={deepFocus}
          onChange={() => {
            setDeepFocus(!deepFocus)
            save({ deepFocus: !deepFocus })
          }}
        />
      </Row>
    </Box>
  )
}

export default PomodoroSettingsPopover
