import Flex from "@/helpers/Flex"
import Analytics from "@/widgets/Analytics"

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
