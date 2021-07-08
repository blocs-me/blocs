import Flex from "@/helpers/Flex"
import HabitTracker from "@/widgets/HabitTracker"

const MainHabitTracker = () => (
  <Flex
    width="100vw"
    height="100vh"
    alignItems="center"
    justifyContent="center"
    data-theme="dark-mode-enabled"
  >
    <HabitTracker />
  </Flex>
)

export default MainHabitTracker
