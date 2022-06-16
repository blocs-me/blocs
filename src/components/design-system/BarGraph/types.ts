export type BarGraphData = {
  date: string
  value: number
  unit: 'hrs' | 'days' | 'months' | 'years'
  id: string | number
}

export type UseBarGraphProps = {
  min: number
  max: number
  data: BarGraphData
}
