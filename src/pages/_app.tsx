import { ThemeProvider } from '@emotion/react'
import GlobalProvider from '../contexts/GlobalContextProvider/GlobalContextProvider'
import GlobalStyle from '../styles/GlobalStyle'
import Reset from '../styles/Reset'
import theme from '../styles/theme'
import Script from 'next/script'
import SupabaseAuthProvider from '@/helpers/SupabaseAuthProvider'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Script
        defer
        data-domain="blocs.me"
        src="https://analytics.aryanbhasin.com/js/script.tagged-events.js"
      />
      <SupabaseAuthProvider>
        <GlobalProvider>
          <BlocsThemeProvider>
            <Reset />
            <GlobalStyle />
            <Component {...pageProps} />
          </BlocsThemeProvider>
        </GlobalProvider>
      </SupabaseAuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
