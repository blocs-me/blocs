import Box from "../Box"
import Footer from "../Footer"
import Nav from "../Nav"

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
