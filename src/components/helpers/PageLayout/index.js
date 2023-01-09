import Head from 'next/head'
import Footer from '@/design-system/Footer'
import Box from '../Box'
import PageGutters from '../PageGutters'

const PageLayout = ({ children }) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="alternate icon" href="/favicon.ico" type="image/x-icon" />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <Box
      width="100%"
      minHeight="calc(100vh - 80px)"
      position="relative"
      overflowX="hidden"
    >
      <PageGutters>{children}</PageGutters>
      <Footer />
    </Box>
  </>
)

export default PageLayout
