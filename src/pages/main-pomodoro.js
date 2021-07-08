import Flex from "@/helpers/Flex"
import Pomodoro from "@/widgets/Pomodoro"

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
