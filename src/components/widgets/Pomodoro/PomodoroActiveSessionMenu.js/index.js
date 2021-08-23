import Button from "@/design-system/Button"
import Text from "@/design-system/Text"
import Flex from "@/helpers/Flex"
import Icon from "@/helpers/Icon"
import msToMins from "@/utils/msToMins"
import WidgetModal from "@/widgets/WidgetModal.js"
import {
  resetPomodoroSession,
  setDocumentTimelineStart,
  setPomodoroPresetMode,
  setStartedAt,
  showPomodoroActiveSessionMenu,
} from "../pomodoroActions"
import { usePomodoroDispatch, usePomodoroStore } from "../usePomodoroStore"
import RepeatIcon from "../../../../icons/repeat.svg"
import CupIcon from "../../../../icons/cup.svg"
import Trash from "../../../../icons/trash-can.svg"
import ScrollProvider from "@/design-system/ScrollProvider"
import Stack from "@/helpers/Stack"
import { useEffect, useRef } from "react/cjs/react.development"
import { useClickOutside } from "@/hooks/useClickOutside"
import {
  POMODORO_INTERVAL_MODE,
  POMODORO_LONG_BREAK_MODE,
  POMODORO_SHORT_BREAK_MODE,
} from "../pomodoroPresetModes"
import { useCallback } from "react"
import Box from "@/helpers/Box"

const IconButton = ({
  bg,
  onClick,
  label,
  interval,
  children,
  iconLeft,
  iconWidth,
}) => {
  return (
    <Button
      as="div"
      bg={bg}
      onClick={(e) => onClick(e)}
      borderRadius="lg"
      color="primary.accent-1"
      css={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      pl="sm"
      py="xs"
      pr="sm"
      minHeight="52px"
    >
      <Icon
        as="span"
        display="inline-flex"
        width={iconWidth}
        stroke="primary.accent-1"
      >
        {iconLeft}
      </Icon>
      {children}
    </Button>
  )
}

const PresetButtonContent = ({ label, interval, iconWidth, hideInterval }) => (
  <Flex flexDirection="column" ml="sm">
    <Text fontSize="xs" fontWeight="500" mb={0} lineHeight={1.25}>
      {label}
    </Text>
    {!hideInterval && (
      <Text fontSize="xs" fontWeight="300" lineHeight={1.25} mb={0}>
        {msToMins(interval)} mins
      </Text>
    )}
  </Flex>
)

const PomodoroActiveSessionMenu = () => {
  const {
    activeSessionMenu,
    preferences: { startLongBreakAfter, sessionCount, autoStartBreak },
    session: { startedAt },
    currentPreset: {
      longBreakInterval,
      shortBreakInterval,
      pomodoroInterval,
      label,
    },
    presetMode,
  } = usePomodoroStore()
  const showSessionCount =
    longBreakInterval && startLongBreakAfter > 0 && autoStartBreak
  const dispatch = usePomodoroDispatch()
  const hideModal = () => {
    dispatch(showPomodoroActiveSessionMenu(false))
  }

  // TO DO HANDLE ALL THE TINGS

  const resetSessions = () => {
    dispatch(resetPomodoroSession())
  }

  const startSession = () => {
    dispatch(setDocumentTimelineStart(document.timeline.currentTime))
    dispatch(setStartedAt(Date.now()))
    dispatch(showPomodoroActiveSessionMenu(false))
  }

  const startLongBreak = (e) => {
    e?.stopPropagation()
    e?.preventDefault()
    resetSessions()
    dispatch(setPomodoroPresetMode(POMODORO_LONG_BREAK_MODE))
    startSession()
  }

  const startShortBreak = (e) => {
    resetSessions()
    dispatch(setPomodoroPresetMode(POMODORO_SHORT_BREAK_MODE))
    startSession()
  }

  const startPomodoroInterval = () => {
    resetSessions()
    dispatch(setPomodoroPresetMode(POMODORO_INTERVAL_MODE))
    startSession()
  }

  const stopSession = (e) => {
    e?.stopPropagation()
    resetSessions()
    dispatch(setStartedAt(null))
  }

  return (
    <WidgetModal
      open={activeSessionMenu}
      hideModal={hideModal}
      framerKey="pomodoro-active-session-menu"
      p="xs"
    >
      <ScrollProvider height="100%" pt="sm" pb="md" px="sm">
        {showSessionCount && !startedAt && (
          <Text color="primary.accent-4" fontSize="sm" fontWeight="500" mb="sm">
            {(sessionCount || 0) + 1} / {startLongBreakAfter}{" "}
            <Box as="span" ml="xs" /> pomodoros
          </Text>
        )}
        {startedAt && (
          <Text color="primary.accent-4">
            Pomodoro is in progress, stop to see the options
          </Text>
        )}
        {startedAt && (
          <Button
            variant="default"
            bg="primary.accent-4"
            borderRadius="lg"
            onClick={(e) => stopSession(e)}
          >
            stop
          </Button>
        )}

        {!startedAt && (
          <Stack
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt="sm"
          >
            <IconButton
              iconLeft={<RepeatIcon />}
              bg="primary.accent-4"
              iconWidth={"16px"}
              onClick={() => startPomodoroInterval()}
            >
              <Box ml="4px" />
              <PresetButtonContent label={label} interval={pomodoroInterval} />
            </IconButton>
            <IconButton
              iconLeft={<CupIcon />}
              bg="primary.accent-4"
              iconWidth="20px"
              onClick={(e) => startLongBreak(e)}
            >
              <PresetButtonContent
                label={"long break"}
                interval={longBreakInterval}
              />
            </IconButton>
            <IconButton
              onClick={() => startShortBreak()}
              iconLeft={<CupIcon />}
              bg="primary.accent-4"
              iconWidth="20px"
            >
              <PresetButtonContent
                label={"short break"}
                interval={shortBreakInterval}
              />
            </IconButton>
            {showSessionCount && (
              <IconButton
                iconLeft={<Trash />}
                bg="danger"
                iconWidth="20px"
                hideInterval
                onClick={() => resetSessions()}
              >
                <PresetButtonContent label={"reset pomodoros"} hideInterval />
              </IconButton>
            )}
          </Stack>
        )}
      </ScrollProvider>
    </WidgetModal>
  )
}

export default PomodoroActiveSessionMenu
