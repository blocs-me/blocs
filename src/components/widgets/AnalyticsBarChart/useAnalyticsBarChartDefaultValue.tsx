import { getCurrentISOString } from '@/utils/dateUtils/getCurrentISOString'
import useAnalyticsBarChartDateRange from './useAnalyticsBarChartDateRange'

const useAnalyticsBarChartDefaultValue = () => {
  const [from, to] = useAnalyticsBarChartDateRange()

  return [
    {
      id: 1,
      date: getCurrentISOString(new Date(from)),
      value: 0
    },
    {
      id: 2,
      date: getCurrentISOString(new Date(to)),
      value: 0
    }
  ]
}

export default useAnalyticsBarChartDefaultValue
