import styled from '@emotion/styled'
import themeGet from '@styled-system/theme-get'
import type { BarGraphData } from './types'
import { useMemo, useRef } from 'react'

const PADDING_X = 3
const PADDING_Y = 8

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
}

const daysOfTheWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const Bar = ({
  value,
  unit,
  barWidth,
  barHeightUnit,
  index,
  xDrift,
  date
}: BarData) => {
  const barHeight = barHeightUnit * value
  const drift = index * xDrift
  const x = (barWidth + PADDING_X) * index + drift
  const y = 90 - barHeight - PADDING_Y
  const day = daysOfTheWeek[new Date(date).getDay()]
  const textX = Math.floor(x + barWidth / 2)

  return (
    <>
      <Rect x={x} y={y} height={barHeight} width={barWidth} />
      <Text
        fontWeight="200"
        x={textX}
        y={y - PADDING_Y / 2}
        // dominantBaseline="start"
      >
        {value} {unit}
      </Text>
      <Text
        fontFamily="Karla"
        fontWeight="600"
        dominantBaseline="middle"
        x={textX}
        y={90 - PADDING_Y / 2}
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
}

const BarGraph = ({ data, paddingX = 5, paddingY = 10 }: BarGraphProps) => {
  const max = useMemo(() => Math.max(...data.map((d) => d.value)), [data])
  const width = 160
  const height = 90
  const divisions = data.length

  const svgRef = useRef<SVGSVGElement>(null)
  const barWidth = parseFloat((width / divisions - PADDING_X).toFixed(4))
  const barHeightUnit = parseFloat(((height - PADDING_Y * 2) / max).toFixed(4))
  const xDrift = parseFloat((PADDING_X / divisions).toFixed(4))

  return (
    <Svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
      {data.map((barData, index) => (
        <Bar
          {...barData}
          key={barData.id}
          barWidth={barWidth}
          index={index}
          barHeightUnit={barHeightUnit}
          xDrift={xDrift}
        />
      ))}
    </Svg>
  )
}

export default BarGraph
