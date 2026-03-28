import { buildMonthGrid } from './useCalendar'
import type { DateMarker } from './calendarConfig'

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const DAY_LETTERS_SUN = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const DAY_LETTERS_MON = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

type Props = {
  year: number
  today: string
  markers: DateMarker[]
  fillColor: string
  headerColor: string
  theme: 'light' | 'dark'
  startOfWeek: 0 | 1
  onSelectMonth: (month: number) => void
  onPrevYear: () => void
  onNextYear: () => void
}

const YearView = ({
  year,
  today,
  markers,
  fillColor,
  headerColor,
  theme,
  startOfWeek,
  onSelectMonth,
  onPrevYear,
  onNextYear
}: Props) => {
  const isDark = theme === 'dark'
  const bgColor = isDark ? '#1a1a1a' : '#ffffff'
  const textColor = isDark ? '#ffffff' : '#333333'
  const mutedColor = isDark ? '#555555' : '#cccccc'
  const accent = fillColor || (isDark ? '#6C9CFF' : '#4A7AFF')
  const hdrColor = headerColor || textColor
  const dayLetters = startOfWeek === 1 ? DAY_LETTERS_MON : DAY_LETTERS_SUN

  const markerDates = new Set(markers.map(m => m.date))

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: bgColor,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Year header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '520px',
        marginBottom: '16px'
      }}>
        <NavButton onClick={onPrevYear} isDark={isDark}>‹</NavButton>
        <span style={{ fontSize: '18px', fontWeight: 700, color: hdrColor }}>{year}</span>
        <NavButton onClick={onNextYear} isDark={isDark}>›</NavButton>
      </div>

      {/* 4×3 grid of mini months */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        width: '100%',
        maxWidth: '520px'
      }}>
        {Array.from({ length: 12 }, (_, m) => {
          const grid = buildMonthGrid(year, m, startOfWeek, today)
          return (
            <div
              key={m}
              onClick={() => onSelectMonth(m)}
              style={{ cursor: 'pointer', padding: '4px', borderRadius: '6px' }}
            >
              <div style={{
                fontSize: '11px',
                fontWeight: 600,
                color: hdrColor,
                marginBottom: '4px',
                textAlign: 'center'
              }}>
                {MONTH_NAMES[m]}
              </div>

              {/* Day letters header */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
                {dayLetters.map((d, i) => (
                  <div key={i} style={{
                    textAlign: 'center',
                    fontSize: '7px',
                    color: mutedColor,
                    fontWeight: 500,
                    lineHeight: '12px'
                  }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Mini grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
                {grid.flat().map((day) => {
                  const hasMarker = markerDates.has(day.date)
                  return (
                    <div key={day.date} style={{
                      textAlign: 'center',
                      fontSize: '8px',
                      lineHeight: '14px',
                      fontWeight: day.isToday ? 700 : 400,
                      color: day.isToday ? '#ffffff' : day.isCurrentMonth ? textColor : 'transparent',
                      backgroundColor: day.isToday ? accent : 'transparent',
                      borderRadius: '2px',
                      position: 'relative'
                    }}>
                      {day.dayOfMonth}
                      {hasMarker && !day.isToday && (
                        <div style={{
                          position: 'absolute',
                          bottom: '-1px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '3px',
                          height: '3px',
                          borderRadius: '50%',
                          backgroundColor: accent
                        }} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const NavButton = ({ onClick, isDark, children }: {
  onClick: () => void
  isDark: boolean
  children: React.ReactNode
}) => (
  <button
    onClick={onClick}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '20px',
      color: isDark ? '#888' : '#666',
      padding: '4px 8px',
      borderRadius: '4px',
      lineHeight: 1
    }}
  >
    {children}
  </button>
)

export default YearView
