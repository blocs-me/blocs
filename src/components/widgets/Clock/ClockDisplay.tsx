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
  labelColor
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
        />
      )}

      {style === 'minimal' && (
        <MinimalDisplay
          timeString={timeString}
          ampm={ampm}
          numColor={numColor}
          lblColor={lblColor}
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

const DigitalDisplay = ({ timeString, ampm, numColor, lblColor }: {
  timeString: string
  ampm?: string
  numColor: string
  lblColor: string
}) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
    <span style={{
      fontSize: '56px',
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
        fontSize: '18px',
        fontWeight: 600,
        color: lblColor,
        marginLeft: '4px'
      }}>
        {ampm}
      </span>
    )}
  </div>
)

const FlipDisplay = ({ hours, minutes, seconds, ampm, numColor, lblColor, bgColor }: {
  hours: string
  minutes: string
  seconds?: string
  ampm?: string
  numColor: string
  lblColor: string
  bgColor: string
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
          fontSize: '16px',
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

const MinimalDisplay = ({ timeString, ampm, numColor, lblColor }: {
  timeString: string
  ampm?: string
  numColor: string
  lblColor: string
}) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
    <span style={{
      fontSize: '64px',
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
        fontSize: '20px',
        fontWeight: 400,
        color: lblColor
      }}>
        {ampm}
      </span>
    )}
  </div>
)

export default ClockDisplay
