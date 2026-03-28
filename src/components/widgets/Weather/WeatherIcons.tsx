type IconProps = { size?: number; color?: string }

const defaultProps = { size: 32, color: 'currentColor' }

export const ClearIcon = ({ size = defaultProps.size, color = defaultProps.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

export const PartlyCloudyIcon = ({ size = defaultProps.size, color = defaultProps.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41M15.947 12.65a4 4 0 1 0-5.925-4.128" />
    <path d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 0 6H4a1 1 0 0 1-1-1z" />
  </svg>
)

export const OvercastIcon = ({ size = defaultProps.size, color = defaultProps.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
)

export const FogIcon = ({ size = defaultProps.size, color = defaultProps.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 15H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    <line x1="4" y1="19" x2="20" y2="19" />
    <line x1="6" y1="22" x2="18" y2="22" />
  </svg>
)

export const DrizzleIcon = ({ size = defaultProps.size, color = defaultProps.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 15H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    <line x1="8" y1="19" x2="8" y2="20" />
    <line x1="12" y1="19" x2="12" y2="20" />
    <line x1="16" y1="19" x2="16" y2="20" />
  </svg>
)

export const RainIcon = ({ size = defaultProps.size, color = defaultProps.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 15H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    <line x1="8" y1="19" x2="7" y2="22" />
    <line x1="12" y1="19" x2="11" y2="22" />
    <line x1="16" y1="19" x2="15" y2="22" />
  </svg>
)

export const SnowIcon = ({ size = defaultProps.size, color = defaultProps.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 15H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    <circle cx="8" cy="20" r="1" fill={color} stroke="none" />
    <circle cx="12" cy="20" r="1" fill={color} stroke="none" />
    <circle cx="16" cy="20" r="1" fill={color} stroke="none" />
  </svg>
)

export const ThunderstormIcon = ({ size = defaultProps.size, color = defaultProps.color }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 15H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    <polyline points="13 17 10 21 14 21 11 24" />
  </svg>
)

const iconMap = {
  'clear': ClearIcon,
  'partly-cloudy': PartlyCloudyIcon,
  'overcast': OvercastIcon,
  'fog': FogIcon,
  'drizzle': DrizzleIcon,
  'rain': RainIcon,
  'snow': SnowIcon,
  'thunderstorm': ThunderstormIcon,
} as const

export type WeatherIconName = keyof typeof iconMap

export const WeatherIcon = ({ name, size, color }: { name: WeatherIconName; size?: number; color?: string }) => {
  const Icon = iconMap[name]
  return <Icon size={size} color={color} />
}
