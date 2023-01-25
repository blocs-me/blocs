import { BarChartProps, TooltipData } from '../types'
import getYearMonthDate from '@/utils/dateUtils/getYearMonthDate'
import { getMonday } from '../../../widgets/AnalyticsBarChart/useAnalyticsBarChartDateRange'

const sortData = (data: BarChartProps['data']) =>
  data?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

export type UseBarChartReturn<T = {}> = {
  ticksY: number
  data: {
    height: string
    date: string
    id: string | number
    isDifferentMonth?: boolean
    value: number
    timePeriod: BarChartProps['timePeriod']
  }[]
  stepY: (tickIndex: number) => (string | number)[]
  stepX: (tickIndex: number) => number
} & T

type BarChartData = BarChartProps['data']

const formatData = (
  data: BarChartData,
  timePeriod: BarChartProps['timePeriod']
): UseBarChartReturn['data'] => {
  if (!data.length) return []

  const sortedData = sortData(data)

  const dataByDateStr = sortedData.reduce((pv, cv) => {
    const dateStr = new Date(cv.date).toDateString()
    return {
      ...pv,
      [dateStr]: cv
    }
  }, {}) as UseBarChartReturn['data']

  let result = []

  const firstDate = new Date(sortedData[0].date)

  const numberOfDaysInMonth = (() => {
    const [year, month] = getYearMonthDate(firstDate)
    return new Date(year, month + 1, 0).getDate()
  })()

  const count = timePeriod === 'weekly' ? 7 : numberOfDaysInMonth
  const startDate = new Date(firstDate)

  if (timePeriod === 'weekly') {
    startDate.setDate(getMonday(startDate))
  } else {
    startDate.setDate(1)
  }

  const month = startDate.getMonth()
  const year = startDate.getFullYear()
  const day = startDate.getDate()

  for (let i = 0; i < count; i++) {
    const currentDate = new Date(year, month, day + i)
    const isDifferentMonth = currentDate.getMonth() !== month
    const data = dataByDateStr[
      currentDate.toDateString()
    ] as UseBarChartReturn['data']

    if (!data) {
      result.push({
        isDifferentMonth,
        id: Math.random().toString(),
        value: 0,
        date: currentDate.toISOString()
      })
    } else {
      result.push({
        isDifferentMonth,
        ...data
      })
    }
  }

  if (!result.length) {
    result = sortedData
  }

  return result
}

const useBarChart = ({
  data,
  height,
  timePeriod,
  width,
  minY
}: BarChartProps): UseBarChartReturn => {
  const sortedData = formatData(data, timePeriod)

  const values = sortedData.map(({ value }) => value)
  const max = Math.max(...values) || minY
  const countY = new Set(values).size

  const ticksY = (() => {
    if (countY > 12) return 12
    if (countY <= 5) return 5
    return countY
  })()

  const stepValue = Math.ceil(max / ticksY)
  const maxTick = stepValue * ticksY

  const stepY = (tickIndex: number) => {
    const currentStep = tickIndex * stepValue
    return [
      currentStep,
      `${(currentStep / maxTick) * 100}%`,
      `${
        (height - (timePeriod === 'weekly' ? 50 : 20)) * (currentStep / maxTick)
      }px`
    ]
  }

  const stepX = (index: number) => {
    const division = timePeriod === 'weekly' ? 6 : 30
    const barWidth = timePeriod === 'weekly' ? 5 : 10
    const step = (width - 35 - barWidth - barWidth / division) / division
    return Math.floor(step * index)
  }

  const newData = sortedData.map(({ value = 0, ...barData }) => ({
    ...barData,
    timePeriod,
    value,
    height: `${(value / maxTick) * 100}%`
  }))

  return {
    data: newData,
    stepY,
    stepX,
    ticksY
  }
}

export default useBarChart
