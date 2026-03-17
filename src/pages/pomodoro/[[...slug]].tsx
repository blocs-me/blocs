import useNotifications from '@/design-system/Notifications/useNotifications'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import { ColorModeProvider } from '@/hooks/useColorMode'
import { useInitUrlHash } from '@/hooks/useUrlHash/useUrlHash'
import { WidgetAuthProvider } from '@/hooks/useWidgetAuth'
import Pomodoro from '@/widgets/Pomodoro'
import DummyPomodoro from '@/widgets/Pomodoro/DummyPomodoro'
import {
  setDocumentTimelineStart,
  setStartedAt
} from '@/widgets/Pomodoro/pomodoroActions'
import {
  PomodoroProvider,
  usePomodoroDispatch
} from '@/widgets/Pomodoro/usePomodoroStore'
import WidgetPage from '@/widgets/WidgetPage'
import DemoBanner from '@/widgets/DemoBanner'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const DemoPomodoro = () => {
  const pomodoroDispatch = usePomodoroDispatch()

  useEffect(() => {
    pomodoroDispatch(setDocumentTimelineStart(document.timeline.currentTime))
    pomodoroDispatch(setStartedAt(Date.now()))
  }, []) // eslint-disable-line

  return (
    <WidgetPage p="sm" bg="bg.notion">
      <BlocsThemeProvider>
        <PomodoroProvider>
          <DummyPomodoro
            height="auto"
            width="100%"
            maxWidth="385px"
            minWidth="300px"
          />
          <DemoBanner />
        </PomodoroProvider>
      </BlocsThemeProvider>
    </WidgetPage>
  )
}

export default function MainPomodoro() {
  const router = useRouter()

  if (!router.isReady) return null

  if (!router.query.token) {
    return (
      <PomodoroProvider>
        <DemoPomodoro />
      </PomodoroProvider>
    )
  }

  return <AuthenticatedPomodoro />
}

function AuthenticatedPomodoro() {
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
