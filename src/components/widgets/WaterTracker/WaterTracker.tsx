import ClientSideOnly from '@/helpers/ClientSideOnly'
import useColorMode, { ColorModeProvider } from '@/hooks/useColorMode'
import WidgetPage from '@/widgets/WidgetPage'
import MainPage from './MainPage'
import { ThemeProvider } from '@emotion/react'

const WaterTracker = () => {
  return (
    <ColorModeProvider>
      <WidgetPage>
        <MainPage />
      </WidgetPage>
    </ColorModeProvider>
  )
}

export default WaterTracker
