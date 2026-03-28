import { computeTimerDisplay, TimerState } from './useTimer'

describe('computeTimerDisplay', () => {
  it('formats zero seconds', () => {
    const result = computeTimerDisplay(0)
    expect(result).toEqual({ hours: 0, minutes: 0, seconds: 0 })
  })

  it('formats seconds only', () => {
    const result = computeTimerDisplay(45)
    expect(result).toEqual({ hours: 0, minutes: 0, seconds: 45 })
  })

  it('formats minutes and seconds', () => {
    const result = computeTimerDisplay(125)
    expect(result).toEqual({ hours: 0, minutes: 2, seconds: 5 })
  })

  it('formats hours, minutes, seconds', () => {
    const result = computeTimerDisplay(3661)
    expect(result).toEqual({ hours: 1, minutes: 1, seconds: 1 })
  })

  it('handles large values', () => {
    const result = computeTimerDisplay(36000)
    expect(result).toEqual({ hours: 10, minutes: 0, seconds: 0 })
  })
})

describe('TimerState', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('stopwatch (count up)', () => {
    it('starts at 0', () => {
      const timer = new TimerState('up', 0)
      expect(timer.getElapsed()).toBe(0)
      expect(timer.isRunning).toBe(false)
    })

    it('counts up after start', () => {
      const timer = new TimerState('up', 0)
      timer.start()
      expect(timer.isRunning).toBe(true)

      jest.advanceTimersByTime(3000)
      const elapsed = timer.getElapsed()
      expect(elapsed).toBeGreaterThanOrEqual(2)
      expect(elapsed).toBeLessThanOrEqual(4)
    })

    it('pauses and resumes', () => {
      const timer = new TimerState('up', 0)
      timer.start()
      jest.advanceTimersByTime(2000)
      timer.pause()

      const atPause = timer.getElapsed()
      jest.advanceTimersByTime(5000)
      expect(timer.getElapsed()).toBe(atPause)

      timer.start()
      jest.advanceTimersByTime(1000)
      expect(timer.getElapsed()).toBeGreaterThan(atPause)
    })

    it('resets to 0', () => {
      const timer = new TimerState('up', 0)
      timer.start()
      jest.advanceTimersByTime(5000)
      timer.reset()

      expect(timer.getElapsed()).toBe(0)
      expect(timer.isRunning).toBe(false)
    })
  })

  describe('countdown (count down)', () => {
    it('starts at duration', () => {
      const timer = new TimerState('down', 300)
      expect(timer.getRemaining()).toBe(300)
    })

    it('counts down after start', () => {
      const timer = new TimerState('down', 300)
      timer.start()
      jest.advanceTimersByTime(3000)

      const remaining = timer.getRemaining()
      expect(remaining).toBeGreaterThanOrEqual(296)
      expect(remaining).toBeLessThanOrEqual(298)
    })

    it('clamps at 0', () => {
      const timer = new TimerState('down', 5)
      timer.start()
      jest.advanceTimersByTime(10000)

      expect(timer.getRemaining()).toBe(0)
      expect(timer.isFinished).toBe(true)
    })

    it('resets to original duration', () => {
      const timer = new TimerState('down', 300)
      timer.start()
      jest.advanceTimersByTime(5000)
      timer.reset()

      expect(timer.getRemaining()).toBe(300)
      expect(timer.isRunning).toBe(false)
      expect(timer.isFinished).toBe(false)
    })
  })
})
