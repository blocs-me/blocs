/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext, useRef } from "react"
import TimerSvg from "./TimerSvg"
import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"
import Text from "@/design-system/Text"
import { usePomodoroDispatch, usePomodoroStore } from "../usePomodoroStore"
import useTimer from "./useTimer"
import { useDidMount } from "beautiful-react-hooks"
import Skeleton from "@/helpers/Skeleton"
import {
  POMODORO_INTERVAL_MODE,
  POMODORO_LONG_BREAK_MODE,
  POMODORO_SHORT_BREAK_MODE,
} from "../pomodoroPresetModes"
import { showPomodoroActiveSessionMenu } from "../pomodoroActions"
import { useWidgetAuthStore } from "@/hooks/useWidgetAuth"
import useColorMode from "@/hooks/useColorMode"
import DefaultTimer from "./DefaultTimer"
import NightSkyTimer from "./NightSky"

const getTimerComponent = (colorMode) => {
  switch (colorMode) {
    case "nightSky":
      return NightSkyTimer
    default:
      return DefaultTimer
  }
}

const Timer = ({ loading }) => {
  const { colorMode } = useColorMode()
  const dispatch = usePomodoroDispatch()
  const { isLoggedIn } = useWidgetAuthStore() || {}
  const [mounted, setMounted] = useState(false)
  const Timer = getTimerComponent(colorMode)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = (e) => {
    e?.stopPropagation()
    if (isLoggedIn) {
      dispatch(showPomodoroActiveSessionMenu(true))
    }
  }

  if (!mounted) return null

  return (
    <Flex
      width="80%"
      height="auto"
      minHeight="200px"
      css={{ position: "relative", cursor: "pointer", "user-select": "none" }}
      onClick={(e) => handleClick(e)}
    >
      <Timer loading={loading} />
    </Flex>
  )
}

export default Timer
