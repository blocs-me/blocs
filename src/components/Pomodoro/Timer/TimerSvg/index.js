/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react"
import { animate, degreesToRadians, interpolate } from "popmotion"
import { useEffect, useRef } from "react"

const TimerSvg = ({ progress = 50 }) => {
  const theme = useTheme()
  const ROTATION_OFFSET = 90
  const radius = 113
  const degreesTurned = progress * 3.6 - ROTATION_OFFSET
  const radiansTurned = degreesToRadians(degreesTurned)
  const timerStrokeWidth = 8
  const viewBox = 255
  const center = viewBox / 2
  const circleEndX = center + radius * Math.cos(radiansTurned)
  const circleEndY = center + radius * Math.sin(radiansTurned)
  const circumference = Math.PI * 2 * radius
  const getTimerDashoffset = interpolate([0, 100], [circumference, 0])

  const previousProgressAmount = useRef(0)
  const timerCircumference = useRef(null)
  const timerTail = useRef(null)

  useEffect(() => {
    animate({
      from: [previousProgressAmount.current || 0, progress],
      duration: 1000,
      onUpdate: (val) => {
        timerCircumference.current.style.strokeDashoffset = `${getTimerDashoffset(
          progress
        )}px`
        timerTail.current.style.cx = circleEndX
        timerTail.current.style.cy = circleEndY
      },
    })
  }, [progress])

  return (
    <svg
      viewBox={`0 0 ${viewBox} ${viewBox}`}
      css={{ width: "100%", height: "100%" }}
    >
      <defs>
        <filter id="timer-circle-shadow">
          <feDropShadow
            dx="0"
            dy="1.25"
            stdDeviation="0"
            floodColor="rgba(0,0,0,0.2)"
          />
        </filter>
      </defs>
      <circle
        name="timer muted background"
        stroke={theme.colors.primary.lightest}
        strokeWidth={timerStrokeWidth}
        fill="none"
        cx={center}
        cy={center}
        r={radius}
        filter="url(#timer-circle-shadow)"
      />
      <circle
        name="timer data-visual circumference tail"
        fill={theme.colors.primary.dark}
        cx={circleEndX}
        cy={circleEndY}
        r="14"
        ref={timerTail}
      />
      <circle
        name="timer data-visual circumference"
        stroke={theme.colors.primary.dark}
        strokeWidth={timerStrokeWidth}
        fill="none"
        strokeDasharray={(Math.PI * 2 * radius).toFixed(2)}
        strokeDashoffset={getTimerDashoffset(0)}
        ref={timerCircumference}
        css={{
          transform: `rotate(-${ROTATION_OFFSET}deg)`,
          transformOrigin: "center center",
        }}
        strokeLinecap="round"
        cx={center}
        cy={center}
        r={radius}
      />
    </svg>
  )
}

export default TimerSvg
