import { ColorModeProvider } from '@/hooks/useColorMode'
import WidgetPage from '@/widgets/WidgetPage'
import MainPage from './WaterTrackerMainPage'
import { useRouter } from 'next/router'
import Box from '@/helpers/Box'
import WaterTrackerMenu from './WaterTrackerMenu'
import useNotifications from '@/design-system/Notifications/useNotifications'
import Notifications from '@/design-system/Notifications'
import { WaterTrackerProvider } from './hooks/useWaterTracker/useWaterTracker'
import { useInitUrlHash } from '../../../hooks/useUrlHash/useUrlHash'
import useWaterTrackerAuth from '@/widgets/WaterTrackerAnalytics/useWaterTrackerAuth'
import { Suspense } from 'react'
import Flex from '@/helpers/Flex'
import Loader from '@/design-system/Loader'
import PremiumOverlay from '@/pages/Dashboard/PremiumOverlay'

const Overlay = () => {
  const { auth } = useWaterTrackerAuth()
  const isPremium = auth && !auth?.isPremium

  if (!isPremium) return null

  return (
    <Box zIndex="100000" size="100%" position="absolute" top={0} left={0}>
      <Suspense
        fallback={
          <Flex
            size="100%"
            alignItems="center"
            justifyContent="center"
            bg="rgba(0,0,0,0.5)"
            css={{
              backdropFilter: 'blur(10px) saturate(50%)'
            }}
          >
            <Loader width="40px" height="40px" />
          </Flex>
        }
      >
        <PremiumOverlay css={{ padding: '1rem' }} borderRadius="lg" />
      </Suspense>
    </Box>
  )
}

const WaterTracker = () => {
  const { path } = useRouter().query
  const isMain = !path
  const isMenu = path?.[0] === 'menu'
  const { NotifProvider } = useNotifications()
  const { hash, URLHashProvider } = useInitUrlHash<{
    role: string
    token: string
  }>()

  return (
    <URLHashProvider hash={hash}>
      <WaterTrackerProvider>
        <ColorModeProvider>
          <NotifProvider>
            <WidgetPage p="sm">
              <Box
                width="100%"
                maxWidth="385px"
                minWidth="300px"
                bg="background"
                boxShadow="default"
                css={{ aspectRatio: '0.85' }}
                borderRadius="lg"
                p="sm"
                position="relative"
              >
                <Notifications zIndex="2000">
                  {isMain && <MainPage />}
                  {isMenu && <WaterTrackerMenu />}
                  <Box id="wt-widget-wrapper" />
                </Notifications>
                <Overlay />
              </Box>
            </WidgetPage>
          </NotifProvider>
        </ColorModeProvider>
      </WaterTrackerProvider>
    </URLHashProvider>
  )
}

export default WaterTracker
