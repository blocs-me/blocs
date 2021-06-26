import Box from "../Box"
import Footer from "../Footer"
import Nav from "../Nav"
import Head from "next/head"

export const PageGutters = (props) => (
  <Box
    {...props}
    width="min(100%, 1600px)"
    mx="auto"
    px={["sm", "sm", "5%", "8%", "10%"]}
    overflowX="hidden"
  >
    {props.children}
  </Box>
)

const PageLayout = ({ children, navTitle, links }) => (
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
      width="100vw"
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
