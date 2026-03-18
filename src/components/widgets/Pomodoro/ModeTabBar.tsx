import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'
import { usePomodoroStore, usePomodoroDispatch } from './usePomodoroStore'
import {
  setPomodoroPresetMode,
  setStartedAt,
  setPausedAt
} from './pomodoroActions'
import {
  POMODORO_INTERVAL_MODE,
  POMODORO_SHORT_BREAK_MODE,
  POMODORO_LONG_BREAK_MODE
} from './pomodoroPresetModes'

const modes = [
  { key: POMODORO_INTERVAL_MODE, label: 'Pomodoro' },
  { key: POMODORO_SHORT_BREAK_MODE, label: 'Short Break' },
  { key: POMODORO_LONG_BREAK_MODE, label: 'Long Break' }
]

const ModeTabBar = ({ disabled }: { disabled?: boolean }) => {
  const { presetMode } = usePomodoroStore()
  const dispatch = usePomodoroDispatch()

  const handleTabClick = (mode: string) => {
    if (disabled || mode === presetMode) return
    dispatch(setStartedAt(null))
    dispatch(setPausedAt(null))
    dispatch(setPomodoroPresetMode(mode))
  }

  return (
    <Flex
      justifyContent="center"
      css={{ gap: '4px' }}
      mb="xs"
      width="100%"
    >
      {modes.map(({ key, label }) => {
        const isActive = presetMode === key
        return (
          <Flex
            key={key}
            as="button"
            alignItems="center"
            justifyContent="center"
            px="xs"
            py="4px"
            borderRadius="sm"
            bg={isActive ? 'brand.accent-1' : 'primary.accent-2'}
            css={{
              cursor: disabled ? 'default' : 'pointer',
              border: 'none',
              transition: 'background 0.2s ease',
              '&:hover': !disabled && !isActive ? { opacity: 0.8 } : {}
            }}
            onClick={() => handleTabClick(key)}
          >
            <Text
              fontSize="xxs"
              fontWeight={isActive ? 600 : 400}
              color={isActive ? 'background' : 'primary.accent-4'}
              m={0}
              css={{ whiteSpace: 'nowrap' }}
            >
              {label}
            </Text>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default ModeTabBar
