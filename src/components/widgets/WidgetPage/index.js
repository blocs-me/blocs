import useColorMode from "@/hooks/useColorMode"
import useDidMount from "@/hooks/useDidMount"

const { default: Flex } = require("@/helpers/Flex")
const { ThemeProvider } = require("@emotion/react")

const WidgetPage = ({ children }) => {
  const { theme } = useColorMode()

  return (
    <ThemeProvider theme={theme}>
      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        data-theme="notion-bg"
      >
        {children}
      </Flex>
    </ThemeProvider>
  )
}

export default WidgetPage
