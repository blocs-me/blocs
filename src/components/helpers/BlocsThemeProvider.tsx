import { ColorModeProvider } from '@/hooks/useColorMode'
import { ThemeProvider } from '@emotion/react'
import { ComponentType, ReactNode } from 'react'
import useColorMode from '../../hooks/useColorMode/index'
import { useRouter } from 'next/router'

const { default: lightTheme } = require('src/styles/theme')

const DASHBOARD_PREFIX = '/dashboard'

const withColorMode = (Component: ComponentType<{ children?: ReactNode }>) => {
  return (props) => {
    return (
      <ColorModeProvider>
        <Component {...props} />
      </ColorModeProvider>
    )
  }
}

const BlocsThemeProvider = ({ children }: { children?: ReactNode }) => {
  const { theme } = useColorMode()
  const router = useRouter()
  const isDashboard = router.pathname.startsWith(DASHBOARD_PREFIX)
  const activeTheme = isDashboard ? theme : lightTheme

  return (
    <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
  )
}

export default withColorMode(BlocsThemeProvider)
