import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import DummyPomodoro from '@/widgets/Pomodoro/DummyPomodoro'
import { PomodoroProvider } from '@/widgets/Pomodoro/usePomodoroStore'
import WidgetPage from '@/widgets/WidgetPage'

const PomodoroDummy = () => {
  return (
    <BlocsThemeProvider>
      <WidgetPage p="sm">
        <PomodoroProvider>
          <DummyPomodoro
            height="auto"
            width="100%"
            maxWidth="385px"
            minWidth="300px"
          />
        </PomodoroProvider>
      </WidgetPage>
    </BlocsThemeProvider>
  )
}

export default PomodoroDummy
