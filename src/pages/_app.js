import Head from "next/head"
import { ThemeProvider } from "@emotion/react"
import Nav from "../components/Nav"
import GlobalProvider from "../contexts/GlobalContextProvider/GlobalContextProvider"
import GlobalStyle from "../styles/GlobalStyle"
import Reset from "../styles/Reset"
import theme from "../styles/theme"
import Script from "next/script"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter()

  const getNavTitle = () => {
    if (pathname?.includes("dashboard")) return "DASHBOARD"
    if (pathname?.includes("pricing")) return "PRICING"
    return ""
  }

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "a9429c8dbd674c38bf769344e4abc7d8"}'
        />
      </Head>
      <GlobalProvider>
        <Reset />
        <GlobalStyle />
        <Nav title={getNavTitle()} />
        <Component {...pageProps} />
      </GlobalProvider>
    </ThemeProvider>
  )
}

export default MyApp
