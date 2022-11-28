import useColorMode, { ColorModeProvider } from '@/hooks/useColorMode'
import { ComponentType } from 'react'
import { ThemeProvider } from '@emotion/react'
import useNotifications from '@/design-system/Notifications/useNotifications'

const withWidgetProviders = <Props,>(Component: ComponentType) => {
  return (props: Props extends {} ? Props : any) => {
    const { theme } = useColorMode()
    const { NotifProvider } = useNotifications()

    return (
      <ColorModeProvider>
        <ThemeProvider theme={theme}>
          <NotifProvider>
            <Component {...props} />
          </NotifProvider>
        </ThemeProvider>
      </ColorModeProvider>
    )
  }
}

export default withWidgetProviders
