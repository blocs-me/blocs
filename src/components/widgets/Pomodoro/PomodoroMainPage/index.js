import Timer from "../Timer"
import Button from "@/design-system/Button"
import Flex from "@/helpers/Flex"
import Grid from "@/helpers/Grid"
import Icon from "@/helpers/Icon"
import Heart from "../../../../icons/heart.svg"
import { usePomodoroStore, usePomodoroDispatch } from "../usePomodoroStore"
import { setDocumentTimelineStart, setStartedAt } from "../pomodoroActions"

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
      <Flex justifyContent="center" mt="sm">
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
      </Flex>
    </Flex>
  )
}

export default PomodoroMainPage
