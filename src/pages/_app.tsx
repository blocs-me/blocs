import { ThemeProvider } from '@emotion/react'
import GlobalProvider from '../contexts/GlobalContextProvider/GlobalContextProvider'
import GlobalStyle from '../styles/GlobalStyle'
import Reset from '../styles/Reset'
import theme from '../styles/theme'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Script
        defer
        data-domain="blocs.me"
        src="https://analytics.aryanbhasin.com/js/script.tagged-events.js"
      />
      <GlobalProvider>
        <Reset />
        <GlobalStyle />
        <Component {...pageProps} />
      </GlobalProvider>
    </ThemeProvider>
  )
}

export default MyApp
