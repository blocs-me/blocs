import { useEffect, useRef, useState } from 'react'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import Switch from '@/design-system/Switch'
import { usePomodoroStore, usePomodoroDispatch } from './usePomodoroStore'
import { setPomodoroPreferences } from './pomodoroActions'
import useColorMode, { useColorModeStore } from '@/hooks/useColorMode'

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

const ThemeButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
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
      fontSize: '11px',
      fontWeight: active ? 600 : 400,
      transition: 'all 0.15s ease'
    }}
    onClick={onClick}
  >
    {label}
  </Box>
)

const PomodoroSettingsPopover = ({ onClose, isAuthenticated }: { onClose: () => void; isAuthenticated?: boolean }) => {
  const { preferences } = usePomodoroStore()
  const dispatch = usePomodoroDispatch()
  const ref = useRef<HTMLDivElement>(null)

  const [alarmVolume, setAlarmVolume] = useState(preferences.alarmVolume ?? 30)
  const [autoStartPomodoro, setAutoStartPomodoro] = useState(!!preferences.autoStartPomodoro)
  const [autoStartBreak, setAutoStartBreak] = useState(!!preferences.autoStartBreak)
  const [deepFocus, setDeepFocus] = useState(!!preferences.deepFocus)
  const [longBreakAfter, setLongBreakAfter] = useState(Number(preferences.startLongBreakAfter) || 4)

  const { colorMode } = useColorModeStore() || {}
  const { setTheme, setBackground } = useColorMode()

  const handleThemeChange = (mode: string) => {
    setTheme(mode)
    setBackground(mode)
  }

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

  const handleLongBreakAfterChange = (val: number) => {
    const clamped = Math.max(0, Math.min(20, val))
    setLongBreakAfter(clamped)
    save({ startLongBreakAfter: clamped })
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
        <Label>Long break after</Label>
        <Flex alignItems="center" css={{ gap: '4px' }}>
          <input
            type="number"
            min={0}
            max={20}
            value={longBreakAfter}
            onChange={(e) => handleLongBreakAfterChange(Number(e.target.value))}
            style={{
              width: '40px',
              textAlign: 'center',
              border: '1px solid var(--colors-primary-accent-2)',
              borderRadius: '4px',
              padding: '2px 4px',
              fontSize: '12px',
              background: 'transparent',
              color: 'var(--colors-foreground)'
            }}
          />
        </Flex>
      </Row>

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

      <Box height="1px" bg="primary.accent-1" my="xs" />

      <Row>
        <Label>Theme</Label>
      </Row>
      <Flex css={{ gap: '4px' }} mb="xs">
        <ThemeButton label="Light" active={colorMode === 'light'} onClick={() => handleThemeChange('light')} />
        <ThemeButton label="Dark" active={colorMode === 'dark'} onClick={() => handleThemeChange('dark')} />
        <ThemeButton label="Auto" active={colorMode === 'auto'} onClick={() => handleThemeChange('auto')} />
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xs" />

      {isAuthenticated ? (
        <Box
          as="a"
          href="/pomodoro/labels"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          css={{
            display: 'block',
            textDecoration: 'none',
            cursor: 'pointer',
            borderRadius: '6px',
            padding: '8px',
            '&:hover': { backgroundColor: 'var(--colors-primary-accent-2)' }
          }}
        >
          <Text fontSize="xxs" fontWeight={600} color="brand.accent-1" m={0}>
            Manage Presets
          </Text>
          <Text fontSize="10px" color="primary.accent-4" m={0} mt="2px">
            Custom durations, labels, and colors
          </Text>
        </Box>
      ) : (
        <Box
          as="a"
          href="https://blocs.me/sign-in"
          target="_blank"
          rel="noopener noreferrer"
          css={{
            display: 'block',
            textDecoration: 'none',
            cursor: 'pointer',
            borderRadius: '6px',
            padding: '8px',
            '&:hover': { backgroundColor: 'var(--colors-primary-accent-2)' }
          }}
        >
          <Text fontSize="xxs" fontWeight={600} color="brand.accent-1" m={0}>
            Custom Durations
          </Text>
          <Text fontSize="10px" color="primary.accent-4" m={0} mt="2px">
            Sign in to customize your timer durations
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default PomodoroSettingsPopover
