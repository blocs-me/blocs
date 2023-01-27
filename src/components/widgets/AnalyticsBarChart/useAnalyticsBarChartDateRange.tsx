import { getCurrentISOString } from '@/utils/dateUtils/getCurrentISOString'
import { useAnalyticsBarChartStore } from './useAnalyticsBarChart/useAnalyticsBarChart'
import getYearMonthDate from '@/utils/dateUtils/getYearMonthDate'

export const getMonday = (date: Date) => {
  const dateCopy = new Date(date)
  const currentDay = date.getDay()
  const dateOfMonth = date.getDate()
  let result = dateCopy.getDate()

  if (currentDay === 0) {
    result = dateOfMonth - 6
  }

  if (currentDay > 1) {
    result = dateOfMonth - (currentDay - 1)
  }

  if (result < 0) {
    result = result + 1
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
      from.setDate(getMonday(from))

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
