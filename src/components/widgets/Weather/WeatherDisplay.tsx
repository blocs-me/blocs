import { getWeatherCondition } from './weatherCodes'
import { WeatherIcon } from './WeatherIcons'
import type { CurrentWeather } from './useWeather'
import type { TempUnit } from './weatherConfig'

type Props = {
  current: CurrentWeather
  locationName: string
  tempUnit: TempUnit
  theme: 'light' | 'dark'
  showFeelsLike: boolean
  showHumidity: boolean
  showWind: boolean
  showHighLow: boolean
  tempColor?: string
  labelColor?: string
}

const unitSymbol = (unit: TempUnit) => unit === 'fahrenheit' ? '°F' : '°C'

const WeatherDisplay = ({
  current,
  locationName,
  tempUnit,
  theme,
  showFeelsLike,
  showHumidity,
  showWind,
  showHighLow,
  tempColor,
  labelColor,
}: Props) => {
  const isDark = theme === 'dark'
  const bg = isDark ? '#1a1a1a' : '#ffffff'
  const tColor = tempColor || (isDark ? '#e0e0e0' : '#1a1a1a')
  const lColor = labelColor || (isDark ? '#888888' : '#999999')
  const iconColor = isDark ? '#cccccc' : '#555555'
  const condition = getWeatherCondition(current.weatherCode)
  const unit = unitSymbol(tempUnit)

  const details: { label: string; value: string }[] = []
  if (showFeelsLike) details.push({ label: 'Feels like', value: `${current.feelsLike}${unit}` })
  if (showHumidity) details.push({ label: 'Humidity', value: `${current.humidity}%` })
  if (showWind) details.push({ label: 'Wind', value: `${current.windSpeed} km/h` })
  if (showHighLow) details.push({ label: 'H / L', value: `${current.high}° / ${current.low}°` })

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      minHeight: '180px',
      backgroundColor: bg,
      padding: '24px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <WeatherIcon name={condition.icon} size={48} color={iconColor} />

      <div style={{
        fontSize: '48px',
        fontWeight: 700,
        color: tColor,
        lineHeight: 1.1,
        marginTop: '8px',
      }}>
        {current.temp}{unit}
      </div>

      <div style={{
        fontSize: '14px',
        color: lColor,
        marginTop: '4px',
      }}>
        {condition.label}
      </div>

      {locationName && (
        <div style={{
          fontSize: '13px',
          color: lColor,
          marginTop: '2px',
          fontWeight: 500,
        }}>
          {locationName}
        </div>
      )}

      {details.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '16px',
          marginTop: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {details.map(d => (
            <div key={d.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: lColor, marginBottom: '2px' }}>{d.label}</div>
              <div style={{ fontSize: '13px', color: tColor, fontWeight: 500 }}>{d.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default WeatherDisplay
