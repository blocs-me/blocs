import Flex from '@/helpers/Flex'
import Pomodoro from '@/widgets/Pomodoro'
import { PomodoroProvider } from '@/widgets/Pomodoro/usePomodoroStore'

export default function Home() {
  return (
    <PomodoroProvider>
      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        data-theme="dark-mode-enabled"
      >
        <Pomodoro />
      </Flex>
    </PomodoroProvider>
  )
}
