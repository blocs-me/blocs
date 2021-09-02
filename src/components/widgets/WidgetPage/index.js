const { ThemeProvider, useTheme } = require("@emotion/react")
import useColorMode from "@/hooks/useColorMode"
import useDidMount from "@/hooks/useDidMount"

const { default: Flex } = require("@/helpers/Flex")

const WidgetPage = ({ children }) => {
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
        bg={backgroundColor || "bg.default"}
        id="widget-page"
      >
        {children}
      </Flex>
    </ThemeProvider>
  )
}

export default WidgetPage
