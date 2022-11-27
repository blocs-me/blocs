import themeGet from '@styled-system/theme-get'
import styled from '@emotion/styled'
import { BarChartProps } from './types'
import { UseBarChartReturn } from './useBarChart/useBarChart'
import Flex from '@/helpers/Flex'
import TooltipContainer from './TooltipContainer'

const Bar = styled.div<any>`
  width: var(--width, 5px);
  border-radius: 10px 10px 0 0;
  background: ${themeGet('colors.foreground')};
  height: ${({ height }) => height};
  transition: height 0.3s ease;
  pointer-events: none;
`

type Props = Pick<UseBarChartReturn, 'data' | 'stepY' | 'stepX'> &
  Pick<BarChartProps, 'timePeriod' | 'width' | 'renderTooltip'>

const Bars = ({ data, timePeriod, width, stepX, renderTooltip }: Props) => {
  return (
    <TooltipContainer
      data={data}
      width={width}
      timePeriod={timePeriod}
      stepX={stepX}
      renderTooltip={renderTooltip}
    >
      <Flex
        position="relative"
        width="calc(100% - 35px)"
        height="100%"
        ml="35px"
        justifyContent="space-between"
        alignItems="end"
      >
        {data.map(({ height, id }) => (
          <Bar
            key={id}
            style={{ '--width': timePeriod === 'weekly' ? '10px' : '5px' }}
            height={height}
          />
        ))}
      </Flex>
    </TooltipContainer>
  )
}

export default Bars
