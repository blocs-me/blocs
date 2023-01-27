import Flex from '@/helpers/Flex'
import Controls from './Controls'
import Text from '@/design-system/Text'
import getMonthStr from '@/utils/dateUtils/getMonthStr'
import WidgetMenuButton from '@/design-system/WidgetMenuButton'
import Box from '@/helpers/Box'
import BarChart from '@/design-system/BarChart'
import { useMemo, useRef, ComponentType } from 'react'
import { useResizeObserver } from 'beautiful-react-hooks'
import useAnalyticsBarChartDefaultValue from './useAnalyticsBarChartDefaultValue'
import useDidMount from '@/hooks/useDidMount'
import { AnalyticsBarChartProvider } from './useAnalyticsBarChart'
import { IBox } from '@/helpers/Box/Box.types'

type Props = {
  units: string
} & IBox

const DummyAnalyticsBarChart = ({ units, ...rest }: Props) => {
  const fallback = useAnalyticsBarChartDefaultValue()
  const container = useRef()
  const { width, height } = useResizeObserver(container) || {}
  const mounted = useDidMount()

  const defaultData = useMemo(() => {
    let result = []
    let date = new Date(fallback[0].date)

    for (let i = 0; i < 7; i++) {
      result.push({
        id: i,
        date: date,
        value: Math.round(Math.random() * 4 + 1)
      })

      date = new Date(date.getTime() + 1000 * 60 * 60 * 24)
    }

    return result
  }, [mounted])

  return (
    <Flex
      height="400px"
      borderRadius="md"
      boxShadow="default"
      flexDirection="column"
      bg="background"
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
          data={defaultData}
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

const withProvider = (Component: ComponentType<Props>) => {
  return (props: Props) => {
    return (
      <AnalyticsBarChartProvider>
        <Component {...props} />
      </AnalyticsBarChartProvider>
    )
  }
}

export default withProvider(DummyAnalyticsBarChart)
