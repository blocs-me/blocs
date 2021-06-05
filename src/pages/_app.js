import { ThemeProvider } from "@emotion/react"
import { useMediaQuery } from "beautiful-react-hooks"
import GlobalStyle from "../styles/GlobalStyle"
import Reset from "../styles/Reset"
import theme, { darkModeColors } from "../styles/theme"

function MyApp({ Component, pageProps }) {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)")

  return (
    <ThemeProvider theme={darkMode ? { ...theme, ...darkModeColors } : theme}>
      <Reset />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
