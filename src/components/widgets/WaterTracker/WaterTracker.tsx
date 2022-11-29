import ClientSideOnly from '@/helpers/ClientSideOnly'
import useColorMode, { ColorModeProvider } from '@/hooks/useColorMode'
import WidgetPage from '@/widgets/WidgetPage'
import MainPage from './WaterTrackerMainPage'
import { ThemeProvider } from '@emotion/react'
import { useRouter } from 'next/router'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import WaterTrackerMenu from './WaterTrackerMenu'

const WaterTracker = () => {
  const { path } = useRouter().query
  const isMain = !path
  const isMenu = path?.[0] === 'menu'
  const { role } = useRouter().query

  return (
    <ColorModeProvider>
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
        >
          {isMain && <MainPage />}
          {isMenu && <WaterTrackerMenu />}
        </Box>
      </WidgetPage>
    </ColorModeProvider>
  )
}

export default WaterTracker
