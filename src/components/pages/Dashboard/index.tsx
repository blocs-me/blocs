import Box from '@/helpers/Box'
import { lazy, Suspense, useEffect } from 'react'
import Flex from '@/helpers/Flex'
import Sidebar from './Sidebar'
import { useRouter } from 'next/router'
import Notifications from '@/design-system/Notifications'
import { PomodoroProvider } from '../../widgets/Pomodoro/usePomodoroStore'
import Footer from '@/design-system/Footer'
import { WidgetAuthProvider } from '@/hooks/useWidgetAuth'
import DashboardNav from './DashboardNav'
import PomodoroDashboard from './PomodoroDashboard'
const HabitTrackerDashboard = lazy(() => import('./HabitTrackerDashboard'))
const WaterTrackerDashboard = lazy(() => import('./WaterTrackerDashboard'))
const Guide = lazy(() => import('./Guide'))
const UserSettings = lazy(() => import('./UserSettings'))
import {
  useSession,
  useSupabaseClient,
  useUser
} from '@supabase/auth-helpers-react'
import Loader from '@/design-system/Loader'
import Text from '@/design-system/Text'
import DashboardSkeleton from './DashboardSkeleton'
import useBlocsUser from '@/hooks/useBlocsUser'

const LoadingScreen = () => {
  return (
    <Flex flex="1" height="100%" maxHeight="calc(100vh - 80px)">
      <Flex m="auto" flexDirection="column" alignItems="center">
        <Loader width="50px" height="50px" />
        <Text fontSize="md" color="brand.accent-1" mt="sm">
          Loading ...
        </Text>
      </Flex>
    </Flex>
  )
}

const Dashboard = () => {
  const user = useUser()
  const router = useRouter()
  const { path } = router.query

  if (!user) {
    return <DashboardSkeleton />
  }

  return (
    <>
      <DashboardNav />

      <Flex width="100%" minHeight="100vh" height="100%" bg="background">
        <Sidebar />

        <Box width="100%" bg="background" position="relative">
          <Notifications mt="80px">
            <WidgetAuthProvider>
              <PomodoroProvider>
                {path === 'pomodoro' && <PomodoroDashboard />}
              </PomodoroProvider>
            </WidgetAuthProvider>

            <Suspense fallback={<LoadingScreen />}>
              {path === 'habit-tracker' && <HabitTrackerDashboard />}
              {path === 'water-tracker' && <WaterTrackerDashboard />}
              {path === 'settings' && <UserSettings />}
              {path === 'guide' && <Guide />}
            </Suspense>
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
