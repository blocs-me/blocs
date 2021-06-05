import { ThemeProvider } from "@emotion/react"
import { useMediaQuery } from "beautiful-react-hooks"
import GlobalStyle from "../styles/GlobalStyle"
import Reset from "../styles/Reset"
import theme, { darkModeColors } from "../styles/theme"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
