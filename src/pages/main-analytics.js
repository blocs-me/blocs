import Analytics from "../components/widgets/Analytics"
import Flex from "../components/helpers/Flex"

const MainAnalytics = () => (
  <Flex
    width="100vw"
    height="100vh"
    alignItems="center"
    justifyContent="center"
    data-theme="dark-mode-enabled"
  >
    <Analytics />
  </Flex>
)
 
export default MainAnalytics
