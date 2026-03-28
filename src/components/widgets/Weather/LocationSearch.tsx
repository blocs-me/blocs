import { useState, useRef, useEffect } from 'react'

type GeoResult = {
  name: string
  country: string
  admin1?: string
  latitude: number
  longitude: number
  timezone: string
}

type Props = {
  onSelect: (result: { name: string; latitude: number; longitude: number; timezone: string }) => void
  currentLocation: string
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '13px',
  background: 'transparent',
  color: 'var(--colors-foreground)',
  outline: 'none',
}

const LocationSearch = ({ onSelect, currentLocation }: Props) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GeoResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('error')
      return
    }
    setGeoStatus('loading')
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
          // Reverse geocode with OpenStreetMap Nominatim (free, no key)
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`
            )
            const data = await res.json()
            const city = data.address?.city || data.address?.town || data.address?.village || ''
            const state = data.address?.state || ''
            const country = data.address?.country || ''
            const parts = [city, state, country].filter(Boolean)
            const displayName = parts.length ? parts.join(', ') : `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
            onSelect({ name: displayName, latitude, longitude, timezone: tz })
          } catch {
            onSelect({ name: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`, latitude, longitude, timezone: tz })
          }
          setGeoStatus('idle')
        } catch {
          setGeoStatus('error')
        }
      },
      () => setGeoStatus('error'),
      { timeout: 10000 }
    )
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const search = (value: string) => {
    setQuery(value)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (value.length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(value)}&count=5&language=en`
        )
        const data = await res.json()
        if (data.results) {
          setResults(data.results)
          setIsOpen(true)
        } else {
          setResults([])
          setIsOpen(true)
        }
      } catch {
        setResults([])
      }
    }, 300)
  }

  const handleSelect = (r: GeoResult) => {
    const displayName = r.admin1 ? `${r.name}, ${r.admin1}, ${r.country}` : `${r.name}, ${r.country}`
    onSelect({
      name: displayName,
      latitude: r.latitude,
      longitude: r.longitude,
      timezone: r.timezone,
    })
    setQuery('')
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {currentLocation && (
        <div style={{
          fontSize: '12px',
          color: 'var(--colors-foreground)',
          marginBottom: '4px',
          fontWeight: 500,
        }}>
          {currentLocation}
        </div>
      )}
      <input
        type="text"
        value={query}
        onChange={(e) => search(e.target.value)}
        placeholder="Search city..."
        style={inputStyle}
      />
      <button
        onClick={useMyLocation}
        disabled={geoStatus === 'loading'}
        style={{
          width: '100%',
          marginTop: '4px',
          padding: '4px 8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          background: 'transparent',
          color: 'var(--colors-primary-accent-4)',
          fontSize: '11px',
          cursor: geoStatus === 'loading' ? 'wait' : 'pointer',
          textAlign: 'center',
        }}
      >
        {geoStatus === 'loading' ? 'Locating...' : geoStatus === 'error' ? 'Location unavailable — try searching' : 'Use my current location'}
      </button>
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'var(--colors-background)',
          border: '1px solid var(--colors-primary-accent-2)',
          borderRadius: '4px',
          marginTop: '2px',
          zIndex: 100,
          maxHeight: '200px',
          overflow: 'auto',
        }}>
          {results.length === 0 ? (
            <div style={{ padding: '8px 10px', fontSize: '12px', color: 'var(--colors-primary-accent-4)' }}>
              No results found
            </div>
          ) : (
            results.map((r, i) => (
              <div
                key={`${r.latitude}-${r.longitude}-${i}`}
                onClick={() => handleSelect(r)}
                style={{
                  padding: '6px 10px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: 'var(--colors-foreground)',
                  borderBottom: i < results.length - 1 ? '1px solid var(--colors-primary-accent-2)' : 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--colors-primary-accent-2)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ fontWeight: 500 }}>{r.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--colors-primary-accent-4)' }}>
                  {r.admin1 ? `${r.admin1}, ` : ''}{r.country}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default LocationSearch
