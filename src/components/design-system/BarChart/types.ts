import { ReactNode } from 'react'

export type BarChartProps = {
  data: {
    value: number
    date: string
    id: string | number
  }[]
  width: number
  height: number
  formatYLabel: (label: string | number) => string
  timePeriod: 'weekly' | 'monthly'
  renderTooltip?: <CustomData = {}>(
    tooltipData: TooltipData & CustomData
  ) => JSX.Element
  className?: string
  minY: number
}

export type TooltipData = {
  timePeriod: BarChartProps['timePeriod']
  height: string
  date: string
  id: string | number
  isDifferentMonth?: boolean
  value: number
}
