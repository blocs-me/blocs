import Head from 'next/head'
import { ThemeProvider } from '@emotion/react'
import GlobalProvider from '../contexts/GlobalContextProvider/GlobalContextProvider'
import GlobalStyle from '../styles/GlobalStyle'
import Reset from '../styles/Reset'
import theme from '../styles/theme'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        {process.env.NODE_ENV !== 'development' && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "a9429c8dbd674c38bf769344e4abc7d8"}'
          />
        )}
      </Head>
      <GlobalProvider>
        <Reset />
        <GlobalStyle />
        <Component {...pageProps} />
      </GlobalProvider>
      <Analytics />
    </ThemeProvider>
  )
}

export default MyApp
