const { default: Box } = require("@/helpers/Box")
const { default: Flex } = require("@/helpers/Flex")
const { default: Stack } = require("@/helpers/Stack")
import StreaksCalendarHeader from "./StreaksCalendarHeader"
const { default: AnalyticsGridRow } = require("./AnalyticsGridRow")
const { default: CalendarControls } = require("./CalendarControls")
const { default: CalendarGrid } = require("./CalendarGrid")

const StreaksCalendarMainPage = ({
  currentDate,
  nextMonth,
  prevMonth,
  setToday,
  dateCellDays,
}) => {
  return (
    <Flex display="flex" flexDirection="column">
      <Box my="sm">
        <StreaksCalendarHeader />
      </Box>
      <Stack flexDirection="column" mt="xs">
        <CalendarControls
          currentDate={currentDate}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
          setToday={setToday}
        />
        <CalendarGrid dates={dateCellDays} currentDate={currentDate} />
        <AnalyticsGridRow />
      </Stack>
    </Flex>
  )
}

export default StreaksCalendarMainPage
