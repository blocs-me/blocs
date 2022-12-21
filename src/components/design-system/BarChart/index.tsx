import Box from '@/helpers/Box'
import { BarChartProps } from './types'
import GridLine from './GridLine'
import useBarChart from './useBarChart'
import YAxisLabels from './YAxisLabels'
import XAxisLabels from './XAxisLabels'
import Bars from './Bars'

const BarChart = (props: BarChartProps) => {
  const chart = useBarChart(props)
  const { timePeriod = 'weekly', data = [] } = props

  return (
    <Box
      className="className"
      width={'100%'}
      height={'100%'}
      position="relative"
    >
      {Array(chart.ticksY + 1)
        .fill('')
        .map((_, index) => (
          <Box
            key={index}
            data-id="grid"
            width="calc(100% - 35px)"
            height="1px"
            right="0px"
            position="absolute"
            top={0}
            style={{ '--pos': `translateY(${chart.stepY(index)[2]})` }}
            css={{
              transition: 'transform 0.3s ease',
              transform: 'var(--pos)'
            }}
          >
            <GridLine />
          </Box>
        ))}

      <YAxisLabels {...chart} formatYLabel={props.formatYLabel} />
      <Box
        height={timePeriod === 'weekly' ? '50px' : '20px'}
        width="100%"
        position="absolute"
        bottom={0}
      >
        {timePeriod === 'weekly' && <XAxisLabels data={chart.data} />}
      </Box>
      <Bars
        {...chart}
        renderTooltip={props.renderTooltip}
        width={props.width}
        timePeriod={props.timePeriod}
      />
    </Box>
  )
}

export default BarChart
