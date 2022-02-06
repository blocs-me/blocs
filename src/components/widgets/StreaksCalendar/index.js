import Text from "@/design-system/Text"
import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"
import Grid from "@/helpers/Grid"
import Stack from "@/helpers/Stack"
import WidgetLayout from "@/helpers/WidgetLayout"
import { useRouter } from "next/router"
import AnalyticsGridRow from "./AnalyticsGridRow"
import CalendarControls from "./CalendarControls"
import CalendarGrid from "./CalendarGrid"
import StreaksCalendarAnalyticsChip from "./StreaksCalendarAnalyticsChip"
import StreaksCalendarDonutChart from "./StreaksCalendarDonutChart"
import StreaksCalendarHeader from "./StreaksCalendarHeader"
import StreaksCalendarMainPage from "./StreaksCalendarMainPage"

const StreaksCalendar = (props) => {
  const router = useRouter()
  const {
    query: { slug },
  } = router

  const isMainPage = !slug
  const getRoute = (routeName) => !slug && slug[0].includes(routeName)

  const handleClick = () => {}

  const onMenuClick = () => {
    if (isMainPage) router.push("/streaks-calendar/main-menu")
    else router.back()
  }

  return (
    <Box
      p="md"
      width="auto"
      maxWidth="600px"
      minHeight="350px"
      height="fit-content"
    >
      <WidgetLayout
        menuAria={() => "Streak calendar menu"}
        onMenuClick={onMenuClick}
      >
        <Box px="sm" pb="sm">
          {isMainPage && <StreaksCalendarMainPage {...props} />}
        </Box>
      </WidgetLayout>
    </Box>
  )
}

export default StreaksCalendar
