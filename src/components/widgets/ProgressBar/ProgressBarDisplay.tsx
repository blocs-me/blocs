import { VisualStyle, CalendarBars } from './progressBarConfig'
import { CalendarProgressResult } from './useProgressBar'

type SingleProgressProps = {
  percentage: number
  label?: string
  fillColor: string
  trackColor: string
  textColor: string
  style: VisualStyle
}

const Bar = ({ percentage, label, fillColor, trackColor, textColor }: SingleProgressProps) => (
  <div style={{ width: '100%' }}>
    {label && (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: textColor, letterSpacing: '1px' }}>
          {label}
        </span>
        <span style={{ fontSize: '12px', fontWeight: 700, color: fillColor }}>
          {Math.round(percentage)}%
        </span>
      </div>
    )}
    <div style={{
      width: '100%',
      height: '12px',
      borderRadius: '6px',
      backgroundColor: trackColor,
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${Math.min(100, Math.max(0, percentage))}%`,
        height: '100%',
        borderRadius: '6px',
        backgroundColor: fillColor,
        transition: 'width 0.3s ease'
      }} />
    </div>
    {!label && (
      <div style={{ textAlign: 'center', marginTop: '6px' }}>
        <span style={{ fontSize: '14px', fontWeight: 700, color: fillColor }}>
          {Math.round(percentage)}%
        </span>
      </div>
    )}
  </div>
)

const Ring = ({ percentage, fillColor, trackColor, textColor }: SingleProgressProps) => {
  const size = 120
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={trackColor} strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={fillColor} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{ fontSize: '24px', fontWeight: 700, color: textColor }}>
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  )
}

const Gauge = ({ percentage, fillColor, trackColor, textColor }: SingleProgressProps) => {
  const size = 160
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const halfCircumference = Math.PI * radius
  const offset = halfCircumference - (Math.min(100, Math.max(0, percentage)) / 100) * halfCircumference

  return (
    <div style={{ width: size, textAlign: 'center' }}>
      <svg width={size} height={size / 2 + strokeWidth} viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}>
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none" stroke={trackColor} strokeWidth={strokeWidth} strokeLinecap="round"
        />
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none" stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={halfCircumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      <div style={{ marginTop: '-20px' }}>
        <span style={{ fontSize: '28px', fontWeight: 700, color: textColor }}>
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  )
}

const STYLE_MAP = { bar: Bar, ring: Ring, gauge: Gauge }

// Single-value display (manual + date range modes)
type Props = {
  style: VisualStyle
  percentage: number
  title?: string
  showTitle?: boolean
  fillColor?: string
  theme?: 'light' | 'dark'
  current?: number
  total?: number
  showValue?: boolean
}

const CALENDAR_LABELS: Record<string, string> = {
  year: 'YEAR',
  month: 'MONTH',
  week: 'WEEK',
  day: 'DAY'
}

// Calendar mode display (multiple bars)
type CalendarProps = {
  style: VisualStyle
  progress: CalendarProgressResult
  calendarBars: CalendarBars
  title?: string
  showTitle?: boolean
  fillColor?: string
  theme?: 'light' | 'dark'
}

export const CalendarDisplay = ({
  style,
  progress,
  calendarBars,
  title,
  showTitle = true,
  fillColor,
  theme = 'light'
}: CalendarProps) => {
  const isDark = theme === 'dark'
  const defaultFill = '#4CAF50'
  const fill = fillColor || defaultFill
  const track = isDark ? '#333333' : '#e8e8e8'
  const textColor = isDark ? '#ffffff' : '#333333'
  const labelColor = isDark ? '#999999' : '#888888'
  const titleColor = isDark ? '#cccccc' : '#666666'
  const bgColor = isDark ? '#1a1a1a' : '#ffffff'

  const enabledBars = (Object.keys(calendarBars) as Array<keyof CalendarBars>)
    .filter(k => calendarBars[k])

  const Component = STYLE_MAP[style]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      minHeight: '120px',
      backgroundColor: bgColor,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }}>
      {showTitle && title && (
        <div style={{ fontSize: '14px', fontWeight: 500, color: titleColor, marginBottom: '16px', letterSpacing: '0.5px' }}>
          {title}
        </div>
      )}

      {style === 'bar' ? (
        <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {enabledBars.map(key => (
            <Bar
              key={key}
              percentage={progress[key]}
              label={CALENDAR_LABELS[key]}
              fillColor={fill}
              trackColor={track}
              textColor={labelColor}
              style="bar"
            />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {enabledBars.map(key => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Component
                percentage={progress[key]}
                fillColor={fill}
                trackColor={track}
                textColor={textColor}
                style={style}
              />
              <span style={{ fontSize: '11px', fontWeight: 600, color: labelColor, marginTop: '6px', letterSpacing: '2px' }}>
                {CALENDAR_LABELS[key]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const ProgressBarDisplay = ({
  style,
  percentage,
  title,
  showTitle = true,
  fillColor,
  theme = 'light',
  current,
  total,
  showValue = false
}: Props) => {
  const isDark = theme === 'dark'
  const defaultFill = '#4CAF50'
  const fill = fillColor || defaultFill
  const track = isDark ? '#333333' : '#e8e8e8'
  const textColor = isDark ? '#ffffff' : '#333333'
  const titleColor = isDark ? '#cccccc' : '#666666'
  const bgColor = isDark ? '#1a1a1a' : '#ffffff'

  const Component = STYLE_MAP[style]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      minHeight: '120px',
      backgroundColor: bgColor,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }}>
      {showTitle && title && (
        <div style={{ fontSize: '14px', fontWeight: 500, color: titleColor, marginBottom: '16px', letterSpacing: '0.5px' }}>
          {title}
        </div>
      )}

      <div style={{ width: style === 'bar' ? '100%' : 'auto', maxWidth: '400px', display: 'flex', justifyContent: 'center' }}>
        <Component
          percentage={percentage}
          fillColor={fill}
          trackColor={track}
          textColor={textColor}
          style={style}
        />
      </div>

      {showValue && current !== undefined && total !== undefined && (
        <div style={{ fontSize: '13px', color: titleColor, marginTop: '8px' }}>
          {current} / {total}
        </div>
      )}
    </div>
  )
}

export default ProgressBarDisplay
