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
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'
import Loader from '@/design-system/Loader'
import Text from '@/design-system/Text'
import DashboardSkeleton from './DashboardSkeleton'
import useMediaQuery from '@/hooks/useMediaQuery'
import float from '@/keyframes/float'
import Nav from '@/design-system/Nav'
import Button from '@/design-system/Button'
import Home from 'src/icons/home'
import Link from 'next/link'
import DashboardMaintenance from '@/design-system/Maintenance/DashboardMaintenance'

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

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === 'yes'

const Dashboard = () => {
  const router = useRouter()
  const { path } = router.query
  const user = useUser()
  const session = useSessionContext()
  const isSmallScreen = useMediaQuery('(min-width: 768px)')
  const showMaintenance =
    isMaintenance && !['settings', 'guide'].includes(path as string)

  useEffect(() => {
    if (user?.aud !== 'authenticated' && !session.isLoading) {
      router.push('/sign-in')
    }
  }, [router, user, session])

  if (!user) {
    return <DashboardSkeleton />
  }

  if (!isSmallScreen) {
    return (
      <>
        <Flex
          display={'block'}
          bg="background"
          height="100%"
          flexDirection={'column'}
        >
          <Flex height="100vh" pt="80px" flexDirection="column" px="md">
            <Nav />

            <Box
              width="min(100%, 600px)"
              height="fit-content"
              boxShadow="lg"
              p="md"
              m="auto"
              borderRadius="lg"
              css={{
                animation: `${float} 1s ease-in-out alternate infinite`,
                textAlign: 'center'
              }}
              borderLeft="solid 10px"
              borderColor="danger.medium"
            >
              <Text
                as="h1"
                fontWeight={400}
                color="foreground"
                textAlign={'center'}
                fontSize={['md', , 'lg', 'xl']}
                mb={0}
              >
                This Dashboard is only available on desktop and tablet.
              </Text>
              <Box mt="md" />
              <Link href="/" passHref>
                <Button
                  as="a"
                  variant="success"
                  color="neutral.white"
                  icon={<Home />}
                >
                  Back Home
                </Button>
              </Link>
            </Box>
          </Flex>
          <Footer />
        </Flex>
      </>
    )
  }

  return (
    <Box bg="background" width="100%">
      <Box width="min(100%, 1600px)" m="0 auto">
        <DashboardNav />
      </Box>
      <Flex
        width="min(100%, 1600px)"
        minHeight="100vh"
        height="100%"
        m="0 auto"
      >
        <Sidebar />

        <Box width="100%" bg="background" position="relative">
          <Notifications mt="md">
            <WidgetAuthProvider>
              <PomodoroProvider>
                {path === 'pomodoro' && !showMaintenance && (
                  <PomodoroDashboard />
                )}
                {showMaintenance && <DashboardMaintenance />}
              </PomodoroProvider>
            </WidgetAuthProvider>

            <Suspense fallback={<LoadingScreen />}>
              {path === 'habit-tracker' && !showMaintenance && (
                <HabitTrackerDashboard />
              )}
              {path === 'water-tracker' && !showMaintenance && (
                <WaterTrackerDashboard />
              )}
              {path === 'settings' && <UserSettings />}
              {path === 'guide' && <Guide />}
            </Suspense>
          </Notifications>
        </Box>
      </Flex>
      <Box width="100%">
        <Footer />
      </Box>
    </Box>
  )
}

export default Dashboard
