import useUser from '@/hooks/useUser'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import PomodoroDashboard from './PomodoroDashboard'
import Sidebar from './Sidebar'
import { useRouter } from 'next/router'
import Notifications from '@/design-system/Notifications'
import { PomodoroProvider } from '../../widgets/Pomodoro/usePomodoroStore'
import Footer from '@/design-system/Footer'
import { WidgetAuthProvider } from '@/hooks/useWidgetAuth'
import DashboardNav from './DashboardNav'

const Dashboard = () => {
  const { user } = useUser()
  const { avatar_url } = user || {}
  const { path } = useRouter().query

  return (
    <>
      <DashboardNav />
      <Flex width="100vw" minHeight="100vh" height="100%">
        <Sidebar avatarUrl={avatar_url} />

        <Box width="100%" bg="background">
          <Notifications mt="80px">
            <WidgetAuthProvider>
              <PomodoroProvider>
                {path === 'pomodoro' && <PomodoroDashboard />}
              </PomodoroProvider>
            </WidgetAuthProvider>
          </Notifications>
        </Box>
      </Flex>
      <Box width="100%">
        <Footer />
      </Box>
    </>
  )
}

export default Dashboard
