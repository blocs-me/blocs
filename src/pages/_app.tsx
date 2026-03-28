import { ThemeProvider } from '@emotion/react'
import GlobalProvider from '../contexts/GlobalContextProvider/GlobalContextProvider'
import GlobalStyle from '../styles/GlobalStyle'
import Reset from '../styles/Reset'
import theme from '../styles/theme'
import Script from 'next/script'
import SupabaseAuthProvider from '@/helpers/SupabaseAuthProvider'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => window.scrollTo(0, 0)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
