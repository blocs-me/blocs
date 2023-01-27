import Button from '@/design-system/Button'
import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import msToMins from '@/utils/msToMins'
import {
  resetPomodoroSession,
  setDocumentTimelineStart,
  setPomodoroPresetMode,
  setStartedAt,
  SET_DOCUMENT_TIMELINE_START,
  SET_STARTED_AT,
  showPomodoroActiveSessionMenu
} from '../pomodoroActions'
import { usePomodoroDispatch, usePomodoroStore } from '../usePomodoroStore'
import RepeatIcon from '../../../../icons/repeat.svg'
import CupIcon from '../../../../icons/cup.svg'
import ScrollProvider from '@/design-system/ScrollProvider'
import Stack from '@/helpers/Stack'
import {
  POMODORO_INTERVAL_MODE,
  POMODORO_LONG_BREAK_MODE,
  POMODORO_SHORT_BREAK_MODE
} from '../pomodoroPresetModes'
import Box from '@/helpers/Box'
import WidgetModal from '@/widgets/WidgetModal'
import ButtonGroup, { ButtonGroupButton } from '@/design-system/ButtonGroup'
import { Play } from 'src/icons/play'
import Trash from 'src/icons/trash'
import Stopwatch from 'src/icons/stopwatch'
import { Cup } from 'src/icons/cup'

const IconButton = ({
  bg,
  onClick,
  label,
  interval,
  children,
  iconLeft,
  iconWidth
}) => {
  return (
    <Button
      as="div"
      bg={bg}
      onClick={(e) => onClick(e)}
      borderRadius="lg"
      color="primary.accent-1"
      css={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
      }}
      pl="sm"
      py="xs"
      pr="sm"
      minHeight="52px"
    >
      <Icon
        display="inline-flex"
        // as="span"
        width={iconWidth}
        fill="none"
        stroke="primary.accent-1"
      >
        {iconLeft}
      </Icon>
      {children}
    </Button>
  )
}

const PresetButton = ({ onClick, children, icon }) => (
  <Button
    gap="xs"
    display="flex"
    variant="default"
    color="foreground"
    borderRadius="md"
    bordeRadius="sm"
    css={{ alignItems: 'center' }}
    icon={icon}
    onClick={() => onClick()}
    width="100%"
  >
    <Flex as="span" alignItems="center">
      {children}
    </Flex>
  </Button>
)

const PresetButtonContent = ({ label, interval, iconWidth, hideInterval }) => (
  <Flex flexDirection="column" ml="sm" alignItems="start" m="auto" as="span">
    <Text
      as="span"
      fontSize="xs"
      fontWeight="500"
      mb={0}
      lineHeight={1.25}
      color="foreground"
    >
      {label}
    </Text>
    {!hideInterval && (
      <Text
        as="span"
        fontSize="xs"
        fontWeight="300"
        color="foreground"
        lineHeight={1.25}
        mb={0}
      >
        {msToMins(interval)} mins
      </Text>
    )}
  </Flex>
)

const PomodoroActiveSessionMenu = () => {
  const {
    activeSessionMenu,
    sessionCount,
    preferences: { startLongBreakAfter, autoStartBreak },
    session: { startedAt },
    currentPreset: {
      longBreakInterval,
      shortBreakInterval,
      pomodoroInterval,
      label
    },
    presetMode
  } = usePomodoroStore()
  const showSessionCount =
    longBreakInterval && startLongBreakAfter > 0 && autoStartBreak
  const dispatch = usePomodoroDispatch()
  const hideModal = () => {
    dispatch(showPomodoroActiveSessionMenu(false))
  }

  const resetSessions = () => {
    dispatch(resetPomodoroSession())
  }

  const startSession = () => {
    const documentTimelineStart = document.timeline.currentTime
    const startedAt = Date.now()

    localStorage?.setItem(SET_DOCUMENT_TIMELINE_START, documentTimelineStart)
    localStorage?.setItem(SET_STARTED_AT, startedAt)

    dispatch(setDocumentTimelineStart(documentTimelineStart))
    dispatch(setStartedAt(startedAt))
    dispatch(showPomodoroActiveSessionMenu(false))
  }

  const startLongBreak = (e) => {
    e?.stopPropagation()
    e?.preventDefault()
    dispatch(setPomodoroPresetMode(POMODORO_LONG_BREAK_MODE))
    startSession()
  }

  const startShortBreak = (e) => {
    dispatch(setPomodoroPresetMode(POMODORO_SHORT_BREAK_MODE))
    startSession()
  }

  const startPomodoroInterval = () => {
    dispatch(setPomodoroPresetMode(POMODORO_INTERVAL_MODE))
    startSession()
  }

  const stopSession = (e) => {
    e?.stopPropagation()
    dispatch(setStartedAt(null))
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
              // m="0 auto"
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
        <Flex
          flexDirection="column"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          {startedAt && (
            <Text color="foreground" fontWeight={200}>
              Pomodoro is in progress, stop to see the options
            </Text>
          )}
          {startedAt && (
            <Button
              variant="danger"
              borderRadius="lg"
              onClick={(e) => stopSession(e)}
              width="100%"
            >
              stop
            </Button>
          )}
        </Flex>
        {!startedAt && (
          <ButtonGroup gap={0}>
            <PresetButton onClick={() => startPomodoroInterval()}>
              <Icon
                fill="foreground"
                size="20px"
                as="span"
                display="flex"
                mr="sm"
              >
                <Stopwatch />
              </Icon>
              <PresetButtonContent label={label} interval={pomodoroInterval} />
            </PresetButton>
            <PresetButton onClick={(e) => startLongBreak(e)}>
              <Icon
                fill="foreground"
                size="20px"
                as="span"
                display="flex"
                mr="sm"
              >
                <Cup />
              </Icon>
              <PresetButtonContent
                label={'long break'}
                interval={longBreakInterval}
              />
            </PresetButton>
            <PresetButton icon={<Cup />} onClick={(e) => startShortBreak(e)}>
              <Box ml="xs">
                <PresetButtonContent
                  label={'short break'}
                  interval={shortBreakInterval}
                />
              </Box>
            </PresetButton>
            {showSessionCount && (
              <Button
                icon={<Trash />}
                borderRadius="md"
                fontSize="xs"
                color="danger.medium"
                textAlign="start"
                p="sm"
                gap="sm"
                width="100%"
                onClick={() => resetSessions()}
              >
                Reset Sessions
              </Button>
            )}
          </ButtonGroup>
        )}
      </ScrollProvider>
    </WidgetModal>
  )
}

export default PomodoroActiveSessionMenu
