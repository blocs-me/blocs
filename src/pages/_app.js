import Head from 'next/head'
import { ThemeProvider } from '@emotion/react'
import GlobalProvider from '../contexts/GlobalContextProvider/GlobalContextProvider'
import GlobalStyle from '../styles/GlobalStyle'
import Reset from '../styles/Reset'
import theme from '../styles/theme'
import { useRouter } from 'next/router'
import Nav from '@/design-system/Nav'

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter()

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
    <ThemeProvider theme={theme}>
      <Head>
        <script async src="https://cdn.splitbee.io/sb.js"></script>
      </Head>
      <GlobalProvider>
        <Reset />
        <GlobalStyle />
        {showNav && <Nav title={getNavTitle()} />}
        <Component {...pageProps} />
      </GlobalProvider>
    </ThemeProvider>
  )
}

export default MyApp
