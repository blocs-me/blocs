import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Switch from '@/design-system/Switch'
import LocationSearch from './LocationSearch'
import type { WeatherWidgetConfig, WeatherDisplay, TempUnit } from './weatherConfig'

const Label = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize="xs" fontWeight={500} color="foreground" m={0}>
    {children}
  </Text>
)

const Row = ({ children }: { children: React.ReactNode }) => (
  <Flex justifyContent="space-between" alignItems="center" py="6px">
    {children}
  </Flex>
)

const ToggleButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <Box
    as="button"
    flex="1"
    py="4px"
    borderRadius="sm"
    bg={active ? 'brand.accent-1' : 'primary.accent-2'}
    color={active ? 'neutral.white' : 'foreground'}
    css={{
      border: 'none',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: active ? 600 : 400,
      textTransform: 'capitalize',
    }}
    onClick={onClick}
  >
    {label}
  </Box>
)

type Props = {
  config: WeatherWidgetConfig
  onChange: (updates: Partial<WeatherWidgetConfig>) => void
}

const FORECAST_DAY_OPTIONS = [3, 5, 7]

const WeatherSettings = ({ config, onChange }: Props) => {
  const handleLocationSelect = (result: { name: string; latitude: number; longitude: number; timezone: string }) => {
    onChange({
      locationName: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      timezone: result.timezone,
    })
  }

  return (
    <Flex flexDirection="column" css={{ gap: '2px' }}>
      <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xxs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
        Settings
      </Text>

      {/* Location */}
      <Row><Label>Location</Label></Row>
      <Box mb="xxs">
        <LocationSearch
          onSelect={handleLocationSelect}
          currentLocation={config.locationName}
        />
      </Box>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Display mode */}
      <Row><Label>Display</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {(['current', 'forecast', 'compact'] as const).map(d => (
          <ToggleButton key={d} label={d} active={config.display === d} onClick={() => onChange({ display: d })} />
        ))}
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Theme */}
      <Row><Label>Theme</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {(['light', 'dark'] as const).map(t => (
          <ToggleButton key={t} label={t} active={config.theme === t} onClick={() => onChange({ theme: t })} />
        ))}
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Temperature unit */}
      <Row><Label>Unit</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        <ToggleButton label="°C" active={config.tempUnit === 'celsius'} onClick={() => onChange({ tempUnit: 'celsius' })} />
        <ToggleButton label="°F" active={config.tempUnit === 'fahrenheit'} onClick={() => onChange({ tempUnit: 'fahrenheit' })} />
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Detail toggles */}
      <Row>
        <Label>Feels Like</Label>
        <Switch id="weather-feels" ariaLabel="feels like" checked={config.showFeelsLike} onChange={() => onChange({ showFeelsLike: !config.showFeelsLike })} />
      </Row>
      <Row>
        <Label>Humidity</Label>
        <Switch id="weather-humidity" ariaLabel="humidity" checked={config.showHumidity} onChange={() => onChange({ showHumidity: !config.showHumidity })} />
      </Row>
      <Row>
        <Label>Wind Speed</Label>
        <Switch id="weather-wind" ariaLabel="wind" checked={config.showWind} onChange={() => onChange({ showWind: !config.showWind })} />
      </Row>
      <Row>
        <Label>High / Low</Label>
        <Switch id="weather-hl" ariaLabel="high low" checked={config.showHighLow} onChange={() => onChange({ showHighLow: !config.showHighLow })} />
      </Row>

      {/* Forecast days (only in forecast mode) */}
      {config.display === 'forecast' && (
        <>
          <Box height="1px" bg="primary.accent-1" my="xxs" />
          <Row><Label>Forecast Days</Label></Row>
          <Flex css={{ gap: '4px' }} mb="xxs">
            {FORECAST_DAY_OPTIONS.map(d => (
              <ToggleButton key={d} label={`${d}`} active={config.forecastDays === d} onClick={() => onChange({ forecastDays: d })} />
            ))}
          </Flex>
        </>
      )}

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Colors */}
      <Row>
        <Label>Temp Color</Label>
        <input
          type="color"
          value={config.tempColor || (config.theme === 'dark' ? '#e0e0e0' : '#1a1a1a')}
          onChange={(e) => onChange({ tempColor: e.target.value })}
          style={{ width: '32px', height: '24px', border: 'none', cursor: 'pointer', background: 'transparent' }}
        />
      </Row>
      <Row>
        <Label>Label Color</Label>
        <input
          type="color"
          value={config.labelColor || (config.theme === 'dark' ? '#888888' : '#999999')}
          onChange={(e) => onChange({ labelColor: e.target.value })}
          style={{ width: '32px', height: '24px', border: 'none', cursor: 'pointer', background: 'transparent' }}
        />
      </Row>
    </Flex>
  )
}

export default WeatherSettings
