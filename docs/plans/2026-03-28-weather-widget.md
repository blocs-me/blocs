# Weather Widget — Implementation Plan

## Overview

A live weather widget embeddable in Notion. Shows current conditions and optionally a multi-day forecast for a user-configured location. Fetches data from Open-Meteo (free, no API key required, open source).

**Architecture:** Client-side widget, URL query params for config. Location (lat/lng) is configured in the dashboard and encoded in the URL. Weather data is fetched directly from Open-Meteo on the client — no backend proxy needed. Pro-only widget.

This is the first widget with an external API dependency. The widget gracefully degrades if the API is unreachable (shows cached data or a "weather unavailable" message).

---

## Open-Meteo API

### Why Open-Meteo
- Completely free — no API key, no rate limit tiers, no account needed
- Open source (GitHub: open-meteo/open-meteo)
- Fast, reliable CDN-backed responses
- Supports current weather + 7-day forecast in a single request
- Returns WMO weather codes (standardized, easy to map to icons)

### API Endpoint

```
https://api.open-meteo.com/v1/forecast
  ?latitude=40.7128
  &longitude=-74.0060
  &current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m
  &daily=temperature_2m_max,temperature_2m_min,weather_code
  &temperature_unit=celsius
  &timezone=America/New_York
  &forecast_days=7
```

### Response Shape (simplified)

```json
{
  "current": {
    "temperature_2m": 18.5,
    "apparent_temperature": 16.2,
    "relative_humidity_2m": 65,
    "weather_code": 3,
    "wind_speed_10m": 12.4
  },
  "daily": {
    "time": ["2026-03-28", "2026-03-29", ...],
    "temperature_2m_max": [20, 22, ...],
    "temperature_2m_min": [12, 14, ...],
    "weather_code": [3, 1, ...]
  }
}
```

### WMO Weather Codes → Icons/Labels

| Code | Description | Icon |
|------|-------------|------|
| 0 | Clear sky | ☀️ |
| 1-3 | Partly cloudy / Overcast | ⛅ / ☁️ |
| 45, 48 | Fog | 🌫️ |
| 51-55 | Drizzle | 🌦️ |
| 61-65 | Rain | 🌧️ |
| 71-75 | Snow | ❄️ |
| 80-82 | Rain showers | 🌧️ |
| 95-99 | Thunderstorm | ⛈️ |

We'll use simple SVG icons (not emoji) for a clean look. Map WMO codes to ~8 icon variants.

---

## Display Modes

### 1. Current Only (default)
Shows current temperature, weather condition icon, and location name. Compact, fits a small embed.

Optional extras (toggleable):
- Feels-like temperature
- Humidity
- Wind speed
- High/low for today

### 2. Forecast
Shows current conditions plus a 3-7 day forecast row. Each day: icon, high, low.

### 3. Compact
Ultra-minimal — just the temperature and icon. For embedding inline alongside other widgets.

---

## Location

Users set their location in the dashboard. Two options:

1. **City search** — user types a city name, we use Open-Meteo's geocoding API to resolve to lat/lng:
   ```
   https://geocoding-api.open-meteo.com/v1/search?name=New+York&count=5
   ```
   Returns a list of matches with name, country, lat, lng. User picks one.

2. **Manual coordinates** — fallback for users who want exact lat/lng.

The embed URL stores `lat`, `lng`, and `loc` (display name). No geolocation API or IP lookup needed.

---

## Config Type

```ts
type WeatherDisplay = 'current' | 'forecast' | 'compact'
type TempUnit = 'celsius' | 'fahrenheit'

type WeatherWidgetConfig = {
  display: WeatherDisplay
  theme: 'light' | 'dark'
  title: string
  showTitle: boolean
  latitude: number
  longitude: number
  locationName: string
  timezone: string
  tempUnit: TempUnit
  showFeelsLike: boolean
  showHumidity: boolean
  showWind: boolean
  showHighLow: boolean
  forecastDays: number          // 3-7, for forecast mode
  iconStyle: 'outline' | 'filled'
  tempColor: string
  labelColor: string
}
```

---

## URL Param Encoding

```
/weather?lat=40.7128&lng=-74.006&loc=New+York&tz=America/New_York&unit=f&display=forecast&days=5&theme=dark
/weather?lat=51.5074&lng=-0.1278&loc=London&display=compact
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| lat | number | — (required) | Latitude |
| lng | number | — (required) | Longitude |
| loc | string | "" | Location display name |
| tz | string | local | IANA timezone |
| display | current/forecast/compact | current | Display mode |
| theme | light/dark | light | Color scheme |
| title | string | "" | Optional title |
| showTitle | 0/1 | 0 | Show/hide title |
| unit | c/f | c | Temperature unit |
| feels | 0/1 | 0 | Show feels-like |
| humidity | 0/1 | 0 | Show humidity |
| wind | 0/1 | 0 | Show wind speed |
| hl | 0/1 | 1 | Show today's high/low |
| days | 3-7 | 5 | Forecast days (forecast mode) |
| icons | outline/filled | outline | Icon style |
| tempColor | hex | theme default | Temperature color |
| labelColor | hex | theme default | Label/secondary color |

---

## Data Fetching Strategy

1. **On widget load:** fetch current weather + forecast from Open-Meteo
2. **Cache in memory:** store response, refresh every 15 minutes (weather doesn't change faster than that)
3. **Error handling:** if fetch fails, show last cached data with a subtle "updated X min ago" label. If no cache, show a clean "Weather unavailable" message — no broken UI.
4. **Loading state:** show a skeleton/shimmer while the first fetch completes (should be <500ms typically)

No localStorage caching — weather data is always fresh on page load, then refreshes on interval. The 15-minute interval keeps API calls low (~4/hour per widget instance).

---

## File Structure

```
src/components/widgets/Weather/
  weatherConfig.ts            — types, defaults, URL param encode/decode
  weatherConfig.test.ts       — config roundtrip tests
  useWeather.ts               — hook: fetches weather data, caches, refreshes
  useWeather.test.ts          — tests for data transformation + WMO code mapping
  weatherCodes.ts             — WMO code → label + icon mapping
  WeatherIcons.tsx            — SVG weather icon components (~8 variants)
  WeatherDisplay.tsx          — renders current conditions
  ForecastRow.tsx             — renders multi-day forecast
  CompactWeather.tsx          — ultra-minimal display
  LocationSearch.tsx          — city search input for dashboard (uses geocoding API)
  WeatherSettings.tsx         — dashboard settings panel
  DummyWeatherPreview.tsx     — marketing preview (hardcoded sample data, no API call)

