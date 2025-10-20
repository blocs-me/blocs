import Head from 'next/head'
import { ThemeProvider } from '@emotion/react'
import GlobalProvider from '../contexts/GlobalContextProvider/GlobalContextProvider'
import GlobalStyle from '../styles/GlobalStyle'
import Reset from '../styles/Reset'
import theme from '../styles/theme'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        {process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
          <>
            <script defer data-domain="blocs.me" src="https://plausible.io/js/script.tagged-events.js" />
            <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
          </>
        )}
      </Head>
      <GlobalProvider>
        <Reset />
        <GlobalStyle />
        <Component {...pageProps} />
      </GlobalProvider>
    </ThemeProvider>
  )
}

export default MyApp
