import Box from '@/helpers/Box'
import Text from '../Text'
import { BarChartProps } from './types'
import { UseBarChartReturn } from './useBarChart/useBarChart'

const YLabel = ({
  stepY,
  ticksY,
  index,
  formatYLabel
}: Props & { index: number }) => {
  return (
    <Box
      position="absolute"
      top={stepY(ticksY - index)[1]}
      transform="translateY(calc(-50% - 1px))"
    >
      <Text
        as="div"
        fontSize="xxs"
        fontWeight={200}
        color="primary.accent-4"
        top={stepY(index)[1]}
        m={0}
        p={0}
        lineHeight={0}
        css={{ verticalAlign: 'middle' }}
      >
        {formatYLabel(stepY(index)[0])}
      </Text>
    </Box>
  )
}

type Props = UseBarChartReturn & Pick<BarChartProps, 'formatYLabel'>

const YAxisLabels = ({ ticksY, ...props }: Props) => {
  return (
    <>
      {Array(ticksY + 1)
        .fill('')
        .map((_, index) => (
          <YLabel key={index} ticksY={ticksY} index={index} {...props} />
        ))}
    </>
  )
}

export default YAxisLabels