src/components/pages/Dashboard/WeatherDashboard/
  WeatherDashboard.tsx        — dashboard tab with live preview + settings
  index.ts

src/pages/
  weather/index.tsx           — widget iframe page
  weather-widget.tsx          — marketing/dedicated page
```

---

## Implementation Order

### Phase 1: Weather codes + config (TDD)

1. **`weatherCodes.ts`** — WMO code to label/icon-name mapping. Pure data, no components.

2. **`weatherConfig.ts`** — types, `getDefaultConfig()`, `configFromParams()`, `configToParams()`, `configToEmbedUrl()`.

3. **Tests first** for:
   - Config encode/decode roundtrip
   - WMO code mapping covers all code ranges
   - Temperature unit conversion (C ↔ F display)

### Phase 2: Data fetching hook (TDD)

4. **`useWeather.ts`** — hook that fetches and transforms weather data
   - Input: `{ latitude, longitude, timezone, tempUnit, forecastDays }`
   - Output: `{ current, forecast, isLoading, error, lastUpdated }`
   - `current`: `{ temp, feelsLike, humidity, windSpeed, weatherCode, high, low }`
   - `forecast`: array of `{ date, high, low, weatherCode }`
   - Exported pure function `transformResponse(apiData, unit)` for testing
   - 15-minute refresh interval

5. **Tests** for:
   - `transformResponse` correctly extracts and formats data
   - Fahrenheit conversion: `(C × 9/5) + 32`
   - Handles missing/null values gracefully

### Phase 3: Display components

6. **`WeatherIcons.tsx`** — ~8 SVG icons: clear, partly cloudy, overcast, fog, drizzle, rain, snow, thunderstorm. Clean outline style, single color (uses currentColor).

7. **`WeatherDisplay.tsx`** — current conditions: large temp, icon, location name, optional details row (feels like, humidity, wind, high/low)

8. **`ForecastRow.tsx`** — horizontal row of daily forecasts. Each day: abbreviated name, icon, high/low temps.

9. **`CompactWeather.tsx`** — just icon + temperature + location, single line.

### Phase 4: Widget iframe page

10. **`src/pages/weather/index.tsx`** — reads URL params, fetches weather, renders appropriate display mode. Loading skeleton. Error state.

### Phase 5: Dashboard

11. **`LocationSearch.tsx`** — text input with debounced search against Open-Meteo geocoding API. Shows dropdown of results (city, country, coordinates). User picks one.

12. **`WeatherSettings.tsx`** — location search, display mode picker, unit toggle (°C/°F), detail toggles, forecast days slider, theme/color pickers

13. **`WeatherDashboard.tsx`** — live preview (actual weather for configured location) + settings panel, copy link button

### Phase 6: Integration + marketing

14. Add "Weather" tab to DashboardNav (cloud/sun icon)
15. Add to Dashboard routing (lazy import, validPaths, ProGate)
16. Add to pricing table features list
17. Create `DummyWeatherPreview.tsx` (hardcoded sample data — sunny 72°F in San Francisco — no API call on marketing pages)
18. Landing page section with Pro badge
19. Dedicated marketing page `/weather-widget`
20. Footer link

---

## Key Decisions

- **Open-Meteo, no API key** — zero configuration, no server proxy, no secrets management. The widget calls the API directly from the browser. If Open-Meteo ever adds rate limits, we can add a lightweight proxy later — but for now, client-direct is the simplest path.
- **Location configured in dashboard, not auto-detected** — browser geolocation requires user permission and may not work inside Notion iframes. IP geolocation adds another API call and is often inaccurate. Explicit city selection is reliable and deterministic.
- **15-minute refresh** — balances data freshness with API courtesy. Weather doesn't change faster than this.
- **No hourly forecast** — keeps the widget compact and the API response small. Daily forecast is sufficient for a Notion embed.
- **Marketing preview uses hardcoded data** — DummyWeatherPreview doesn't make API calls. Shows a static "72°F Sunny in San Francisco" to avoid loading states and API failures on marketing pages.
- **Pro-only** — gated like all new widgets.
- **Graceful degradation** — API failure shows a clean message, not a broken widget. Cached data is shown with a "last updated" timestamp.
- **SVG icons, not emoji** — emoji render differently across OS/browsers. Custom SVGs ensure consistent appearance and match the widget's theme.
