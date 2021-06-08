import Flex from "../components/Flex"
import WaterTracker from "../components/WaterTracker"

const Tracker = () => (
  <Flex
    width="100vw"
    height="100vh"
    alignItems="center"
    justifyContent="center"
    data-theme="dark-mode-enabled"
  >
    <WaterTracker />
  </Flex>
)

export default Tracker
