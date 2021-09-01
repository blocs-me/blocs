const { ThemeProvider, useTheme } = require("@emotion/react")
import useColorMode from "@/hooks/useColorMode"

const { default: Flex } = require("@/helpers/Flex")

const WidgetPage = ({ children }) => {
  const { theme, backgroundColor } = useColorMode()

  return (
    <ThemeProvider theme={theme}>
      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        bg={backgroundColor || "bg.default"}
      >
        {children}
      </Flex>
    </ThemeProvider>
  )
}

export default WidgetPage
