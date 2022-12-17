import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { usePomodoroStore, usePomodoroDispatch } from '../usePomodoroStore'
import {
  resetPomodoroSession,
  setDocumentTimelineStart,
  setPausedAt,
  setPomodoroPresetMode,
  setPomodoroSessionCount,
  setStartedAt,
  SET_PAUSED_AT,
  SET_STARTED_AT,
  showPomodoroActiveSessionMenu
} from '../pomodoroActions'
import {
  POMODORO_INTERVAL_MODE,
  POMODORO_LONG_BREAK_MODE,
  POMODORO_SHORT_BREAK_MODE
} from '../pomodoroPresetModes'
import storage from '@/utils/storage'
import useNotifications from '@/design-system/Notifications/useNotifications'
import { useSavePomodoroAnalytics } from '../hooks/useSavePomodoroAnalytics'
import { getCurrentISOString } from '@/utils/dateUtils/getCurrentISOString'

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
    session: { startedAt, pausedAt },
    sessionCount = 0,
    currentPreset: {
      id: presetId,
      pomodoroInterval,
      longBreakInterval,
      shortBreakInterval
    },
    preferences: {
      alarmVolume,
      autoStartBreak,
      startLongBreakAfter,
      autoStartPomodoro
    },
    presetMode
  } = usePomodoroStore()
  const interval = useMemo(() => {
    if (presetMode === POMODORO_INTERVAL_MODE) return pomodoroInterval
    if (presetMode === POMODORO_LONG_BREAK_MODE) return longBreakInterval
    if (presetMode === POMODORO_SHORT_BREAK_MODE) return shortBreakInterval
  }, [presetMode, pomodoroInterval, longBreakInterval, shortBreakInterval])
  const pomodoroDispatch = usePomodoroDispatch()
  const [progressInMilliseconds, setProgressInMilliseconds] = useState(0)
  const [percentProgressed, setPercentProgressed] = useState(0)
  const controller = useRef(null)
  const timerTimeout = useRef(null)
  const cachedStartedAt = storage.parseJSON(storage.getItem(SET_STARTED_AT))
  const cachedPausedAt = storage.parseJSON(storage.getItem(SET_PAUSED_AT))
  const notifs = useNotifications()
  const saveAnalytics = useSavePomodoroAnalytics()

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
    startShortBreak
  ])

  const playChime = () => {
    const chime = new Audio('/sound-effects/chime.mp3')
    chime.volume = alarmVolume / 100
    chime.play()
  }

  const handleDataPersistence = () => {
    if (presetMode === POMODORO_INTERVAL_MODE) {
      saveAnalytics({
        presetId,
        startedAt,
        endedAt: Date.now(),
        timeSpent: Date.now() - startedAt,
        isoDateString: getCurrentISOString()
      })
    }
  }

  const handleTimerComplete = () => {
    handleDataPersistence()
    playChime()
    handleAutoPlay()
  }

  const handlePauseResume = () => {
    const pausedTime = cachedPausedAt || pausedAt
    const percentElapsed = (pausedTime / interval) * 100

    if (percentElapsed >= 100) {
      pomodoroDispatch(setStartedAt(null))
      pomodoroDispatch(resetPomodoroSession())
      return null
    }

    setPercentProgressed(percentElapsed)
    pomodoroDispatch(
      setDocumentTimelineStart(document.timeline.currentTime - pausedTime)
    )
    pomodoroDispatch(setStartedAt(Date.now() - pausedTime))
    pomodoroDispatch(setPausedAt(null))
  }

  const handleTimeout = (elapsed) => {
    const elapsedTimePercent = (elapsed * 100) / interval

    if (elapsedTimePercent >= 100) {
      controller.current?.abort()
      setProgressInMilliseconds(interval)
      pomodoroDispatch(setStartedAt(null))
      pomodoroDispatch(setPausedAt(null))
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
      const prevElapsedTime = Date.now() - prevStartedAt
      const prevPercentProgress = Math.floor((prevElapsedTime / interval) * 100)

      if (prevPercentProgress >= 100) {
        pomodoroDispatch(setStartedAt(null))
        pomodoroDispatch(resetPomodoroSession())
        notifs.createInfo('Previous session was completed ✅')
        handleAutoPlay()
        return null
      }

      setPercentProgressed(prevPercentProgress)
      pomodoroDispatch(
        setDocumentTimelineStart(
          document.timeline.currentTime - prevElapsedTime
        )
      )
      pomodoroDispatch(setStartedAt(cachedStartedAt))
    }
  }, [cachedStartedAt, interval]) // eslint-disable-line

  useEffect(() => {
    if (cachedPausedAt) {
      const prevElapsedTime = cachedPausedAt
      setPercentProgressed((prevElapsedTime / interval) * 100)
      setProgressInMilliseconds(interval - prevElapsedTime)
      pomodoroDispatch(setPausedAt(cachedPausedAt))

      return null
    }
  }, [cachedPausedAt, interval])

  useEffect(() => {
    if (startedAt) {
      if (pausedAt || cachedPausedAt) {
        handlePauseResume()
      } else {
        initTimer()
      }
    }

    if (!startedAt) {
      controller.current?.abort()
      clearTimeout(timerTimeout.current)
      if (!pausedAt) {
        setProgressInMilliseconds(interval)
        setPercentProgressed(0)
      }
    }

    return () => {
      controller.current?.abort()
    }
  }, [startedAt, pausedAt]) // eslint-disable-line

  const minutes = msToMinutes(progressInMilliseconds)
  const seconds = msToSeconds(progressInMilliseconds)

  return {
    clock: { minutes, seconds },
    percentProgressed
  }
}

export default useTimer
