import { ColorModeProvider } from '@/hooks/useColorMode'
import { ThemeProvider as TP, ThemeProvider } from '@emotion/react'
import { ComponentType } from 'react'
import useColorMode from '../../hooks/useColorMode/index'
import ClientSideOnly from '@/helpers/ClientSideOnly'

const withColorMode = (Component: ComponentType) => {
  return (props = {}) => {
    return (
      <ColorModeProvider>
        <Component {...props} />
      </ColorModeProvider>
    )
  }
}

const BlocsThemeProvider = ({ children }) => {
  const { theme } = useColorMode()

  return (
    <ClientSideOnly>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ClientSideOnly>
  )
}

export default withColorMode(BlocsThemeProvider)
