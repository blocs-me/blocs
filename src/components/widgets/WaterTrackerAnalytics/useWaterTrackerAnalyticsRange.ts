import { WATER_TRACKER_ANALYTICS_PATH } from '@/utils/endpoints'
import useSWR from 'swr'
import { getCurrentISOString } from '../../../utils/dateUtils/getCurrentISOString'
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import fetcher from '@/utils/fetcher'
import { useAnalyticsBarChartStore } from '../AnalyticsBarChart/useAnalyticsBarChart'
import useAnalyticsBarChartDateRange from '../AnalyticsBarChart/useAnalyticsBarChartDateRange'

type AnalayticsData = {
  data: {
    id: string
    date: string
    value: string
  }[]
}

const useWaterTrackerAnalyticsRange = () => {
  const { token, role } = useUrlHash<{ token: string; role: string }>()
  const [from, to] = useAnalyticsBarChartDateRange()

  const path = `${WATER_TRACKER_ANALYTICS_PATH}?from=${from}&to=${to}&widgetToken=${token}&role=${role}`

  const response = useSWR(token ? path : null, fetcher)
  const data = response?.data?.data?.map((d, id) => {
    return {
      ...d,
      id
    }
  })

  return { ...response, data: { data } }
}

export default useWaterTrackerAnalyticsRange
