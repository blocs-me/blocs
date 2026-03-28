import type { CalendarDay } from './useCalendar'
import { getWeekNumber } from './useCalendar'
import type { DateMarker } from './calendarConfig'

const DAY_HEADERS_SUN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DAY_HEADERS_MON = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

type Props = {
  grid: CalendarDay[][]
  markers: DateMarker[]
  fillColor: string
  headerColor: string
  theme: 'light' | 'dark'
  showWeekNumbers: boolean
  startOfWeek: 0 | 1
  monthLabel: string
  onPrevMonth: () => void
  onNextMonth: () => void
}

const MonthView = ({
  grid,
  markers,
  fillColor,
  headerColor,
  theme,
  showWeekNumbers,
  startOfWeek,
  monthLabel,
  onPrevMonth,
  onNextMonth
}: Props) => {
  const isDark = theme === 'dark'
  const bgColor = isDark ? '#1a1a1a' : '#ffffff'
  const textColor = isDark ? '#ffffff' : '#333333'
  const mutedColor = isDark ? '#555555' : '#cccccc'
  const dayHeaderColor = isDark ? '#888888' : '#999999'
  const accent = fillColor || (isDark ? '#6C9CFF' : '#4A7AFF')
  const hdrColor = headerColor || textColor
  const dayHeaders = startOfWeek === 1 ? DAY_HEADERS_MON : DAY_HEADERS_SUN

  const markerMap = new Map(markers.map(m => [m.date, m]))

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
      {/* Header with nav */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '360px',
        marginBottom: '16px'
      }}>
        <NavButton onClick={onPrevMonth} isDark={isDark}>‹</NavButton>
        <span style={{
          fontSize: '16px',
          fontWeight: 600,
          color: hdrColor
        }}>
          {monthLabel}
        </span>
        <NavButton onClick={onNextMonth} isDark={isDark}>›</NavButton>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: showWeekNumbers ? '28px repeat(7, 1fr)' : 'repeat(7, 1fr)',
        gap: '2px',
        width: '100%',
        maxWidth: '360px'
      }}>
        {/* Day headers */}
        {showWeekNumbers && <div />}
        {dayHeaders.map(d => (
          <div key={d} style={{
            textAlign: 'center',
            fontSize: '11px',
            fontWeight: 600,
            color: dayHeaderColor,
            padding: '4px 0',
            letterSpacing: '0.5px'
          }}>
            {d}
          </div>
        ))}

        {/* Day cells */}
        {grid.map((week, wi) => {
          const weekNum = showWeekNumbers ? getWeekNumber(new Date(week[3].date)) : null
          return [
            showWeekNumbers && (
              <div key={`wn-${wi}`} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: mutedColor,
                fontWeight: 500
              }}>
                {weekNum}
              </div>
            ),
            ...week.map((day) => {
              const marker = markerMap.get(day.date)
              return (
                <div key={day.date} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px 0',
                  minHeight: '36px',
                  position: 'relative'
                }} title={marker?.label || undefined}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    fontSize: '13px',
                    fontWeight: day.isToday ? 700 : 400,
                    color: day.isToday ? '#ffffff' : day.isCurrentMonth ? textColor : mutedColor,
                    backgroundColor: day.isToday ? accent : 'transparent',
                    fontVariantNumeric: 'tabular-nums'
                  }}>
                    {day.dayOfMonth}
                  </span>
                  {marker && (
                    <div style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: marker.color || accent,
                      marginTop: '2px'
                    }} />
                  )}
                </div>
              )
            })
          ]
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

export default MonthView
