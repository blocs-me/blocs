import styled from '@emotion/styled'
import themeGet from '@styled-system/theme-get'
import type { BarGraphData } from './types'
import { useMemo, useRef } from 'react'

const Rect = styled.rect`
  fill: ${themeGet('colors.primary.accent-4')};
`

const Svg = styled.svg`
  width: 100%;
`

const Text = styled.text`
  font-size: 4px;
  font-family: ${themeGet('fonts.body')};
  fill: ${themeGet('colors.primary.accent-2')};
  text-anchor: middle;
`

type BarData = BarGraphData & {
  barWidth: number
  barHeightUnit: number
  index: number
  xDrift: number
  paddingX: number
  paddingY: number
  width: number
  height: number
}

const daysOfTheWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

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
  height
}: BarData) => {
  const barHeight = barHeightUnit * value
  const drift = index * xDrift
  const x = (barWidth + paddingX) * index + drift
  const y = height - barHeight - paddingY
  const day = daysOfTheWeek[new Date(date).getDay()]
  const textX = Math.floor(x + barWidth / 2)

  return (
    <>
      <Rect x={x} y={y} height={barHeight} width={barWidth} />
      <Text fontWeight="200" x={textX} y={y - paddingY / 2}>
        {value} {unit}
      </Text>
      <Text
        fontFamily="Karla"
        fontWeight="600"
        dominantBaseline="middle"
        x={textX}
        y={height - paddingY / 2}
      >
        {day}
      </Text>
    </>
  )
}

type BarGraphProps = {
  data: BarGraphData[]
  paddingX?: number
  paddingY?: number
  width?: number
  height?: number
}

const BarGraph = ({
  data,
  paddingX = 5,
  paddingY = 10,
  width = 160,
  height = 90
}: BarGraphProps) => {
  const max = useMemo(() => Math.max(...data.map((d) => d.value)), [data])
  const divisions = data.length

  const svgRef = useRef<SVGSVGElement>(null)
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
    height
  }

  return (
    <Svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
      {data.map((barData, index) => (
        <Bar {...barData} {...sharedBarProps} key={barData.id} index={index} />
      ))}
    </Svg>
  )
}

export default BarGraph
