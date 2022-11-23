import { BarChartProps } from '../types'

const sortData = (data: BarChartProps['data']) =>
  data?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

export type UseBarChartReturn = {
  ticksY: number
  data: {
    height: string
    date: string
    id: string | number
  }[]
  stepY: (tickIndex: number) => (string | number)[]
}

const useBarChart = ({ data, height }: BarChartProps): UseBarChartReturn => {
  const sortedData = sortData(data)
  // TODO: handle x and y when there is less than 7 days data
  // TODO: handle when there is no data at all <-
  // TODO: handle less than 8 ticks on the y axis
  // TODO: handle when the dates don't begin on monday

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
    data: sortedData.map(({ value, ...barData }) => ({
      ...barData,
      height: `${(value / maxTick) * 100}%`
    })),
    stepY,
    ticksY
  }
}

export default useBarChart
