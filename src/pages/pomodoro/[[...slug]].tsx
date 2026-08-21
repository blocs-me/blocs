import Head from 'next/head'
import useNotifications from '@/design-system/Notifications/useNotifications'
import { ColorModeProvider } from '@/hooks/useColorMode'
import { useInitUrlHash } from '@/hooks/useUrlHash/useUrlHash'
import { WidgetAuthProvider } from '@/hooks/useWidgetAuth'
import Pomodoro from '@/widgets/Pomodoro'
import DummyPomodoro from '@/widgets/Pomodoro/DummyPomodoro'
import { PomodoroProvider } from '@/widgets/Pomodoro/usePomodoroStore'
import WidgetPage from '@/widgets/WidgetPage'
import MadeWithBlocs from '@/design-system/MadeWithBlocs'
import { useRouter } from 'next/router'

const DemoPomodoro = () => {
  return (
    <WidgetPage p="sm" bg="bg.notion" flexDirection="column">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DummyPomodoro
        height="auto"
        width="100%"
        maxWidth="385px"
        minWidth="300px"
      />
      <MadeWithBlocs href="https://blocs.me/pomodoro-timer" />
    </WidgetPage>
  )
}

export default function MainPomodoro() {
  const router = useRouter()

  if (!router.isReady) return null

  if (!router.query.token) {
    return <DemoPomodoro />
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <AuthenticatedPomodoro />
    </>
  )
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
