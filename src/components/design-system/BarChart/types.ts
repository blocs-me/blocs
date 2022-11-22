import { ReactNode } from 'react'

export type BarChartProps = {
  data?: {
    value: number
    date: string
    id: string | number
  }[]
  width?: string
  height?: string
  formatYLabel: (label: string | number) => string
  timePeriod: 'weekly' | 'monthly'
  renderTooltip: (tooltipData: {
    value: number
    date: string
    id: string
  }) => ReactNode
  className?: string
}
