import Box from '@/helpers/Box'
import Text from '../Text'
import { BarChartProps } from './types'
import { UseBarChartReturn } from './useBarChart/useBarChart'

const YLabel = ({
  stepY,
  index,
  ticksY,
  formatYLabel
}: Props & { index: number }) => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      style={{ '--pos': stepY(ticksY - index)[2] }}
      css={{
        transition: 'transform 0.3s ease',
        transform: 'translateY(var(--pos))'
      }}
    >
      <Text
        as="div"
        fontSize="xxs"
        fontWeight={200}
        color="primary.accent-4"
        m={0}
        p={0}
        lineHeight={0}
        css={{ transform: 'translateY(-50% - 1px))', verticalAlign: 'middle' }}
      >
        {formatYLabel(stepY(index)[0])}
      </Text>
    </Box>
  )
}

type Props = UseBarChartReturn & Pick<BarChartProps, 'formatYLabel'>

const YAxisLabels = ({ ticksY, height, ...props }: Props) => {
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
