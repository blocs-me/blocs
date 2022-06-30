export type BarChartData = {
  date: string
  value: number
  unit: 'hrs' | 'days' | 'months' | 'years'
  id: string | number
}

export type GetXAxisValue = (args: { date: string }) => string

export type GetYAxisValue = (args: {
  value: BarChartData['value']
  unit: BarChartData['unit']
}) => string

export type BarChartProps = {
  data: BarChartData[]
  paddingX?: number
  paddingY?: number
  width?: number
  height?: number
  getXAxisValue: GetXAxisValue
  getYAxisValue: GetYAxisValue
}
