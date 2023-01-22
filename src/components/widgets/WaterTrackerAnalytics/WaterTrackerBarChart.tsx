import AnalyticsBarChart from '../AnalyticsBarChart'
import Flex from '../../helpers/Flex/index'
import useWaterTrackerAnalyticsRange from './useWaterTrackerAnalyticsRange'
import { useAnalyticsBarChartStore } from '../AnalyticsBarChart/useAnalyticsBarChart'
import { getCurrentISOString } from '../../../utils/dateUtils/getCurrentISOString'
import Box from '@/helpers/Box'
import { TooltipData } from '../../design-system/BarChart/types'
import Text from '@/design-system/Text'
import useWaterTrackerAuth from './useWaterTrackerAuth'

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
        <div>{value} Liters</div>
      </Flex>
    </Box>
  )
}

const renderTooltip = (props: TooltipData) => <Tooltip {...props} />

const WaterTrackerBarChart = () => {
  const { data: analytics } = useWaterTrackerAnalyticsRange()
  // const { auth } = useWaterTrackerAuth()

  const { page } = useAnalyticsBarChartStore()

  const getFallback = () => {
    const from = new Date()
    const to = new Date()

    from.setDate(from.getDate() - (from.getDay() ? from.getDay() + 1 : 6))
    from.setDate(from.getDate() + page * 7)

    to.setDate(from.getDate())
    to.setDate(to.getDate() + (page + 1) * 7 - 2)

    return [
      {
        id: 1,
        date: getCurrentISOString(from),
        value: 0
      },
      {
        id: 2,
        date: getCurrentISOString(to),
        value: 0
      }
    ]
  }

  return (
    <Flex
      width="100vw"
      height="100vh"
      bg="bg.notion"
      alignItems="center"
      justifyContent="center"
      p="md"
    >
      <AnalyticsBarChart
        menuPage="/bar-chart/water-tracker/menu"
        mainPage="/bar-chart/water-tracker"
        minY={5}
        data={analytics?.data?.length ? analytics.data : getFallback()}
        units="L"
        renderTooltip={renderTooltip}
        // disableControls={!auth?.isPremium}
        // showPremiumOverlay={auth && !auth?.isPremium}
      />
    </Flex>
  )
}

export default WaterTrackerBarChart
