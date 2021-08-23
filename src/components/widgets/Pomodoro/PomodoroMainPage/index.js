import Timer from "../Timer"
import Button from "@/design-system/Button"
import Flex from "@/helpers/Flex"
import Grid from "@/helpers/Grid"
import Icon from "@/helpers/Icon"
import Heart from "../../../../icons/heart.svg"
import { usePomodoroStore, usePomodoroDispatch } from "../usePomodoroStore"
import { setDocumentTimelineStart, setStartedAt } from "../pomodoroActions"
import useSWR from "swr"
import { POMODORO_PRESETS_PATH } from "@/utils/endpoints"
import fetcher from "@/utils/fetcher"
import useNotifications from "@/design-system/Notifications/useNotifications"
import fetchWithToken from "src/services/fetchWithToken"
import Skeleton from "@/helpers/Skeleton"
import PomodoroActiveSessionMenu from "../PomodoroActiveSessionMenu.js"

const PomodoroMainPage = () => {
  const {
    session: { startedAt },
  } = usePomodoroStore()
  const pomodoroDispatch = usePomodoroDispatch()
  const notifs = useNotifications()

  const credentials = "same-origin"
  const handleGetPresetsError = () =>
    notifs.createError(
      "Uh oh ! We were not able to fetch your pomodoro presets"
    )
  const { data: presets } = useSWR(POMODORO_PRESETS_PATH, fetchWithToken(), {
    onError: () => handleGetPresetsError,
    revalidateOnFocus: false,
  })

  const handleClick = () => {
    if (startedAt) {
      // stopping the session
      pomodoroDispatch(setStartedAt(null))
      // TO DO, handle database update
      return null
    }

    // start the session
    pomodoroDispatch(setDocumentTimelineStart(document.timeline.currentTime))
    pomodoroDispatch(setStartedAt(Date.now()))
  }

  return (
    <>
      <PomodoroActiveSessionMenu />

      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Timer loading={!presets} />
        <Flex justifyContent="center" mt="sm">
          {!presets && (
            <Skeleton width="100px" height="40px" borderRadius="lg" />
          )}
          {presets && (
            <Button
              onClick={(ev) => handleClick(ev)}
              width="100px"
              variant="round"
              height="40px"
              fontSize="xs"
              letterSpacing="sm"
              aria-label="Start or stop timer"
              bg="primary.accent-3"
            >
              {startedAt ? "stop" : "start"}
            </Button>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default PomodoroMainPage
