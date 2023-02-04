import useNotifications from '@/design-system/Notifications/useNotifications'
import { ColorModeProvider } from '@/hooks/useColorMode'
import { useInitUrlHash } from '@/hooks/useUrlHash/useUrlHash'
import { WidgetAuthProvider } from '@/hooks/useWidgetAuth'
import Pomodoro from '@/widgets/Pomodoro'
import { PomodoroProvider } from '@/widgets/Pomodoro/usePomodoroStore'
import WidgetPage from '@/widgets/WidgetPage'

export default function MainPomodoro() {
  const { NotifProvider } = useNotifications()
  const { hash, URLHashProvider } = useInitUrlHash()

  return (
    <URLHashProvider hash={hash}>
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
    </URLHashProvider>
  )
}
