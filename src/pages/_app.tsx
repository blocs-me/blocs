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
        {process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
          <>
          <script defer data-domain="blocs.me" src="https://plausible.io/js/script.tagged-events.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3797364,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `,
            }} />
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
