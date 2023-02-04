import AnalyticsBarChart from '../AnalyticsBarChart'
import Flex from '../../helpers/Flex/index'
import useWaterTrackerAnalyticsRange from './useWaterTrackerAnalyticsRange'
import Box from '@/helpers/Box'
import { TooltipData } from '../../design-system/BarChart/types'
import Text from '@/design-system/Text'
import useWaterTrackerAuth from './useWaterTrackerAuth'
import useAnalyticsBarChartDefaultValue from '../AnalyticsBarChart/useAnalyticsBarChartDefaultValue'

const formatTooltipDate = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
}).format

const Tooltip = ({ value, timePeriod, date }: TooltipData) => {
  return (
    <Box color="foreground" css={{ fontWeight: 200 }}>
      <Flex flexDirection="column">
        {timePeriod === 'monthly' && (
          <Text as="div" fontSize="xs" mb="xxs" fontWeight="bold">
            {formatTooltipDate(new Date(date))}
          </Text>
        )}
        <div>
          {value} {value === 1 ? 'Liter' : 'Liters'}
        </div>
      </Flex>
    </Box>
  )
}

const renderTooltip = (props: TooltipData) => <Tooltip {...props} />

const WaterTrackerBarChart = () => {
  const { data: analytics } = useWaterTrackerAnalyticsRange()
  const { auth } = useWaterTrackerAuth()
  const fallback = useAnalyticsBarChartDefaultValue()

  return (
    <Flex
      width="100vw"
      height="100vh"
      bg="bg.notion"
      alignItems="center"
      justifyContent="center"
      p="sm"
    >
      <AnalyticsBarChart
        menuPage="/bar-chart/water-tracker/menu"
        mainPage="/bar-chart/water-tracker"
        minY={5}
        data={analytics?.data?.length ? analytics.data : fallback}
        units="L"
        renderTooltip={renderTooltip}
        disableControls={!auth?.isPremium}
        showPremiumOverlay={auth && !auth?.isPremium}
      />
    </Flex>
  )
}

export default WaterTrackerBarChart
