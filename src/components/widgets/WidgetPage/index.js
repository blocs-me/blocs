const { ThemeProvider, useTheme } = require("@emotion/react")
import useColorMode from "@/hooks/useColorMode"
import useDidMount from "@/hooks/useDidMount"

const { default: Flex } = require("@/helpers/Flex")

const WidgetPage = ({ children }) => {
  const mounted = useDidMount()
  const { backgroundColor } = useColorMode()

  if (!mounted) return null

  return (
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
  )
}

export default WidgetPage
