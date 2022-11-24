import { BarChartProps } from '../types'

const sortData = (data: BarChartProps['data']) =>
  data?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

const largestFreq = (nums: number[]) => {
  const counter = {}

  for (let num of nums) {
    counter[num] ? counter[num]++ : (counter[num] = 1)
  }

  let largest = 0

  nums.forEach((num) => {
    if (counter[num] > largest) {
      largest = num
    }
  })

  return largest
}

export type UseBarChartReturn<T = {}> = {
  ticksY: number
  data: {
    height: string
    date: string
    id: string | number
    isDifferentMonth?: boolean
    value: number
  }[]
  stepY: (tickIndex: number) => (string | number)[]
} & T

type BarChartData = BarChartProps['data']
type ICompose = (fns: (arg?: BarChartData) => BarChartData) => BarChartData

const compose: ICompose = (...fns) => {
  let result = null as BarChartData
  for (let i = 0; i < fns.length; i++) {
    result = fns[i](result)
  }
  return result
}
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
    const date = new Date(firstDate)
    date.setDate(-1)
    return date.getDate()
  })()

  const count = timePeriod === 'weekly' ? 7 : numberOfDaysInMonth
  const startDate = new Date(firstDate)
  startDate.setDate(startDate.getDate() - (startDate.getDay() - 1))

  const month = startDate.getMonth()
  const year = startDate.getFullYear()
  const day = startDate.getDate()
  const mostCommonMonth = largestFreq(
    sortedData.map((data) => new Date(data.date).getMonth())
  )

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(year, month, day + i)
    const isDifferentMonth = currentDate.getMonth() !== mostCommonMonth
    const data = dataByDateStr[
      currentDate.toDateString()
    ] as UseBarChartReturn['data']

    if (!data) {
      result.push({
        isDifferentMonth,
        id: currentDate.getTime(),
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
  timePeriod
}: BarChartProps): UseBarChartReturn => {
  const sortedData = formatData(data, timePeriod)

  const values = sortedData.map(({ value }) => value)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min
  const countY = new Set(values).size

  const ticksY = (() => {
    if (countY > 10) return 10
    if (countY <= 5) return 5
    return countY
  })()

  const stepValue = Math.ceil((range / ticksY) * 2)
  const maxTick = stepValue * ticksY

  const stepY = (tickIndex: number) => {
    const currentStep = tickIndex * stepValue
    return [
      currentStep,
      `${(currentStep / maxTick) * 100}%`,
      `${Number(height.replace('px', '')) * (currentStep / maxTick)}px`
    ]
  }

  return {
    data: sortedData.map(({ value = 0, ...barData }) => ({
      ...barData,
      value,
      height: `${(value / maxTick) * 100}%`
    })),
    stepY,
    ticksY
  }
}

export default useBarChart
