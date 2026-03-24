import { UnitKey, CountdownParts } from './useCountdown'

const UNIT_LABELS: Record<UnitKey, string> = {
  years: 'YEARS',
  months: 'MONTHS',
  weeks: 'WEEKS',
  days: 'DAYS',
  hours: 'HOURS',
  minutes: 'MINUTES',
  seconds: 'SECONDS'
}

type Props = {
  title?: string
  showTitle?: boolean
  parts: CountdownParts
  visibleUnits: UnitKey[]
  numberColor?: string
  labelColor?: string
  theme?: 'light' | 'dark'
}

const CountdownDisplay = ({
  title,
  showTitle = true,
  parts,
  visibleUnits,
  numberColor,
  labelColor,
  theme = 'light'
}: Props) => {
  const isDark = theme === 'dark'
  const defaultNumColor = isDark ? '#ffffff' : '#333333'
  const defaultLabelColor = isDark ? '#999999' : '#888888'
  const numColor = numberColor || defaultNumColor
  const lblColor = labelColor || defaultLabelColor
  const bgColor = isDark ? '#1a1a1a' : '#ffffff'
  const titleColor = isDark ? '#cccccc' : '#666666'

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
          marginBottom: '16px',
          letterSpacing: '0.5px'
        }}>
          {title}
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '24px'
      }}>
        {visibleUnits.map((unit) => (
          <div key={unit} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '48px'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: 700,
              color: numColor,
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums'
            }}>
              {String(parts[unit]).padStart(2, '0')}
            </div>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              color: lblColor,
              marginTop: '6px',
              letterSpacing: '2px'
            }}>
              {UNIT_LABELS[unit]}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CountdownDisplay
