import Head from 'next/head'
import { ThemeProvider } from '@emotion/react'
import GlobalProvider from '../contexts/GlobalContextProvider/GlobalContextProvider'
import GlobalStyle from '../styles/GlobalStyle'
import Reset from '../styles/Reset'
import theme from '../styles/theme'
import { useRouter } from 'next/router'
import Nav from '@/design-system/Nav'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import SupabaseAuthProvider from '@/helpers/SupabaseAuthProvider'

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter()
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  const getNavTitle = () => {
    if (pathname?.includes('dashboard')) return 'DASHBOARD'
    if (pathname?.includes('pricing')) return 'PRICING'
    return ''
  }

  const showNav = (() => {
    if (pathname?.includes('dashboard')) return true
    if (pathname?.includes('pricing')) return true
    if (pathname === '/') return true
    return false
  })()

  return (
    <SupabaseAuthProvider>
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
      </ThemeProvider>
    </SupabaseAuthProvider>
  )
}

export default MyApp
