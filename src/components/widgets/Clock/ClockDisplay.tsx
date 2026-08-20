import FlipDigit from './FlipDigit'

type Props = {
  hours: string
  minutes: string
  seconds?: string
  ampm?: string
  dateString?: string
  timezoneLabel?: string
  title?: string
  showTitle?: boolean
  showDate?: boolean
  showTimezone?: boolean
  showSeconds?: boolean
  style: 'digital' | 'flip' | 'minimal'
  theme: 'light' | 'dark'
  numberColor?: string
  labelColor?: string
  fontScale?: number
}

const ClockDisplay = ({
  hours,
  minutes,
  seconds,
  ampm,
  dateString,
  timezoneLabel,
  title,
  showTitle = false,
  showDate = false,
  showTimezone = false,
  showSeconds = true,
  style,
  theme,
  numberColor,
  labelColor,
  fontScale = 1
}: Props) => {
  const isDark = theme === 'dark'
  const numColor = numberColor || (isDark ? '#ffffff' : '#333333')
  const lblColor = labelColor || (isDark ? '#999999' : '#888888')
  const bgColor = isDark ? '#1a1a1a' : '#ffffff'
  const titleColor = isDark ? '#cccccc' : '#666666'

  const timeString = showSeconds && seconds
    ? `${hours}:${minutes}:${seconds}`
    : `${hours}:${minutes}`

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
        <DigitalDisplay
          timeString={timeString}
          ampm={ampm}
          numColor={numColor}
          lblColor={lblColor}
          fontScale={fontScale}
        />
      )}

      {style === 'flip' && (
        <FlipDisplay
          hours={hours}
          minutes={minutes}
          seconds={showSeconds ? seconds : undefined}
          ampm={ampm}
          numColor={numColor}
          lblColor={lblColor}
          bgColor={bgColor}
          fontScale={fontScale}
        />
      )}

      {style === 'minimal' && (
        <MinimalDisplay
          timeString={timeString}
          ampm={ampm}
          numColor={numColor}
          lblColor={lblColor}
          fontScale={fontScale}
        />
      )}

      {(showDate || showTimezone) && (
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '8px',
          fontSize: '13px',
          color: lblColor
        }}>
          {showDate && dateString && <span>{dateString}</span>}
          {showTimezone && timezoneLabel && <span>{timezoneLabel}</span>}
        </div>
      )}
    </div>
  )
}

const DigitalDisplay = ({ timeString, ampm, numColor, lblColor, fontScale }: {
  timeString: string
  ampm?: string
  numColor: string
  lblColor: string
  fontScale: number
}) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
    <span style={{
      fontSize: `${56 * fontScale}px`,
      fontWeight: 700,
      color: numColor,
      fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1,
      letterSpacing: '2px'
    }}>
      {timeString}
    </span>
    {ampm && (
      <span style={{
        fontSize: `${18 * fontScale}px`,
        fontWeight: 600,
        color: lblColor,
        marginLeft: '4px'
      }}>
        {ampm}
      </span>
    )}
  </div>
)

const FlipDisplay = ({ hours, minutes, seconds, ampm, numColor, lblColor, bgColor, fontScale }: {
  hours: string
  minutes: string
  seconds?: string
  ampm?: string
  numColor: string
  lblColor: string
  bgColor: string
  fontScale: number
}) => {
  const digits = (val: string) => val.padStart(2, '0').split('')

  const renderGroup = (value: string) => (
    <div style={{ display: 'flex', gap: '3px' }}>
      {digits(value).map((d, i) => (
        <FlipDigit key={i} digit={d} color={numColor} bgColor={bgColor} scale={fontScale} />
      ))}
    </div>
  )

  const dotSize = 6 * fontScale
  const colon = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: `${10 * fontScale}px`,
      padding: '0 4px',
      height: `${64 * fontScale}px`
    }}>
      <div style={{ width: `${dotSize}px`, height: `${dotSize}px`, borderRadius: '50%', backgroundColor: numColor }} />
      <div style={{ width: `${dotSize}px`, height: `${dotSize}px`, borderRadius: '50%', backgroundColor: numColor }} />
    </div>
  )

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {renderGroup(hours)}
      {colon}
      {renderGroup(minutes)}
      {seconds !== undefined && (
        <>
          {colon}
          {renderGroup(seconds)}
        </>
      )}
      {ampm && (
        <span style={{
          fontSize: `${16 * fontScale}px`,
          fontWeight: 600,
          color: lblColor,
          marginLeft: '8px',
          alignSelf: 'flex-end',
          paddingBottom: '4px'
        }}>
          {ampm}
        </span>
      )}
    </div>
  )
}

const MinimalDisplay = ({ timeString, ampm, numColor, lblColor, fontScale }: {
  timeString: string
  ampm?: string
  numColor: string
  lblColor: string
  fontScale: number
}) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
    <span style={{
      fontSize: `${64 * fontScale}px`,
      fontWeight: 300,
      color: numColor,
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-1px'
    }}>
      {timeString}
    </span>
    {ampm && (
      <span style={{
        fontSize: `${20 * fontScale}px`,
        fontWeight: 400,
        color: lblColor
      }}>
        {ampm}
      </span>
    )}
  </div>
)

export default ClockDisplay
