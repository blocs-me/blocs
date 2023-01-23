import Flex from '@/helpers/Flex'
import Controls from './Controls'
import Text from '@/design-system/Text'
import getMonthStr from '@/utils/dateUtils/getMonthStr'
import WidgetMenuButton from '@/design-system/WidgetMenuButton'
import Box from '@/helpers/Box'
import BarChart from '@/design-system/BarChart'
import { useRef } from 'react'
import { useResizeObserver } from 'beautiful-react-hooks'

const data = Array(7)
  .fill('-')
  .map((_, id) => ({
    id,
    value: Math.max(1, Math.floor(Math.random() * 10)),
    date: new Date(2023, 1, 1 + id).toISOString()
  }))

const DummyAnalyticsBarChart = ({ units, ...rest }) => {
  const container = useRef()
  const { width, height } = useResizeObserver(container) || {}

  return (
    <Flex
      height="400px"
      borderRadius="md"
      boxShadow="default"
      flexDirection="column"
      p={'sm'}
      {...rest}
    >
      <Flex
        justifyContent="space-between"
        width="100%"
        alignItems="center"
        mb="sm"
      >
        <Controls />
        <Text color="foreground" lineHeight={0} m={0} fontSize={['xs', , 'sm']}>
          {getMonthStr(new Date())} {new Date().getFullYear()}
        </Text>
        <Box css={{ pointerEvents: 'none' }}>
          <WidgetMenuButton />
        </Box>
      </Flex>

      <Box
        borderRadius="lg"
        bg="primary.accent-2"
        width="100%"
        height="100%"
        p="md"
        pb="sm"
        ref={container}
      >
        <BarChart
          data={data}
          width={width}
          height={height}
          minY={5}
          timePeriod={'weekly'}
          formatYLabel={(label) => `${label} ${units}`}
        />
      </Box>
    </Flex>
  )
}

export default DummyAnalyticsBarChart
