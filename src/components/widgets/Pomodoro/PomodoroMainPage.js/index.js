import Timer from "../Timer"
import Button from "@/design-system/Button"
import Flex from "@/helpers/Flex"
import Grid from "@/helpers/Grid"
import Icon from "@/helpers/Icon"
import Heart from "../../../../icons/heart.svg"
import QuickAccessMenu from "../QuickAccessMenu"
import { useEffect, useState } from "react"
import {
  usePomodoroStore,
  usePomodoroDispatch,
  initialState,
} from "../usePomodoroStore"
import { setDocumentTimelineStart, setStartedAt } from "../pomodoroActions"

const FavouriteButton = () => {
  const [isFavorite, setIsFavourite] = useState(false)
  const {
    favorites = [],
    session: { startedAt, endedAt },
    sessionSettings,
  } = usePomodoroStore()

  useEffect(() => {
    if (
      favorites.find(
        (favorite) =>
          sessionSettings.interval === favorite.interval &&
          sessionSettings.label === favorite.label
      )
    ) {
      setIsFavourite(true)
    }
  }, [favorites]) // eslint-disable-line

  return (
    <Flex
      as="button"
      justifyContent="center"
      position="relative"
      overflow="visible"
      aria-label="Quick access menu"
      onClick={() => setIsFavourite(!isFavorite)}
    >
      <Icon
        size="22px"
        stroke={isFavorite ? "danger" : "primary.accent-2"}
        fill={isFavorite ? "danger" : "bg.default"}
      >
        <Heart />
      </Icon>
    </Flex>
  )
}

const PomodoroMainPage = () => {
  const {
    session: { startedAt },
  } = usePomodoroStore()

  const pomodoroDispatch = usePomodoroDispatch()

  const handleClick = () => {
    if (startedAt) {
      pomodoroDispatch(setStartedAt(null))
      // TO DO, handle database update
      return null
    }

    pomodoroDispatch(setDocumentTimelineStart(document.timeline.currentTime))
    pomodoroDispatch(setStartedAt(Date.now()))
  }

  return (
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Timer />
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
          {startedAt ? "stop" : "start"}
        </Button>
        <FavouriteButton />
      </Grid>
    </Flex>
  )
}

export default PomodoroMainPage
