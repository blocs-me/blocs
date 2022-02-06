import Grid from "@/helpers/Grid"
import StreaksCalendarAnalyticsChip from "./StreaksCalendarAnalyticsChip"
import StreaksCalendarDonutChart from "./StreaksCalendarDonutChart"

const AnalyticsGridRow = () => {
  return (
    <Grid
      gridTemplateColumns={"repeat(4, 1fr)"}
      gridAutoRows={["minmax(25px, 45px)", , "minmax(25px, 32px)"]}
      gridGap="xs"
      height="100%"
    >
      <Grid gridRow="span 2">
        <StreaksCalendarDonutChart
          progress={25}
          title="Completed"
          summary="245 days"
        />
      </Grid>
      <Grid gridRow="span 2">
        <StreaksCalendarDonutChart
          progress={50}
          strokeColor="secondary"
          title="Streak"
          summary="245 days"
        />
      </Grid>
      <Grid gridColumn={["3 / 5", , "3 / 4"]} gridRow={["1 / 2", , "span 2"]}>
        <StreaksCalendarAnalyticsChip.Container>
          <StreaksCalendarAnalyticsChip.TitleAndSummary
            textAlign="center"
            title="Best Streak"
            summary="50 days"
          />
        </StreaksCalendarAnalyticsChip.Container>
      </Grid>
      <Grid gridColumn={["3 / 5", , "4 / 5"]} gridRow={["2 / 3", , "span 2"]}>
        <StreaksCalendarAnalyticsChip.Container>
          <StreaksCalendarAnalyticsChip.TitleAndSummary
            textAlign="center"
            alignItems={"center"}
            title="Goal"
            summary="200 days"
          />
        </StreaksCalendarAnalyticsChip.Container>
      </Grid>
    </Grid>
  )
}

export default AnalyticsGridRow
