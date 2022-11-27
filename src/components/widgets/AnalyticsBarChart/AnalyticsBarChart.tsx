import BarChart from '@/design-system/BarChart'
import Flex from '@/helpers/Flex'
import { useAnalyticsBarChartStore } from './useAnalyticsBarChart'
import { BarChartProps } from '../../design-system/BarChart/types'
import Controls from './Controls'
import getDayOfTheWeek from '@/utils/dateUtils/getDayOfTheWeek'
import { useEffect } from 'react'
import useAnalyticsBarChart from './useAnalyticsBarChart/useAnalyticsBarChart'
import { useLayoutEffect } from 'react'
import Box from '@/helpers/Box'
import { time } from 'console'
import largestFreq from '@/utils/math/largestFreq'
import getYearMonthDate from '@/utils/dateUtils/getYearMonthDate'
import Text from '@/design-system/Text'
import getMonthStr from '../../../utils/dateUtils/getMonthStr'
import WidgetMenuButton from '@/design-system/WidgetMenuButton'

type Props = {
  units: string
} & Required<Pick<BarChartProps, 'data' | 'renderTooltip'>>

const getDateRange = (
  timePeriod: BarChartProps['timePeriod'],
  page: number
) => {
  const d = new Date()
  d.setDate(d.getDate() - (d.getDay() - 2))

  const month = d.getMonth()
  const year = d.getFullYear()
  const day = d.getDate()
  const dateForward = timePeriod === 'weekly' ? 7 : 30

  if (timePeriod === 'weekly') {
    const startDate = new Date(
      year,
      month,
      day + dateForward * page
    ).toISOString()

    const endDate = new Date(
      year,
      month,
      day + dateForward * (page + 1)
    ).toISOString()

    return [startDate, endDate]
  }

  const startDate = new Date(year, month + page, 1).toISOString()

  const lastDay = new Date(startDate)
  lastDay.setDate(-1)

  const endDate = new Date(
    year,
    month + (page + 1),
    lastDay.getDate()
  ).toISOString()
  return [startDate, endDate]
}

// TODO: create menu
// TOOD: (later) add fetching stuff
const AnalyticsBarChart = ({ data, units, renderTooltip }: Props) => {
  const [{ timePeriod, page }, dispatch] = useAnalyticsBarChart()
  const [startDate, endDate] = getDateRange(timePeriod, page)

  const currentMonth = (() => {
    // TODO: (later) refactor to derive this from the data
    let dateDiff = Math.abs(
      new Date(startDate).getDate() - new Date(endDate).getDate()
    )
    let months = []
    const [year, month, day] = getYearMonthDate(startDate)

    for (let i = 0; i < dateDiff; i++) {
      const curDate = new Date(year, month, day + i)
      months.push(curDate.getMonth())
    }

    const mostCommonMonth = largestFreq(months)
    return new Date(year, mostCommonMonth, day)
  })()

  const setNextDateRange = () =>
    dispatch({
      type: 'SET_PAGE',
      payload: page + 1
    })

  const setPrevDateRange = () =>
    dispatch({ type: 'SET_PAGE', payload: page - 1 })

  return (
    <Flex
      p="md"
      borderRadius="lg"
      bg="background"
      flexDirection="column"
      boxShadow="default"
    >
      <Flex justifyContent="space-between" alignItems="center" mb="sm">
        <Controls
          onClickLeft={setPrevDateRange}
          onClickRight={setNextDateRange}
        />
        <Text color="foreground" lineHeight={0} m={0}>
          {getMonthStr(currentMonth)} {currentMonth.getFullYear()}
        </Text>
        <WidgetMenuButton href="/" />
      </Flex>
      <Box borderRadius="lg" p="md" pb="sm" bg="primary.accent-2">
        <BarChart
          data={data}
          width={400}
          height={180}
          timePeriod={timePeriod}
          formatYLabel={(label) => `${label} ${units}`}
          renderTooltip={renderTooltip}
        />
      </Box>
    </Flex>
  )
}

export default AnalyticsBarChart
