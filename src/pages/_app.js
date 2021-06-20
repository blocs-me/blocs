import { ThemeProvider } from "@emotion/react"
import { useMediaQuery } from "beautiful-react-hooks"
import GlobalProvider from "../contexts/GlobalContextProvider/GlobalContextProvider"
import useAuth from "../hooks/useAuth"
import GlobalStyle from "../styles/GlobalStyle"
import Reset from "../styles/Reset"
import theme, { darkModeColors } from "../styles/theme"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <Reset />
        <GlobalStyle />
        <Component {...pageProps} />
      </GlobalProvider>
    </ThemeProvider>
  )
}

export default MyApp
