import type { ForecastDay } from './useWeather'
import type { TempUnit } from './weatherConfig'
import { getWeatherCondition } from './weatherCodes'
import { WeatherIcon } from './WeatherIcons'

type Props = {
  forecast: ForecastDay[]
  tempUnit: TempUnit
  theme: 'light' | 'dark'
  tempColor?: string
  labelColor?: string
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDayName(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return DAY_NAMES[d.getDay()]
}

const ForecastRow = ({ forecast, theme, tempColor, labelColor }: Props) => {
  const isDark = theme === 'dark'
  const tColor = tempColor || (isDark ? '#e0e0e0' : '#1a1a1a')
  const lColor = labelColor || (isDark ? '#888888' : '#999999')
  const iconColor = isDark ? '#cccccc' : '#555555'

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '4px',
      width: '100%',
      padding: '8px 12px',
    }}>
      {forecast.map((day, i) => {
        const condition = getWeatherCondition(day.weatherCode)
        return (
          <div key={day.date} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: '1 1 0',
            padding: '6px 2px',
            borderRadius: '6px',
            backgroundColor: i === 0 ? (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)') : 'transparent',
          }}>
            <div style={{ fontSize: '11px', color: lColor, fontWeight: 500, marginBottom: '4px' }}>
              {i === 0 ? 'Today' : getDayName(day.date)}
            </div>
            <WeatherIcon name={condition.icon} size={20} color={iconColor} />
            <div style={{ fontSize: '12px', color: tColor, fontWeight: 600, marginTop: '4px' }}>
              {day.high}°
            </div>
            <div style={{ fontSize: '11px', color: lColor }}>
              {day.low}°
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ForecastRow
