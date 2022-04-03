import { useState, useRef, useEffect, useCallback } from "react"
import { usePomodoroStore, usePomodoroDispatch } from "../usePomodoroStore"
import {
  resetPomodoroSession,
  setDocumentTimelineOffset,
  setDocumentTimelineStart,
  setPomodoroPresetMode,
  setPomodoroSessionCount,
  setStartedAt,
  SET_STARTED_AT,
  showPomodoroActiveSessionMenu,
} from "../pomodoroActions"
import {
  POMODORO_INTERVAL_MODE,
  POMODORO_LONG_BREAK_MODE,
  POMODORO_SHORT_BREAK_MODE,
} from "../pomodoroPresetModes"
import storage from "@/utils/storage"

const msToSeconds = (ms) => {
  const minutes = Math.floor(ms / (1000 * 60))
  const seconds = Math.round(ms / 1000 - minutes * 60)
  return seconds < 10 ? `0${seconds}` : seconds
}

const msToMinutes = (ms) => {
  const minutes = Math.floor(ms / (1000 * 60))
  return minutes < 10 ? `0${minutes}` : minutes
}

const useTimer = () => {
  const {
    documentTimelineStart,
    documentTimelineOffset,
    session: { startedAt },
    sessionCount = 0,
    currentPreset: { pomodoroInterval, longBreakInterval, shortBreakInterval },
    preferences: {
      alarmVolume,
      autoStartBreak,
      startLongBreakAfter,
      autoStartPomodoro,
    },
    presetMode,
  } = usePomodoroStore()
  const interval = (() => {
    if (presetMode === POMODORO_INTERVAL_MODE) return pomodoroInterval
    if (presetMode === POMODORO_LONG_BREAK_MODE) return longBreakInterval
    if (presetMode === POMODORO_SHORT_BREAK_MODE) return shortBreakInterval
  })()
  const pomodoroDispatch = usePomodoroDispatch()
  const [progressInMilliseconds, setProgressInMilliseconds] = useState(0)
  const [percentProgressed, setPercentProgressed] = useState(0)
  const controller = useRef(null)
  const timerTimeout = useRef(null)
  const cachedStartedAt = Number(storage.getItem(SET_STARTED_AT))

  const startTimer = useCallback(() => {
    const startedAt = Date.now()
    const documentTimelineStart = document.timeline.currentTime

    pomodoroDispatch(setDocumentTimelineStart(documentTimelineStart))
    pomodoroDispatch(setStartedAt(startedAt))
  }, [pomodoroDispatch])

  const startLongBreak = useCallback(() => {
    pomodoroDispatch(setPomodoroPresetMode(POMODORO_LONG_BREAK_MODE))
    startTimer()
  }, [pomodoroDispatch, startTimer])

  const startShortBreak = useCallback(() => {
    pomodoroDispatch(setPomodoroPresetMode(POMODORO_SHORT_BREAK_MODE))
    startTimer()
  }, [pomodoroDispatch, startTimer])

  const startPomodoroInterval = useCallback(() => {
    pomodoroDispatch(setPomodoroPresetMode(POMODORO_INTERVAL_MODE))
    startTimer()
  }, [pomodoroDispatch, startTimer])

  const handleAutoPlay = useCallback(() => {
    const isInterval = presetMode === POMODORO_INTERVAL_MODE

    const shouldAutoPlayBreak = autoStartBreak && isInterval

    const shouldAutoPlayShortBreak =
      shouldAutoPlayBreak &&
      sessionCount < startLongBreakAfter - 1 &&
      !!shortBreakInterval

    const shouldAutoPlayLongBreak =
      shouldAutoPlayBreak &&
      sessionCount === startLongBreakAfter - 1 &&
      !!longBreakInterval

    const isShortBreak = POMODORO_SHORT_BREAK_MODE === presetMode
    const isLongBreak = POMODORO_LONG_BREAK_MODE === presetMode

    if (shouldAutoPlayShortBreak) startShortBreak()
    if (shouldAutoPlayLongBreak) startLongBreak()
    if (sessionCount < startLongBreakAfter - 1)
      pomodoroDispatch(setPomodoroSessionCount(sessionCount + 1))
    if (
      isShortBreak &&
      autoStartPomodoro &&
      sessionCount < startLongBreakAfter - 1
    )
      startPomodoroInterval()
    if (
      isLongBreak &&
      sessionCount === startLongBreakAfter - 1 &&
      autoStartPomodoro
    ) {
      pomodoroDispatch(resetPomodoroSession())
      pomodoroDispatch(showPomodoroActiveSessionMenu(true))
    }
  }, [
    autoStartBreak,
    autoStartPomodoro,
    longBreakInterval,
    pomodoroDispatch,
    presetMode,
    sessionCount,
    shortBreakInterval,
    startLongBreak,
    startLongBreakAfter,
    startPomodoroInterval,
    startShortBreak,
  ])

  const playChime = () => {
    const chime = new Audio("/sound-effects/chime.mp3")
    chime.volume = alarmVolume / 100
    chime.play()
  }

  const handleTimerComplete = () => {
    playChime()
    handleAutoPlay()
  }

  const handleTimeout = (elapsed) => {
    const elapsedTimePercent = (elapsed * 100) / interval

    if (elapsedTimePercent >= 100) {
      setProgressInMilliseconds(interval)
      pomodoroDispatch(setStartedAt(null))
      setTimeout(() => handleTimerComplete(), 0)
      return null
    }

    setProgressInMilliseconds(interval - elapsed)
    setPercentProgressed(elapsedTimePercent)
  }

  function frame(time) {
    const signal = controller.current.signal
    if (signal.aborted) return null
    scheduleFrame(time)
  }

  function scheduleFrame(time) {
    const elapsed = time - documentTimelineStart
    console.log(elapsed)
    const roundedElapsed = Math.round(elapsed / 1000) * 1000
    const targetNext = documentTimelineStart + roundedElapsed + 1000
    const delay = targetNext - performance.now()

    handleTimeout(elapsed)
    timerTimeout.current = setTimeout(() => requestAnimationFrame(frame), delay)
  }

  const initTimer = () => {
    controller.current = new AbortController()
    scheduleFrame(documentTimelineStart)
  }

  useEffect(() => {
    if (cachedStartedAt) {
      const prevStartedAt = new Date(cachedStartedAt).getTime()
      const prevElapsedTime =
        Math.round((Date.now() - prevStartedAt) / 1000) * 1000
      const prevPercentProgress = Math.floor((prevElapsedTime / interval) * 100)

      if (prevPercentProgress >= 100) {
        playChime()
        handleAutoPlay()
        return null
      }

      setPercentProgressed(prevPercentProgress)
      pomodoroDispatch(setDocumentTimelineOffset(prevElapsedTime))
      pomodoroDispatch(
        setDocumentTimelineStart(
          document.timeline.currentTime - prevElapsedTime
        )
      )
      pomodoroDispatch(setStartedAt(cachedStartedAt))
    }
  }, [pomodoroDispatch, setPercentProgressed]) // eslint-disable-line

  useEffect(() => {
    if (startedAt) {
      initTimer()
    }

    if (!startedAt && !cachedStartedAt) {
      controller.current?.abort()
      clearTimeout(timerTimeout.current)
      setProgressInMilliseconds(interval)
      setPercentProgressed(0)
    }

    return () => {
      controller.current?.abort()
    }
  }, [startedAt, cachedStartedAt]) // eslint-disable-line

  const minutes = msToMinutes(progressInMilliseconds)
  const seconds = msToSeconds(progressInMilliseconds)

  return {
    clock: { minutes, seconds },
    percentProgressed,
  }
}

export default useTimer
