import { ColorModeProvider } from '@/hooks/useColorMode'
import { ThemeProvider } from '@emotion/react'
import { ComponentType, ReactNode } from 'react'
import useColorMode from '../../hooks/useColorMode/index'

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

  return (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )
}

export default withColorMode(BlocsThemeProvider)
