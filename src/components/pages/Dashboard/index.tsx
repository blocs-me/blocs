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
import HabitTrackerDashboard from './HabitTrackerDashboard'
import WaterTrackerDashboard from './WaterTrackerDashboard/index'
import Guide from './Guide'
import UserSettings from './UserSettings/index'

const Dashboard = () => {
  const { user } = useUser()
  const { avatar_url } = user || {}
  const { path } = useRouter().query

  return (
    <>
      <DashboardNav />

      <Flex width="100%" minHeight="100vh" height="100%" bg="background">
        <Sidebar avatarUrl={avatar_url} />

        <Box width="100%" bg="background" position="relative">
          <Notifications mt="80px">
            <WidgetAuthProvider>
              <PomodoroProvider>
                {path === 'pomodoro' && <PomodoroDashboard />}
              </PomodoroProvider>
            </WidgetAuthProvider>

            {path === 'habit-tracker' && <HabitTrackerDashboard />}
            {path === 'water-tracker' && <WaterTrackerDashboard />}
            {path === 'settings' && <UserSettings />}
            {path === 'guide' && <Guide />}
          </Notifications>

          {/* {!user?.isPremiumUser && <PremiumOverlay />}
            TODO: uncomment + add stripe integration
          */}
        </Box>
      </Flex>
      <Box width="100%">
        <Footer />
      </Box>
    </>
  )
}

export default Dashboard
