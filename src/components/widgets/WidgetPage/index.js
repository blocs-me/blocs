import { ThemeProvider } from '@emotion/react'
import Flex from '@/helpers/Flex'
import useColorMode from '@/hooks/useColorMode'
import useDidMount from '@/hooks/useDidMount'

const WidgetPage = ({ children, ...rest }) => {
  const { theme, backgroundColor } = useColorMode()
  const mounted = useDidMount()
  if (!mounted) return null

  return (
    <ThemeProvider theme={theme}>
      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        bg={backgroundColor || 'bg.default'}
        id="widget-page"
        {...rest}
      >
        {children}
      </Flex>
    </ThemeProvider>
  )
}

export default WidgetPage
