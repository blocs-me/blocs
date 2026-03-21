import { useState } from 'react'
import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import Box from '@/helpers/Box'
import Button from '@/design-system/Button'
import msToMins from '@/utils/msToMins'
import {
  resetPomodoroSession,
  setCurrentPomodoroPreset,
  showPomodoroActiveSessionMenu
} from '../pomodoroActions'
import { usePomodoroDispatch, usePomodoroStore } from '../usePomodoroStore'
import ScrollProvider from '@/design-system/ScrollProvider'
import ButtonGroup from '@/design-system/ButtonGroup'
import WidgetModal from '@/widgets/WidgetModal'
import Trash from 'src/icons/trash'
import Stopwatch from 'src/icons/stopwatch'
import { Cup } from 'src/icons/cup'

const DurationRow = ({ icon, label, minutes, onChange }) => (
  <Flex
    alignItems="center"
    py="xs"
    px="sm"
    width="100%"
    css={{ gap: '10px' }}
  >
    <Icon fill="foreground" size="18px" as="span" display="flex" css={{ flexShrink: 0 }}>
      {icon}
    </Icon>
    <Text
      as="span"
      fontSize="xs"
      fontWeight="500"
      color="foreground"
      m={0}
      css={{ flex: 1 }}
    >
      {label}
    </Text>
    <Flex alignItems="center" css={{ gap: '4px', flexShrink: 0 }}>
      <Box
        as="input"
        type="number"
        min={1}
        max={120}
        value={minutes}
        onChange={(e) => onChange(Math.max(1, Math.min(120, Number(e.target.value))))}
        color="foreground"
        css={{
          width: '48px',
          textAlign: 'center',
          border: '1px solid',
          borderColor: 'inherit',
          borderRadius: '4px',
          padding: '4px',
          fontSize: '12px',
          background: 'transparent',
          outline: 'none'
        }}
      />
      <Text as="span" fontSize="xxs" color="primary.accent-4" m={0}>
        min
      </Text>
    </Flex>
  </Flex>
)

const PomodoroActiveSessionMenu = () => {
  const {
    activeSessionMenu,
    sessionCount,
    preferences: { startLongBreakAfter, autoStartBreak },
    session: { startedAt },
    currentPreset,
    currentPreset: {
      longBreakInterval,
      shortBreakInterval,
      pomodoroInterval,
      label
    }
  } = usePomodoroStore()

  const showSessionCount =
    longBreakInterval && startLongBreakAfter > 0 && autoStartBreak
  const dispatch = usePomodoroDispatch()

  const [pomodoroMins, setPomodoroMins] = useState(msToMins(pomodoroInterval))
  const [longBreakMins, setLongBreakMins] = useState(msToMins(longBreakInterval))
  const [shortBreakMins, setShortBreakMins] = useState(msToMins(shortBreakInterval))

  const hideModal = () => {
    dispatch(showPomodoroActiveSessionMenu(false))
  }

  const updateDuration = (field, mins) => {
    const ms = mins * 60 * 1000
    const updatedPreset = { ...currentPreset, [field]: ms }
    dispatch(setCurrentPomodoroPreset(updatedPreset))
  }

  const handlePomodoroChange = (mins) => {
    setPomodoroMins(mins)
    updateDuration('pomodoroInterval', mins)
  }

  const handleLongBreakChange = (mins) => {
    setLongBreakMins(mins)
    updateDuration('longBreakInterval', mins)
  }

  const handleShortBreakChange = (mins) => {
    setShortBreakMins(mins)
    updateDuration('shortBreakInterval', mins)
  }

  const resetSessions = () => {
    dispatch(resetPomodoroSession())
    dispatch(showPomodoroActiveSessionMenu(false))
  }

  return (
    <WidgetModal
      open={activeSessionMenu}
      closeModal={hideModal}
      appendTo="#pomo-modal-wrapper"
    >
      <ScrollProvider height="100%" p="sm">
        {showSessionCount && !startedAt && (
          <Flex width="100%" justifyContent="center" mb="sm">
            <Flex
              bg="foreground"
              borderRadius="sm"
              px="xs"
              width="fit-content"
            >
              <Text
                color="primary.accent-1"
                fontSize="sm"
                fontWeight="bold"
                textAlign="center"
                m="auto"
              >
                {sessionCount || 0} / {startLongBreakAfter}{' '}
                <Box as="span" ml="xs" />
                Pomodoros
              </Text>
            </Flex>
          </Flex>
        )}

        {!!startedAt && (
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Text color="foreground" fontWeight={200}>
              Pomodoro is in progress, stop to see the options
            </Text>
            <Button
              variant="danger"
              borderRadius="lg"
              onClick={(e) => {
                e?.stopPropagation()
                dispatch({ type: 'SET_STARTED_AT', startedAt: null })
              }}
              width="100%"
            >
              stop
            </Button>
          </Flex>
        )}

        {!startedAt && (
          <Flex flexDirection="column">
            <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Durations
            </Text>
            <DurationRow
              icon={<Stopwatch />}
              label={label || 'Pomodoro'}
              minutes={pomodoroMins}
              onChange={handlePomodoroChange}
            />
            <DurationRow
              icon={<Cup />}
              label="Long break"
              minutes={longBreakMins}
              onChange={handleLongBreakChange}
            />
            <DurationRow
              icon={<Cup />}
              label="Short break"
              minutes={shortBreakMins}
              onChange={handleShortBreakChange}
            />
            {showSessionCount && (
              <>
                <Box height="1px" bg="primary.accent-2" my="xs" mx="sm" />
                <Button
                  icon={<Trash />}
                  borderRadius="md"
                  fontSize="xs"
                  color="danger.medium"
                  textAlign="start"
                  p="sm"
                  gap="sm"
                  width="100%"
                  onClick={resetSessions}
                >
                  Reset Sessions
                </Button>
              </>
            )}
          </Flex>
        )}
      </ScrollProvider>
    </WidgetModal>
  )
}

export default PomodoroActiveSessionMenu
