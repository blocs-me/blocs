import themeGet from '@styled-system/theme-get'
import styled from '@emotion/styled'
import { BarChartProps } from './types'
import { UseBarChartReturn } from './useBarChart/useBarChart'
import Flex from '@/helpers/Flex'

const Bar = styled.div<any>`
  width: var(--width, 5px);
  border-radius: 10px 10px 0 0;
  background: ${themeGet('colors.foreground')};
  height: ${({ height }) => height};
`

type Props = Pick<UseBarChartReturn, 'data'> & Pick<BarChartProps, 'timePeriod'>

const Bars = ({ data, timePeriod }: Props) => (
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
)

export default Bars
