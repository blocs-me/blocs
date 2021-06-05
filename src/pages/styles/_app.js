import { ThemeProvider } from '@emotion/react'
import GlobalStyle from '../styles/GlobalStyle'
import Head from 'next/head'
import Reset from '../styles/Reset'
import theme from '../styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
