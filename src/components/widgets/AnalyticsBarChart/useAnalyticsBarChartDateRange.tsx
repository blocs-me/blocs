import { getCurrentISOString } from '@/utils/dateUtils/getCurrentISOString'
import { useAnalyticsBarChartStore } from './useAnalyticsBarChart/useAnalyticsBarChart'
import getYearMonthDate from '@/utils/dateUtils/getYearMonthDate'

export const getMonday = (date: Date) => {
  const dateCopy = new Date(date)
  const time = date.getTime()
  const currentDay = date.getDay()
  const dayInMs = 1000 * 60 * 60 * 24
  let result = dateCopy.getTime()

  if (currentDay === 0) {
    const days = 6 * dayInMs
    result = time - days
  }

  if (currentDay > 1) {
    const days = (currentDay - 1) * dayInMs
    result = time - days
  }

  return result
}

const weekDaysInMs = 1000 * 60 * 60 * 24 * 7

const useAnalyticsBarChartDateRange = () => {
  const { page, timePeriod } = useAnalyticsBarChartStore()

  const range = (() => {
    let from = new Date()
    let to = new Date()

    if (timePeriod === 'weekly') {
      from.setTime(getMonday(from))

      const pageMSOffset = page * weekDaysInMs

      from.setTime(from.getTime() + pageMSOffset)
      to.setTime(from.getTime() + weekDaysInMs)
    }

    if (timePeriod === 'monthly') {
      const [year, month] = getYearMonthDate(from)

      from = new Date(year, month + page, 1)
      to = new Date(year, month + page + 1, 0)
    }

    return [getCurrentISOString(from), getCurrentISOString(to)]
  })()

  return range
}

export default useAnalyticsBarChartDateRange
