import Box from '@/helpers/Box'
import { BarChartProps } from './types'
import GridLine from './GridLine'
import useBarChart from './useBarChart'
import YAxisLabels from './YAxisLabels'
import XAxisLabels from './XAxisLabels'
import Bars from './Bars'

/*

  - Bar chart plots dates evenly spaced along 'x axis'
  - 'y axis' should plot the number values
  - should be configurable to 'monthly' | 'weekly'
  - x axis should have both 'date and day of week' for the weekly format
  - smoothly resize in responsive mode

  const data = [
      { 
        id: 1, 
        date: '2022-10-01', 
        value: ''
      }
  ]

  const MyChart = () => {

    const data = useSWR(['chart-data', pageNumber], fetch)

    return (
      <Box>
          <ChartHeader />
          <BarChart 
            timePeriod="weekly | monthly"
            formatYLabel={(label) => `${label} hrs`}
            data={data}
            p={10}
          renderTooltip={(data) => {
              <Tooltip ...data />
            }}
          />
          <ChartFooter />
      </Box>
    )
  }

  
*/

const BarChart = (props: BarChartProps) => {
  const chart = useBarChart(props)
  const { timePeriod = 'weekly', data = [] } = props

  return (
    <div>
      <Box
        className="className"
        width={props.width}
        height={props.height}
        position="relative"
      >
        {Array(chart.ticksY + 1)
          .fill('')
          .map((_, index) => (
            <Box
              key={index}
              width="calc(100% - 35px)"
              height="1px"
              right="0px"
              position="absolute"
              top={chart.stepY(index)[1]}
            >
              <GridLine />
            </Box>
          ))}

        <Bars data={chart.data} timePeriod={timePeriod} />
        <YAxisLabels {...chart} formatYLabel={props.formatYLabel} />
      </Box>
      <Box height={timePeriod === 'weekly' ? '50px' : '20px'}>
        {timePeriod === 'weekly' && <XAxisLabels data={chart.data} />}
      </Box>
    </div>
  )
}

export default BarChart
