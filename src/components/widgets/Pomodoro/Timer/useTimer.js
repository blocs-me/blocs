import { useState, useRef, useEffect } from "react"
import { usePomodoroStore, usePomodoroDispatch } from "../usePomodoroStore"
import { setStartedAt } from "../pomodoroActions"

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
    session: { startedAt },
    sessionSettings: { interval },
  } = usePomodoroStore()
  const pomodoroDispatch = usePomodoroDispatch()
  const [progressInMilliseconds, setProgressInMilliseconds] = useState(0)
  const [percentProgressed, setPercentProgressed] = useState(0)

  const handleTimeout = (elapsed) => {
    const elapsedTimePercent = (elapsed * 100) / interval

    if (elapsedTimePercent >= 100) {
      console.log("timer finished", elapsedTimePercent)
      setProgressInMilliseconds(interval)
      setPercentProgressed(0)
      pomodoroDispatch(setStartedAt(null))
      return null
    }

    setProgressInMilliseconds(elapsed)
    setPercentProgressed(elapsedTimePercent)
  }

  const controller = useRef(null)
  const timerTimeout = useRef(null)

  const frame = (time) => {
    const signal = controller.current.signal
    if (signal.aborted) return null
    scheduleFrame(time)
  }

  const scheduleFrame = (time) => {
    const elapsed = time - documentTimelineStart
    const roundedElapsed = Math.round(elapsed / 1000) * 1000
    const targetNext = documentTimelineStart + roundedElapsed + 1000
    const delay = targetNext - performance.now()

    handleTimeout(elapsed)
    timerTimeout.current = setTimeout(() => requestAnimationFrame(frame), delay)
  }

  useEffect(() => {
    if (startedAt) {
      controller.current = new AbortController()
      scheduleFrame(documentTimelineStart)
    } else {
      controller.current?.abort()
      clearTimeout(timerTimeout.current)
      setProgressInMilliseconds(interval)
      setPercentProgressed(0)
    }
  }, [startedAt]) // eslint-disable-line

  const minutes = msToMinutes(progressInMilliseconds)
  const seconds = msToSeconds(progressInMilliseconds)

  return {
    clock: { minutes, seconds },
    percentProgressed,
  }
}

export default useTimer
