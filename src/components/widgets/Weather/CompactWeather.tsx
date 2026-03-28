import type { CurrentWeather } from './useWeather'
import type { TempUnit } from './weatherConfig'
import { getWeatherCondition } from './weatherCodes'
import { WeatherIcon } from './WeatherIcons'

type Props = {
  current: CurrentWeather
  locationName: string
  tempUnit: TempUnit
  theme: 'light' | 'dark'
  tempColor?: string
  labelColor?: string
}

const CompactWeather = ({ current, locationName, tempUnit, theme, tempColor, labelColor }: Props) => {
  const isDark = theme === 'dark'
  const bg = isDark ? '#1a1a1a' : '#ffffff'
  const tColor = tempColor || (isDark ? '#e0e0e0' : '#1a1a1a')
  const lColor = labelColor || (isDark ? '#888888' : '#999999')
  const iconColor = isDark ? '#cccccc' : '#555555'
  const condition = getWeatherCondition(current.weatherCode)
  const unit = tempUnit === 'fahrenheit' ? '°F' : '°C'

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      width: '100%',
      height: '100%',
      minHeight: '60px',
      backgroundColor: bg,
      padding: '12px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <WeatherIcon name={condition.icon} size={28} color={iconColor} />
      <div style={{ fontSize: '28px', fontWeight: 700, color: tColor, lineHeight: 1 }}>
        {current.temp}{unit}
      </div>
      {locationName && (
        <div style={{ fontSize: '13px', color: lColor, fontWeight: 500 }}>
          {locationName}
        </div>
      )}
    </div>
  )
}

export default CompactWeather
