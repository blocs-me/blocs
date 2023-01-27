import Box from '@/helpers/Box'
import themeGet from '@styled-system/theme-get'
import { useEffect } from 'react'
import { useMemo, useState } from 'react'

const { useTheme } = require('@emotion/react')
const { default: styled } = require('@emotion/styled')

type Props = {
  foreground?: string
  background?: string
  textColor?: string
  strokeWidthInner?: number
  strokeWidthOuter?: number
  size?: string
  showText?: boolean
  text?: string
  progress: number
}

const DonutChart = ({
  foreground = 'primary.accent-4',
  background = 'primary.accent-1',
  textColor = 'primary.accent-2',
  strokeWidthInner = 5,
  strokeWidthOuter = 20,
  size = '100px',
  showText = false,
  text,
  progress = 75
}: Props) => {
  const theme = useTheme()
  const RADIUS_INNER = 50 - Number(strokeWidthOuter.toFixed(1))
  const RADIUS_OUTER = 50 - Number(strokeWidthOuter.toFixed(1))
  const circumference = Number((Math.PI * 2 * RADIUS_OUTER).toFixed(2))
  const [strokeOffset, setStrokeOffset] = useState(circumference)
  const getColor = (themeKey) => themeGet(`colors.${themeKey}`)({ theme })

  useEffect(() => {
    setStrokeOffset(circumference - circumference * (progress / 100))
  }, [progress, circumference])

  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <defs>
        <radialGradient
          id="dm-gradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(80 91) rotate(148.799) scale(83.006)"
        >
          <stop offset="0.333333" stopColor="#00F0FF" />
          <stop offset="0.671875" stopColor="#1E78CC" />
          <stop offset="1" stopColor="#28D9E4" />
        </radialGradient>
      </defs>
      <Box
        as="circle"
        cx="50"
        cy="50"
        r={RADIUS_INNER}
        stroke={getColor(background)}
        strokeWidth={strokeWidthInner}
        fill="none"
      />
      <Box
        as="circle"
        cx="50"
        cy="50"
        r={RADIUS_OUTER}
        stroke={foreground}
        strokeWidth={strokeWidthOuter}
        fill="none"
        strokeLinecap="round"
        css={{
          transform: 'rotate(-90deg)',
          transformOrigin: 'center',
          transition: 'stroke-dashoffset 1s ease-in-out'
        }}
        strokeDasharray={circumference}
        strokeDashoffset={strokeOffset}
      />
      {showText && (
        <text
          x="50"
          y="55"
          textAnchor="middle"
          fontFamily="Karla, sans-serif"
          fontSize="10px"
          fill={getColor(textColor)}
        >
          {text}
        </text>
      )}
    </svg>
  )
}

export default DonutChart
