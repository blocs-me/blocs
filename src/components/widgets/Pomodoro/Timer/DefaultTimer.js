import {
  POMODORO_INTERVAL_MODE,
  POMODORO_LONG_BREAK_MODE,
  POMODORO_SHORT_BREAK_MODE,
} from "../pomodoroPresetModes"
import { usePomodoroStore } from "../usePomodoroStore"
import TimerDigits from "./TimerDigits"
import useTimer from "./useTimer"

const { default: Text } = require("@/design-system/Text")
const { default: Box } = require("@/helpers/Box")
const { default: Flex } = require("@/helpers/Flex")
const { default: Skeleton } = require("@/helpers/Skeleton")
const { default: TimerSvg } = require("./TimerSvg")

const DefaultTimer = () => {
  const { clock, percentProgressed } = useTimer()
  const { presetMode, currentPreset } = usePomodoroStore()

  return (
    <>
      <TimerSvg progress={percentProgressed} />
      <TimerDigits clock={clock} {...currentPreset} presetMode={presetMode} />
    </>
  )
}

export default DefaultTimer
