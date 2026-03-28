import type { TimerDisplay as TimerDisplayType } from './useTimer'
import FlipDigit from './FlipDigit'

type Props = {
  display: TimerDisplayType
  isRunning: boolean
  isFinished: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
  title?: string
  showTitle?: boolean
  style: 'digital' | 'flip' | 'minimal'
  theme: 'light' | 'dark'
  numberColor?: string
  labelColor?: string
}

const pad = (n: number) => String(n).padStart(2, '0')

const TimerDisplay = ({
  display,
  isRunning,
  isFinished,
  onStart,
  onPause,
  onReset,
  title,
  showTitle = false,
  style,
  theme,
  numberColor,
  labelColor
}: Props) => {
  const isDark = theme === 'dark'
  const numColor = numberColor || (isDark ? '#ffffff' : '#333333')
  const lblColor = labelColor || (isDark ? '#999999' : '#888888')
  const bgColor = isDark ? '#1a1a1a' : '#ffffff'
  const titleColor = isDark ? '#cccccc' : '#666666'

  const { hours, minutes, seconds } = display
  const showHours = hours > 0
  const timeString = showHours
    ? `${hours}:${pad(minutes)}:${pad(seconds)}`
    : `${minutes}:${pad(seconds)}`

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
        <div style={{
          fontSize: '14px',
          fontWeight: 500,
          color: titleColor,
          marginBottom: '12px',
          letterSpacing: '0.5px'
        }}>
          {title}
        </div>
      )}

      {style === 'digital' && (
        <DigitalTimer timeString={timeString} numColor={numColor} isFinished={isFinished} />
      )}

      {style === 'flip' && (
        <FlipTimer
          hours={showHours ? pad(hours) : undefined}
          minutes={showHours ? pad(minutes) : String(minutes)}
          seconds={pad(seconds)}
          numColor={numColor}
          bgColor={bgColor}
          isFinished={isFinished}
        />
      )}

      {style === 'minimal' && (
        <MinimalTimer timeString={timeString} numColor={numColor} isFinished={isFinished} />
      )}

      <TimerControls
        isRunning={isRunning}
        isFinished={isFinished}
        onStart={onStart}
        onPause={onPause}
        onReset={onReset}
        isDark={isDark}
      />
    </div>
  )
}

const DigitalTimer = ({ timeString, numColor, isFinished }: {
  timeString: string
  numColor: string
  isFinished: boolean
}) => (
  <span style={{
    fontSize: '56px',
    fontWeight: 700,
    color: numColor,
    fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
    fontVariantNumeric: 'tabular-nums',
    lineHeight: 1,
    letterSpacing: '2px',
    opacity: isFinished ? 0.5 : 1
  }}>
    {timeString}
  </span>
)

const FlipTimer = ({ hours, minutes, seconds, numColor, bgColor, isFinished }: {
  hours?: string
  minutes: string
  seconds: string
  numColor: string
  bgColor: string
  isFinished: boolean
}) => {
  const digits = (val: string) => val.padStart(2, '0').split('')

  const renderGroup = (value: string) => (
    <div style={{ display: 'flex', gap: '3px' }}>
      {digits(value).map((d, i) => (
        <FlipDigit key={i} digit={d} color={numColor} bgColor={bgColor} />
      ))}
    </div>
  )

  const colon = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '10px',
      padding: '0 4px',
      height: '64px'
    }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: numColor }} />
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: numColor }} />
    </div>
  )

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', opacity: isFinished ? 0.5 : 1 }}>
      {hours && (
        <>
          {renderGroup(hours)}
          {colon}
        </>
      )}
      {renderGroup(minutes)}
      {colon}
      {renderGroup(seconds)}
    </div>
  )
}

const MinimalTimer = ({ timeString, numColor, isFinished }: {
  timeString: string
  numColor: string
  isFinished: boolean
}) => (
  <span style={{
    fontSize: '64px',
    fontWeight: 300,
    color: numColor,
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums',
    letterSpacing: '-1px',
    opacity: isFinished ? 0.5 : 1
  }}>
    {timeString}
  </span>
)

const BUTTON_BASE: React.CSSProperties = {
  border: 'none',
  borderRadius: '6px',
  padding: '8px 20px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'opacity 0.15s'
}

const TimerControls = ({ isRunning, isFinished, onStart, onPause, onReset, isDark }: {
  isRunning: boolean
  isFinished: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
  isDark: boolean
}) => {
  const accentBg = '#4CAF50'
  const secondaryBg = isDark ? '#333' : '#e8e8e8'
  const secondaryColor = isDark ? '#ccc' : '#555'

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
      {isRunning ? (
        <button style={{ ...BUTTON_BASE, backgroundColor: '#ff9800', color: '#fff' }} onClick={onPause}>
          Pause
        </button>
      ) : (
        <button
          style={{ ...BUTTON_BASE, backgroundColor: accentBg, color: '#fff', opacity: isFinished ? 0.5 : 1 }}
          onClick={onStart}
          disabled={isFinished}
        >
          {isFinished ? 'Done' : 'Start'}
        </button>
      )}
      <button style={{ ...BUTTON_BASE, backgroundColor: secondaryBg, color: secondaryColor }} onClick={onReset}>
        Reset
      </button>
    </div>
  )
}

export default TimerDisplay
