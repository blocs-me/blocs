import DonutChart from "@/design-system/DonutChart"
import Text from "@/design-system/Text"
import Box from "@/helpers/Box"
import StreaksCalendarAnalyticsChip from "./StreaksCalendarAnalyticsChip"

const StreaksCalendarDonutChart = ({
  progress,
  strokeColor,
  title,
  summary,
}) => {
  return (
    <StreaksCalendarAnalyticsChip.Container
      p="xs"
      flexDirection={["column", , "row"]}
    >
      <DonutChart
        stroke={15}
        foreground={strokeColor}
        progress={progress}
        size="45px"
        strokeWidth={14}
      />
      <StreaksCalendarAnalyticsChip.TitleAndSummary
        title={title}
        summary={summary}
        pl={[0, , "xs"]}
        pt={["xxs", , 0]}
      />
    </StreaksCalendarAnalyticsChip.Container>
  )
}

export default StreaksCalendarDonutChart
