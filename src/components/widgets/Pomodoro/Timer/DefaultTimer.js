import { usePomodoroStore } from '../usePomodoroStore'
import TimerDigits from './TimerDigits'
import useTimer from './useTimer'
const { default: TimerSvg } = require('./TimerSvg')

const DefaultTimer = () => {
  const { clock, percentProgressed } = useTimer()
  const { presetMode, currentPreset } = usePomodoroStore()

  return (
    <>
      <TimerSvg progress={percentProgressed} presetMode={presetMode} />
      <TimerDigits clock={clock} {...currentPreset} presetMode={presetMode} />
    </>
  )
}

export default DefaultTimer
