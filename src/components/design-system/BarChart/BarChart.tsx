import type { BarGraphData } from './types'
import { useMemo } from 'react'
import { Rect, Text, Svg } from './BarChart.styled'

type GetXAxisValue = (args: { date: string }) => string
type GetYAxisValue = (args: {
  value: BarGraphData['value']
  unit: BarGraphData['unit']
}) => string

type BarGraphProps = {
  data: BarGraphData[]
  paddingX?: number
  paddingY?: number
  width?: number
  height?: number
  getXAxisValue: GetXAxisValue
  getYAxisValue: GetYAxisValue
}

type BarData = BarGraphData & {
  barWidth: number
  barHeightUnit: number
  index: number
  xDrift: number
  paddingX: number
  paddingY: number
  width: number
  height: number
  getXAxisValue: GetXAxisValue
  getYAxisValue: GetYAxisValue
}

const Bar = ({
  value,
  unit,
  barWidth,
  barHeightUnit,
  index,
  xDrift,
  date,
  paddingX,
  paddingY,
  height,
  getXAxisValue,
  getYAxisValue
}: BarData) => {
  const barHeight = barHeightUnit * value
  const drift = index * xDrift
  const x = (barWidth + paddingX) * index + drift
  const y = height - barHeight - paddingY
  const textX = Math.floor(x + barWidth / 2)
  const xAxisValue = getXAxisValue({ date })
  const yAxisValue = getYAxisValue({ value, unit })

  return (
    <>
      <Rect x={x} y={y} height={barHeight} width={barWidth} />
      <Text
        fontWeight="200"
        x={textX}
        y={y - paddingY / 2}
        dominantBaseline="auto"
      >
        {yAxisValue}
      </Text>
      <Text
        fontFamily="Karla"
        fontWeight="600"
        dominantBaseline="hanging"
        x={textX}
        y={height - paddingY / 2}
      >
        {xAxisValue}
      </Text>
    </>
  )
}

const BarChart = ({
  data,
  paddingX = 5,
  paddingY = 10,
  width = 160,
  height = 90,
  getXAxisValue,
  getYAxisValue
}: BarGraphProps) => {
  const max = useMemo(() => Math.max(...data.map((d) => d.value)), [data])
  const divisions = data.length
  const barWidth = parseFloat((width / divisions - paddingX).toFixed(4))
  const barHeightUnit = parseFloat(((height - paddingY * 2) / max).toFixed(4))
  const xDrift = parseFloat((paddingX / divisions).toFixed(4))

  const sharedBarProps = {
    barWidth,
    barHeightUnit,
    xDrift,
    paddingX,
    paddingY,
    width,
    height,
    getXAxisValue,
    getYAxisValue
  }

  return (
    <Svg viewBox={`0 0 ${width} ${height}`}>
      {data.map((barData, index) => (
        <Bar {...barData} {...sharedBarProps} key={barData.id} index={index} />
      ))}
    </Svg>
  )
}

export default BarChart
