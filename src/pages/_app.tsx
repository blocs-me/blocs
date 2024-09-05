import Head from 'next/head'
import { ThemeProvider } from '@emotion/react'
import GlobalProvider from '../contexts/GlobalContextProvider/GlobalContextProvider'
import GlobalStyle from '../styles/GlobalStyle'
import Reset from '../styles/Reset'
import theme from '../styles/theme'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import { OpenPanelComponent } from '@openpanel/nextjs'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <OpenPanelComponent
        clientId="bb19c157-0c77-47ad-a427-3e90eea51aef"
        trackScreenViews={true}
        disabled={process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'}
      // disabled={true}
      />
      <Head>
        {process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
          <>
            <script defer data-domain="blocs.me" src="https://plausible.io/js/script.tagged-events.js" />
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
