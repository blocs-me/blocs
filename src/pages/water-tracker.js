import Flex from "@/helpers/Flex"
import WaterTracker from "@/widgets/WaterTracker"

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
