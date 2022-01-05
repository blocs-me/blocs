import themeGet from "@styled-system/theme-get"
import { useEffect } from "react"
import { useMemo, useState } from "react"

const { useTheme } = require("@emotion/react")
const { default: styled } = require("@emotion/styled")

const DonutChart = ({
  foreground = "primary.accent-4",
  background = "primary.accent-1",
  textColor = "primary.accent-2",
  strokeWidth = 10,
  size = "100px",
  showProgress,
  progressPercent,
  progress = 75,
}) => {
  const theme = useTheme()
  const RADIUS = 50 - (strokeWidth / 2).toFixed(1)
  const circumference = (Math.PI * 2 * RADIUS).toFixed(2)
  const [strokeOffset, setStrokeOffset] = useState(circumference)
  const getColor = (themeKey) => themeGet(`colors.${themeKey}`)({ theme })

  useEffect(() => {
    setStrokeOffset(circumference - circumference * (progress / 100))
  }, [progress, circumference])

  console.log(background)

  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle
        cx="50"
        cy="50"
        r={RADIUS}
        stroke={getColor(background)}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r={RADIUS}
        stroke={getColor(foreground)}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        css={{
          transform: "rotate(-90deg)",
          transformOrigin: "center",
          transition: "stroke-dashoffset 1s ease-in-out",
        }}
        strokeDasharray={circumference}
        strokeDashoffset={strokeOffset}
      />
      {showProgress && (
        <text
          x="50"
          y="55"
          textAnchor="middle"
          fontFamily="Karla, sans-serif"
          fontSize="16px"
          fill={getColor(textColor)}
        >
          {progressPercent}%
        </text>
      )}
    </svg>
  )
}

export default DonutChart
