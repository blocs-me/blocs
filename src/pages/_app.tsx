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

        {process.env.NEXT_VERCEL_ENV === 'production' && (
          <script
            type="text/javascript"
            defer
            dangerouslySetInnerHTML={{
              __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "foxjkrf7xa");
            `
            }}
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
