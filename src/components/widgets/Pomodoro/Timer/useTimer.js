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
    const newStartedAt = Date.now()
    const documentTimelineStart = document.timeline.currentTime
    pomodoroDispatch(setDocumentTimelineStart(documentTimelineStart))
    pomodoroDispatch(setStartedAt(newStartedAt))
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
    const isShortBreak = POMODORO_SHORT_BREAK_MODE === presetMode
    const isLongBreak = POMODORO_LONG_BREAK_MODE === presetMode

    const shouldAutoPlayBreak = autoStartBreak && isInterval
    const longBreakAfter = Number(startLongBreakAfter) || 0
    const nextCount = sessionCount + 1

    const shouldAutoPlayShortBreak =
      shouldAutoPlayBreak &&
      nextCount < longBreakAfter &&
      !!shortBreakInterval &&
      !isShortBreak

    const shouldAutoPlayLongBreak =
      shouldAutoPlayBreak &&
      nextCount === longBreakAfter &&
      !!longBreakInterval &&
      !isLongBreak

    if (shouldAutoPlayShortBreak) {
      startShortBreak()
    }
    if (shouldAutoPlayLongBreak) {
      console.log('start long break')
      startLongBreak()
    }

    if (shouldAutoPlayBreak && longBreakInterval) {
      pomodoroDispatch(setPomodoroSessionCount(nextCount))
    }

    if (isShortBreak && autoStartPomodoro && sessionCount <= longBreakAfter) {
      startPomodoroInterval()
    }

    if (isLongBreak && nextCount >= longBreakAfter && autoStartPomodoro) {
      // pomodoroDispatch(resetPomodoroSession())
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

  const handleDataPersistence = async () => {
    if (presetMode === POMODORO_INTERVAL_MODE) {
      await saveAnalytics({
        presetId,
        startedAt,
        endedAt: Date.now(),
        timeSpent: Math.min(Date.now() - startedAt, pomodoroInterval),
        isoDateString: getCurrentISOString()
      })
    }
  }

  const handleTimerComplete = async () => {
    setProgressInMilliseconds(interval)
    pomodoroDispatch(setStartedAt(null))
    pomodoroDispatch(setPausedAt(null))
    storage.setItem(SET_PAUSED_AT, '')
    await handleDataPersistence()
    playChime()
    clearTimeout(timerTimeout.current)
    handleAutoPlay()
  }

  const handlePauseResume = () => {
    const pausedTime = cachedPausedAt || pausedAt
    const percentElapsed = (pausedTime / interval) * 100

    if (percentElapsed >= 100) {
      pomodoroDispatch(setStartedAt(null))
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
      handleTimerComplete()
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
    if (sessionCount === Number(startLongBreakAfter)) {
      pomodoroDispatch(setPomodoroSessionCount(0))
    }

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
        notifs.createInfo('Previous session was completed ✅')
        handleTimerComplete()
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
    } else {
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
