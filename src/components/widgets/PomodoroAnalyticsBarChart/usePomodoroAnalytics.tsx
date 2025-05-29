import useUrlHash from '../../../hooks/useUrlHash/index'
import useAnalyticsBarChartDateRange from '../AnalyticsBarChart/useAnalyticsBarChartDateRange'
import { POMODORO_ANALYTICS_PATH } from '@/utils/endpoints'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { msToHours } from '@/utils/math'

type PomodoroAnalyticsResponse = {
  data: [string, [string, string, string, number][]][]
}

const formatData = (data: PomodoroAnalyticsResponse['data']) => {
  let result = []

  for (const item of data) {
    const date = item[0]
    const value = item[1].reduce((acc, cv) => {
      return (acc += cv[3])
    }, 0)

    const timeSpentPerPreset = item[1].reduce((acc, cv) => {
      const exists = acc[cv[2]]

      if (!exists) acc[cv[2]] = cv[3]
      else acc[cv[2]] += cv[3]

      return acc
    }, {})

    result.push({
      data: Object.entries(timeSpentPerPreset),
      id: date,
      date,
      value: msToHours(value).toFixed(2)
    })
  }

  return result
}

export const usePomodoroAnalytics = () => {
  const [from, to] = useAnalyticsBarChartDateRange()
  const { token, role } = useUrlHash<{ token: string; role: string }>()
  const path = `${POMODORO_ANALYTICS_PATH}?widgetToken=${token}&role=${role}&from=${from}&to=${to}`

  const response = useSWR<PomodoroAnalyticsResponse>(
    token ? path : null,
    fetcher
  )
  console.log(response?.data)
  const data = response?.data ? formatData(response?.data?.data) : []

  return { ...response, data }
}

export default usePomodoroAnalytics
