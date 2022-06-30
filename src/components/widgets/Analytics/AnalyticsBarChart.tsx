import BarChart, { BarChartProps } from '@/design-system/BarChart'
import Box from '@/helpers/Box'
import useMediaQuery from '@/hooks/useMediaQuery'

const AnalyticsBarChart = (props: BarChartProps) => {
  const isSmallScreen = useMediaQuery('(max-width: 450px)')
  return (
    <div>
      <Box bg="bg.mute" px="sm" py="xs" borderRadius="lg">
        <BarChart {...props} paddingX={3} height={isSmallScreen ? 125 : 90} />
      </Box>
    </div>
  )
}

export default AnalyticsBarChart
