import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Text from '../Text'
import { UseBarChartReturn } from './useBarChart/useBarChart'
import getDayOfTheWeek from '../../../utils/dateUtils/getDayOfTheWeek'
import prefixZero from '@/utils/dateUtils/prefixZero'

type Props = Pick<UseBarChartReturn, 'data'>

const XAxisLabels = ({ data }: Props) => {
  return (
    <Box height="50px">
      <Flex
        width="calc(100% - 35px)"
        ml="35px"
        justifyContent="space-between"
        alignItems="end"
        pt="xs"
      >
        {data.map(({ date, id, isDifferentMonth }) => (
          <Flex key={id} width="10px" justifyContent="center">
            <Text
              fontSize="xxs"
              color={isDifferentMonth ? 'danger.medium' : 'foreground'}
              m={0}
            >
              {getDayOfTheWeek(date)}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Flex
        width="calc(100% - 35px)"
        ml="35px"
        justifyContent="space-between"
        alignItems="end"
      >
        {data.map(({ date, id, isDifferentMonth }) => (
          <Flex key={id} width="10px" justifyContent="center">
            <Text
              fontSize="xxs"
              color={isDifferentMonth ? 'danger.light' : 'primary.accent-4'}
              width="10px"
              m="0"
              fontWeight={200}
            >
              {prefixZero(date)}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

export default XAxisLabels
