import { animate } from "popmotion"
import { useEffect, useState } from "react"
import Flex from "../Flex"
import Button from "../Button"
import Timer from "./Timer"
import WidgetLayout from "../WidgetLayout"

const Pomodoro = () => {
  const pomodoroTime = 1000 * 60 * 5
  const [progress, setProgress] = useState(0)
  const [progressInMilliseconds, setProgressInMilliseconds] =
    useState(pomodoroTime)
  const [timeStart, setTimeStart] = useState(false)

  const handleTimeout = () => {
    const millisecondsProgressed = new Date().getTime() - timeStart
    const percentProgressed = (millisecondsProgressed * 100) / pomodoroTime

    if (millisecondsProgressed <= pomodoroTime) {
      setProgressInMilliseconds(millisecondsProgressed)
      setProgress(percentProgressed)
    } else {
      setTimeStart(false)
      setProgress(0)
      setProgressInMilliseconds(pomodoroTime)
    }
  }

  useEffect(() => {
    let progressInterval

    if (timeStart) progressInterval = setTimeout(() => handleTimeout(), 1000)

    return () => {
      clearTimeout(progressInterval)
    }
  }, [progress, timeStart])

  const handleClick = (ev) => {
    ev.preventDefault()
    if (timeStart) {
      animate({
        from: progress,
        to: 0,
        duration: 20 * progress,
        onUpdate: (percent) => {
          setProgress(percent)
        },
      })

      setProgressInMilliseconds(pomodoroTime)
      return setTimeStart(false)
    }

    setTimeStart(new Date().getTime())
  }

  return (
    <WidgetLayout>
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Timer
          progress={progress}
          progressInMilliseconds={progressInMilliseconds}
        />
        <Button
          onClick={(ev) => handleClick(ev)}
          mt="sm"
          width="100px"
          variant="round"
          height="35px"
          fontSize="xs"
          letterSpacing="sm"
        >
          {timeStart ? "stop" : "start"}
        </Button>
      </Flex>
    </WidgetLayout>
  )
}

export default Pomodoro
