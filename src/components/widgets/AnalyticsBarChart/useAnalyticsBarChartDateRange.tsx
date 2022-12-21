import { getCurrentISOString } from '@/utils/dateUtils/getCurrentISOString'
import { useAnalyticsBarChartStore } from './useAnalyticsBarChart/useAnalyticsBarChart'
import getYearMonthDate from '@/utils/dateUtils/getYearMonthDate'

const useAnalyticsBarChartDateRange = () => {
  const { page, timePeriod } = useAnalyticsBarChartStore()

  const range = (() => {
    let from = new Date()
    let to = new Date()

    if (timePeriod === 'weekly') {
      from.setDate(from.getDate() - from.getDay() + 1)
      from.setDate(from.getDate() + page * 7)

      to.setDate(to.getDate() - (to.getDay() + 1))
      to.setDate(to.getDate() + (page + 1) * 7)
    }

    if (timePeriod === 'monthly') {
      const [year, month] = getYearMonthDate(from)

      from = new Date(year, month, 1)
      to = new Date(year, month + 1, 0)
    }

    return [getCurrentISOString(from), getCurrentISOString(to)]
  })()

  return range
}

export default useAnalyticsBarChartDateRange
