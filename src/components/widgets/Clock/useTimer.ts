import { useState, useEffect, useRef, useCallback } from 'react'

export type TimerDisplay = {
  hours: number
  minutes: number
  seconds: number
}

export function computeTimerDisplay(totalSeconds: number): TimerDisplay {
  const clamped = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(clamped / 3600)
  const minutes = Math.floor((clamped % 3600) / 60)
  const seconds = clamped % 60
  return { hours, minutes, seconds }
}

export class TimerState {
  private direction: 'up' | 'down'
  private duration: number
  private accumulated: number = 0
  private startedAt: number | null = null
  isRunning: boolean = false
  isFinished: boolean = false

  constructor(direction: 'up' | 'down', duration: number) {
    this.direction = direction
    this.duration = duration
  }

  start() {
    if (this.isRunning || this.isFinished) return
    this.startedAt = Date.now()
    this.isRunning = true
  }

  pause() {
    if (!this.isRunning || this.startedAt === null) return
    this.accumulated += (Date.now() - this.startedAt) / 1000
    this.startedAt = null
    this.isRunning = false
  }

  reset() {
    this.accumulated = 0
    this.startedAt = null
    this.isRunning = false
    this.isFinished = false
  }

  getElapsed(): number {
    let total = this.accumulated
    if (this.isRunning && this.startedAt !== null) {
      total += (Date.now() - this.startedAt) / 1000
    }
    return Math.floor(total)
  }

  getRemaining(): number {
    const elapsed = this.getElapsed()
    const remaining = Math.max(0, this.duration - elapsed)
    if (remaining === 0 && elapsed > 0) {
      this.isFinished = true
    }
    return Math.floor(remaining)
  }

  getDisplaySeconds(): number {
    return this.direction === 'down' ? this.getRemaining() : this.getElapsed()
  }
}

type UseTimerConfig = {
  direction: 'up' | 'down'
  duration: number
  autoStart: boolean
}

export function useTimer(config: UseTimerConfig) {
  const { direction, duration, autoStart } = config
  const timerRef = useRef<TimerState>(new TimerState(direction, duration))

  const [display, setDisplay] = useState<TimerDisplay>(() =>
    computeTimerDisplay(timerRef.current.getDisplaySeconds())
  )
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const tick = useCallback(() => {
    const timer = timerRef.current
    setDisplay(computeTimerDisplay(timer.getDisplaySeconds()))
    setIsRunning(timer.isRunning)
    setIsFinished(timer.isFinished)
    if (timer.isFinished) timer.pause()
  }, [])

  useEffect(() => {
    if (autoStart) {
      timerRef.current.start()
      tick()
    }
  }, [autoStart, tick])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [isRunning, tick])

  const start = useCallback(() => {
    timerRef.current.start()
    tick()
  }, [tick])

  const pause = useCallback(() => {
    timerRef.current.pause()
    tick()
  }, [tick])

  const reset = useCallback(() => {
    timerRef.current.reset()
    tick()
  }, [tick])

  return { display, isRunning, isFinished, start, pause, reset }
}
