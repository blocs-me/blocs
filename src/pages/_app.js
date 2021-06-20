import Head from "next/head"
import { ThemeProvider } from "@emotion/react"
import Nav from "../components/Nav"
import GlobalProvider from "../contexts/GlobalContextProvider/GlobalContextProvider"
import GlobalStyle from "../styles/GlobalStyle"
import Reset from "../styles/Reset"
import theme from "../styles/theme"
import Script from "next/script"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "a9429c8dbd674c38bf769344e4abc7d8"}'
        />
      </Head>
      <GlobalProvider>
        <Reset />
        <GlobalStyle />
        <Nav />
        <Component {...pageProps} />
      </GlobalProvider>
    </ThemeProvider>
  )
}

export default MyApp
