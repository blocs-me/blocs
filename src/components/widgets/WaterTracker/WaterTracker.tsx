import ClientSideOnly from '@/helpers/ClientSideOnly'
import useColorMode, { ColorModeProvider } from '@/hooks/useColorMode'
import WidgetPage from '@/widgets/WidgetPage'
import MainPage from './WaterTrackerMainPage'
import { ThemeProvider } from '@emotion/react'
import { useRouter } from 'next/router'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import WaterTrackerMenu from './WaterTrackerMenu'
import useNotifications from '@/design-system/Notifications/useNotifications'
import Notifications from '@/design-system/Notifications'
import { WaterTrackerProvider } from './hooks/useWaterTracker/useWaterTracker'
import getLocationHash from '../../../hooks/useUrlHash/getUrlHash'
import { useInitUrlHash } from '../../../hooks/useUrlHash/useUrlHash'

const WaterTracker = () => {
  const { path } = useRouter().query
  const isMain = !path
  const isMenu = path?.[0] === 'menu'
  const { NotifProvider } = useNotifications()
  const { hash, URLHashProvider } = useInitUrlHash<{
    role: string
    '#token': string
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
                <Notifications>
                  {isMain && <MainPage />}
                  {isMenu && <WaterTrackerMenu />}
                </Notifications>
              </Box>
            </WidgetPage>
          </NotifProvider>
        </ColorModeProvider>
      </WaterTrackerProvider>
    </URLHashProvider>
  )
}

export default WaterTracker
