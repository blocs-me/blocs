import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { configFromParams } from '@/widgets/Weather/weatherConfig'
import { useWeather } from '@/widgets/Weather/useWeather'
import WeatherDisplay from '@/widgets/Weather/WeatherDisplay'
import ForecastRow from '@/widgets/Weather/ForecastRow'
import CompactWeather from '@/widgets/Weather/CompactWeather'
import WidgetSettingsPopover from '@/widgets/Clock/WidgetSettingsPopover'

const WeatherPage = () => {
  const router = useRouter()

  const config = useMemo(() => {
    if (!router.isReady) return null
    return configFromParams(new URLSearchParams(router.asPath.split('?')[1] || ''))
  }, [router.isReady, router.asPath])

  if (!config) return null
  if (!config.latitude && !config.longitude) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        color: '#999',
      }}>
        Set a location in the dashboard to see weather
      </div>
    )
  }

  return <WeatherWidget config={config} />
}

const WeatherWidget = ({ config }: { config: ReturnType<typeof configFromParams> }) => {
  const { current, forecast, isLoading, error } = useWeather({
    latitude: config.latitude,
    longitude: config.longitude,
    timezone: config.timezone,
    tempUnit: config.tempUnit,
    forecastDays: config.forecastDays,
  })

  const isDark = config.theme === 'dark'
  const bg = isDark ? '#1a1a1a' : '#ffffff'
  const textColor = isDark ? '#888' : '#999'

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', backgroundColor: bg }}>
      <WidgetSettingsPopover
        currentMode={config.display}
        onModeChange={() => {}}
        modes={[]}
        dashboardPath="/dashboard/weather"
      />

      {isLoading && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          fontSize: '14px',
          color: textColor,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
          Loading weather...
        </div>
      )}

      {error && !current && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          fontSize: '14px',
          color: textColor,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
          Weather unavailable
        </div>
      )}

      {current && config.display === 'compact' && (
        <CompactWeather
          current={current}
          locationName={config.locationName}
          tempUnit={config.tempUnit}
          theme={config.theme}
          tempColor={config.tempColor}
          labelColor={config.labelColor}
        />
      )}

      {current && config.display !== 'compact' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1, display: 'flex' }}>
            <WeatherDisplay
              current={current}
              locationName={config.locationName}
              tempUnit={config.tempUnit}
              theme={config.theme}
              showFeelsLike={config.showFeelsLike}
              showHumidity={config.showHumidity}
              showWind={config.showWind}
              showHighLow={config.display === 'current' && config.showHighLow}
              tempColor={config.tempColor}
              labelColor={config.labelColor}
            />
          </div>
          {config.display === 'forecast' && forecast.length > 0 && (
            <div style={{ backgroundColor: bg }}>
              <ForecastRow
                forecast={forecast.slice(0, config.forecastDays)}
                tempUnit={config.tempUnit}
                theme={config.theme}
                tempColor={config.tempColor}
                labelColor={config.labelColor}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default WeatherPage
