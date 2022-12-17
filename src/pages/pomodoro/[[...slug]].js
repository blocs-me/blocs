import useNotifications from '@/design-system/Notifications/useNotifications'
import { ColorModeProvider } from '@/hooks/useColorMode'
import { WidgetAuthProvider } from '@/hooks/useWidgetAuth'
import Pomodoro from '@/widgets/Pomodoro'
import { PomodoroProvider } from '@/widgets/Pomodoro/usePomodoroStore'
import WidgetPage from '@/widgets/WidgetPage'

export default function MainPomodoro() {
  const { NotifProvider } = useNotifications()

  return (
    <ColorModeProvider>
      <WidgetAuthProvider>
        <NotifProvider>
          <PomodoroProvider>
            <WidgetPage p="sm">
              <Pomodoro />
            </WidgetPage>
          </PomodoroProvider>
        </NotifProvider>
      </WidgetAuthProvider>
    </ColorModeProvider>
  )
}
