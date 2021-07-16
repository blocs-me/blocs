/** @jsxImportSource @emotion/react */
import { animate } from "popmotion"
import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import WidgetLayout from "@/helpers/WidgetLayout"
import Timer from "./Timer"
import Button from "@/design-system/Button"
import Flex from "@/helpers/Flex"
import PomodoroContextProvider from "./PomodoroContextProvider"
import Grid from "@/helpers/Grid"

import Icon from "@/helpers/Icon"
import Heart from "../../../icons/heart.svg"
import pomodoroContext from "./pomodoroContext"

import Stack from "@/helpers/Stack"
import QuickAccessMenu from "./QuickAccessMenu"

const FavouriteButton = () => {
  const [isFavourite, setIsFavourite] = useState(true)
  const [
    {
      favourites = [],
      timer: { settings },
    },
  ] = useContext(pomodoroContext)

  useEffect(() => {
    if (
      favourites.some(
        (favourite) =>
          settings.time === favourite.time && settings.label === favourite.label
      )
    ) {
      setIsFavourite(true)
    }
  }, [])

  return (
    <Flex
      as="button"
      justifyContent="center"
      position="relative"
      overflow="visible"
      aria-label="Quick access menu"
      onClick={() => setIsFavourite(!isFavourite)}
    >
      <Icon
        size="22px"
        stroke={isFavourite ? "danger" : "primary.accent-2"}
        fill={isFavourite ? "danger" : "bg.default"}
      >
        <Heart />
      </Icon>
    </Flex>
  )
}

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
    <PomodoroContextProvider>
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
          <Grid
            gridTemplateColumns="1fr 1fr 1fr"
            justifyContent="space-between"
            width="100%"
            mx="auto"
            alignItems="center"
            mt="sm"
          >
            <QuickAccessMenu />
            <Button
              onClick={(ev) => handleClick(ev)}
              width="100px"
              variant="round"
              height="35px"
              fontSize="xs"
              letterSpacing="sm"
              aria-label="Start or stop timer"
              bg="primary.accent-3"
            >
              {timeStart ? "stop" : "start"}
            </Button>
            <FavouriteButton />
          </Grid>
        </Flex>
      </WidgetLayout>
    </PomodoroContextProvider>
  )
}

export default Pomodoro
