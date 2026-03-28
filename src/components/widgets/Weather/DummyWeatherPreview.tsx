import WeatherDisplay from './WeatherDisplay'
import ForecastRow from './ForecastRow'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Link from 'next/link'
import Button from '@/design-system/Button'
import type { CurrentWeather, ForecastDay } from './useWeather'

type Props = {
  theme?: 'light' | 'dark'
  showCta?: boolean
}

const sampleCurrent: CurrentWeather = {
  temp: 72,
  feelsLike: 70,
  humidity: 55,
  windSpeed: 8,
  weatherCode: 1,
  high: 75,
  low: 58,
}

const sampleForecast: ForecastDay[] = [
  { date: '2026-03-28', high: 75, low: 58, weatherCode: 1 },
  { date: '2026-03-29', high: 73, low: 56, weatherCode: 0 },
  { date: '2026-03-30', high: 68, low: 54, weatherCode: 3 },
  { date: '2026-03-31', high: 70, low: 55, weatherCode: 61 },
  { date: '2026-04-01', high: 72, low: 57, weatherCode: 0 },
]

const DummyWeatherPreview = ({ theme = 'light', showCta = true }: Props) => {
  return (
    <Box position="relative">
      <WeatherDisplay
        current={sampleCurrent}
        locationName="San Francisco, CA"
        tempUnit="fahrenheit"
        theme={theme}
        showFeelsLike={false}
        showHumidity={false}
        showWind={false}
        showHighLow={true}
      />
      <Box css={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff' }}>
        <ForecastRow
          forecast={sampleForecast}
          tempUnit="fahrenheit"
          theme={theme}
        />
      </Box>
      {showCta && (
        <Flex justifyContent="center" css={{ paddingBottom: '16px', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff' }}>
          <Link href="/pricing" style={{ textDecoration: 'none' }}>
            <Button
              className="plausible-event-name=CTA+Customize+Weather"
              bg="brand.accent-1"
              color="neutral.white"
              borderRadius="sm"
              px="sm"
              py="4px"
              fontSize="xxs"
              fontWeight="bold"
              css={{ '&:hover': { opacity: 0.85 } }}
            >
              Customize your weather widget →
            </Button>
          </Link>
        </Flex>
      )}
    </Box>
  )
}

export default DummyWeatherPreview
