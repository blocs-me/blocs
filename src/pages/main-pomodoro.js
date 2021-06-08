import { Flex } from "rebass"
import Pomodoro from "../components/Pomodoro"

Pomodoro

export default function Home() {
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      data-theme="dark-mode-enabled"
    >
      <Pomodoro />
    </Flex>
  )
}
