import Box from '@/helpers/Box'
import { lazy, Suspense, useEffect } from 'react'
import Flex from '@/helpers/Flex'
import { useRouter } from 'next/router'
import Notifications from '@/design-system/Notifications'
import { PomodoroProvider } from '../../widgets/Pomodoro/usePomodoroStore'
import { WidgetAuthProvider } from '@/hooks/useWidgetAuth'
import DashboardNav from './DashboardNav'
const PomodoroDashboard = lazy(() => import('./PomodoroDashboard'))
const HabitTrackerDashboard = lazy(() => import('./HabitTrackerDashboard'))
const WaterTrackerDashboard = lazy(() => import('./WaterTrackerDashboard'))
const PlanPage = lazy(() => import('./PlanPage'))
const CountdownDashboard = lazy(() => import('./CountdownDashboard'))
const ProgressBarDashboard = lazy(() => import('./ProgressBarDashboard'))
const ClockDashboard = lazy(() => import('./ClockDashboard'))
const CalendarDashboard = lazy(() => import('./CalendarDashboard'))
const QuoteDashboard = lazy(() => import('./QuoteDashboard'))
const WeatherDashboard = lazy(() => import('./WeatherDashboard'))
import DashboardHome from './DashboardHome'
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'
import Loader from '@/design-system/Loader'
import Text from '@/design-system/Text'
import DashboardSkeleton from './DashboardSkeleton'
import useMediaQuery from '@/hooks/useMediaQuery'
import Nav from '@/design-system/Nav'
import Button from '@/design-system/Button'
import Home from 'src/icons/home'
import Link from 'next/link'
import DashboardMaintenance from '@/design-system/Maintenance/DashboardMaintenance'

const LoadingScreen = () => (
  <Flex flex="1" height="100%" minHeight="400px" justifyContent="center" alignItems="center">
    <Flex flexDirection="column" alignItems="center">
      <Loader width="40px" height="40px" />
      <Text fontSize="sm" color="primary.accent-4" mt="sm">
        Loading...
      </Text>
    </Flex>
  </Flex>
)

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === 'yes'
const validPaths = ['pomodoro', 'habit-tracker', 'water-tracker', 'countdown', 'progress-bar', 'clock', 'calendar', 'quote', 'weather', 'plan']

const Dashboard = () => {
  const router = useRouter()
  const { path } = router.query
  const user = useUser()
  const session = useSessionContext()
  const isSmallScreen = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    if (user?.aud !== 'authenticated' && !session.isLoading) {
      router.push('/sign-in')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.aud, session.isLoading])

  useEffect(() => {
    if (path && !validPaths.includes(path as string)) {
      router.replace('/dashboard')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  if (!user) {
    return <DashboardSkeleton />
  }

  if (!isSmallScreen) {
    return (
      <Flex
        bg="background"
        height="100vh"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px="md"
      >
        <Nav />
        <Box
          width="min(100%, 400px)"
          p="md"
          borderRadius="lg"
          bg="primary.accent-2"
          css={{ textAlign: 'center' }}
        >
          <Text as="h1" fontWeight={600} color="foreground" fontSize="md" mb="xs">
            Dashboard is desktop only
          </Text>
          <Text fontSize="sm" color="primary.accent-4" mb="md">
            Open this page on a larger screen to manage your widgets.
          </Text>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button variant="success" color="neutral.white" icon={<Home />} borderRadius="md">
              Back Home
            </Button>
          </Link>
        </Box>
      </Flex>
    )
  }

  return (
    <Box bg="background" width="100%" minHeight="100vh">
      <Box width="min(100%, 1200px)" m="0 auto">
        <DashboardNav />
      </Box>

      <Box key={path as string} width="min(100%, 1200px)" m="0 auto" p="md">
        <Notifications>
          {isMaintenance && <DashboardMaintenance />}

          <Suspense fallback={<LoadingScreen />}>
            {!path && <DashboardHome />}
            {path === 'pomodoro' && !isMaintenance && (
              <WidgetAuthProvider>
                <PomodoroProvider>
                  <PomodoroDashboard />
                </PomodoroProvider>
              </WidgetAuthProvider>
            )}
            {path === 'habit-tracker' && !isMaintenance && (
              <HabitTrackerDashboard />
            )}
            {path === 'water-tracker' && !isMaintenance && (
              <WaterTrackerDashboard />
            )}
            {path === 'countdown' && !isMaintenance && (
              <CountdownDashboard />
            )}
            {path === 'progress-bar' && !isMaintenance && (
              <ProgressBarDashboard />
            )}
            {path === 'clock' && !isMaintenance && (
              <ClockDashboard />
            )}
            {path === 'calendar' && !isMaintenance && (
              <CalendarDashboard />
            )}
            {path === 'quote' && !isMaintenance && (
              <QuoteDashboard />
            )}
            {path === 'weather' && !isMaintenance && (
              <WeatherDashboard />
            )}
            {path === 'plan' && !isMaintenance && (
              <PlanPage />
            )}
          </Suspense>
        </Notifications>
      </Box>
    </Box>
  )
}

export default Dashboard
