import { useState, useEffect } from 'react'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import WeatherDisplay from '@/widgets/Weather/WeatherDisplay'
import ForecastRow from '@/widgets/Weather/ForecastRow'
import CompactWeather from '@/widgets/Weather/CompactWeather'
import WeatherSettings from '@/widgets/Weather/WeatherSettings'
import { useWeather } from '@/widgets/Weather/useWeather'
import { WeatherWidgetConfig, getDefaultConfig, configToEmbedUrl } from '@/widgets/Weather/weatherConfig'
import CopyLinkButton from '../CopyLinkButton'
import HowToEmbedButton from '../HowToEmbedButton'
import storage from '@/utils/storage'

const STORAGE_KEY = 'weatherConfig'

function loadConfig(): WeatherWidgetConfig {
  try {
    const saved = storage.getItem(STORAGE_KEY)
    if (saved) return { ...getDefaultConfig(), ...JSON.parse(saved) }
  } catch {}
  return getDefaultConfig()
}

const WeatherDashboard = () => {
  const [config, setConfig] = useState<WeatherWidgetConfig>(loadConfig)

  useEffect(() => {
    storage.setItem(STORAGE_KEY, JSON.stringify(config))
  }, [config])

  const handleChange = (updates: Partial<WeatherWidgetConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  const { current, forecast, isLoading, error } = useWeather({
    latitude: config.latitude,
    longitude: config.longitude,
    timezone: config.timezone,
    tempUnit: config.tempUnit,
    forecastDays: config.forecastDays,
  })

  const embedUrl = configToEmbedUrl(config)
  const hasLocation = config.latitude !== 0 || config.longitude !== 0

  return (
    <Flex css={{ gap: '24px' }}>
      <Box css={{ flex: '1 1 0', minWidth: 0 }}>
        <Flex justifyContent="space-between" alignItems="center" mb="sm">
          <Text as="h2" fontSize="lg" fontWeight={700} color="foreground" m={0}>
            Weather
          </Text>
          <Flex css={{ gap: '8px' }} alignItems="center">
            <HowToEmbedButton />
            <CopyLinkButton url={embedUrl} disabled={!hasLocation} />
          </Flex>
        </Flex>

        <Box
          borderRadius="md"
          border="1px solid"
          borderColor="primary.accent-2"
          overflow="hidden"
          mb="md"
          minHeight="280px"
          css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          {!hasLocation && (
            <Text fontSize="sm" color="primary.accent-4" m={0}>
              Search for a city in settings to see live weather
            </Text>
          )}

          {hasLocation && isLoading && (
            <Text fontSize="sm" color="primary.accent-4" m={0}>
              Loading weather...
            </Text>
          )}

          {hasLocation && error && !current && (
            <Text fontSize="sm" color="primary.accent-4" m={0}>
              Weather unavailable
            </Text>
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
            <>
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
              {config.display === 'forecast' && forecast.length > 0 && (
                <Box width="100%" css={{ backgroundColor: config.theme === 'dark' ? '#1a1a1a' : '#ffffff' }}>
                  <ForecastRow
                    forecast={forecast.slice(0, config.forecastDays)}
                    tempUnit={config.tempUnit}
                    theme={config.theme}
                    tempColor={config.tempColor}
                    labelColor={config.labelColor}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>

      <Box
        css={{ flex: '0 0 300px', alignSelf: 'flex-start' }}
        p="sm"
        borderRadius="md"
        border="1px solid"
        borderColor="primary.accent-2"
      >
        <WeatherSettings config={config} onChange={handleChange} />
      </Box>
    </Flex>
  )
}

export default WeatherDashboard
