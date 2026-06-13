import { useMemo } from 'react'
import { computePlateLayout, shadeColor } from './useOnMyPlate'
import { OnMyPlateConfig } from './onMyPlateConfig'

type Props = Pick<
  OnMyPlateConfig,
  'title' | 'showTitle' | 'items' | 'theme' | 'plateStyle' | 'plateColor' | 'itemColor' | 'showCount'
>

function clamp(min: number, value: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function truncate(label: string, maxChars: number): string {
  const trimmed = label.trim()
  if (trimmed.length <= maxChars) return trimmed
  return `${trimmed.slice(0, Math.max(1, maxChars - 1))}…`
}

const OnMyPlateDisplay = ({
  title,
  showTitle = true,
  items,
  theme = 'light',
  plateStyle = 'ceramic',
  plateColor,
  itemColor,
  showCount = true
}: Props) => {
  const gradientId = useMemo(() => `plate-grad-${Math.random().toString(36).slice(2)}`, [])
  const { bubbles, statusText } = useMemo(
    () => computePlateLayout(items, itemColor),
    [items, itemColor]
  )

  const isDark = theme === 'dark'
  const bgColor = isDark ? '#1a1a1a' : '#ffffff'
  const titleColor = isDark ? '#cccccc' : '#666666'
  const captionColor = isDark ? '#9a9a9a' : '#888888'

  const rimColor = shadeColor(plateColor, -0.1)
  const plateShadow =
    plateStyle === 'minimal'
      ? 'none'
      : `drop-shadow(0 4px 12px rgba(0,0,0,${isDark ? 0.45 : 0.16}))`

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        minHeight: '200px',
        backgroundColor: bgColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '20px'
      }}
    >
      {showTitle && title && (
        <div
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: titleColor,
            marginBottom: '14px',
            letterSpacing: '0.3px',
            textAlign: 'center'
          }}
        >
          {title}
        </div>
      )}

      <div style={{ width: 'min(80%, 300px)', maxWidth: '100%', lineHeight: 0 }}>
        <svg viewBox="0 0 100 100" width="100%" role="img" aria-label={title || 'On my plate'}>
          <defs>
            <radialGradient id={gradientId} cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor={shadeColor(plateColor, 0.18)} />
              <stop offset="70%" stopColor={plateColor} />
              <stop offset="100%" stopColor={shadeColor(plateColor, -0.07)} />
            </radialGradient>
          </defs>

          <g style={{ filter: plateShadow }}>
            {plateStyle === 'ceramic' && (
              <>
                <circle cx="50" cy="50" r="48" fill={`url(#${gradientId})`} />
                <circle cx="50" cy="50" r="39" fill="none" stroke={rimColor} strokeWidth="0.7" opacity="0.55" />
              </>
            )}
            {plateStyle === 'matte' && (
              <>
                <circle cx="50" cy="50" r="48" fill={plateColor} />
                <circle cx="50" cy="50" r="39" fill="none" stroke={rimColor} strokeWidth="0.7" opacity="0.5" />
              </>
            )}
            {plateStyle === 'minimal' && (
              <>
                <circle cx="50" cy="50" r="47" fill="none" stroke={plateColor} strokeWidth="1.6" />
                <circle cx="50" cy="50" r="39" fill="none" stroke={plateColor} strokeWidth="0.6" opacity="0.4" />
              </>
            )}
          </g>

          {bubbles.length === 0 && (
            <text
              x="50"
              y="50"
              fill={captionColor}
              fontSize="4"
              textAnchor="middle"
              dominantBaseline="central"
            >
              Nothing here yet
            </text>
          )}

          {bubbles.map((bubble, i) => {
            const cx = bubble.x * 100
            const cy = bubble.y * 100
            const r = bubble.size * 50
            const showLabel = r >= 6.5
            const fontSize = clamp(2.6, r * 0.5, 4.4)
            const maxChars = Math.max(3, Math.round(r * 0.85))

            return (
              <g key={`${bubble.label}-${i}`}>
                <title>{bubble.label}</title>
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={bubble.color}
                  stroke="rgba(0,0,0,0.08)"
                  strokeWidth="0.4"
                />
                {showLabel && (
                  <text
                    x={cx}
                    y={cy}
                    fill={bubble.textColor}
                    fontSize={fontSize}
                    fontWeight={500}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {truncate(bubble.label, maxChars)}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {showCount && (
        <div
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: captionColor,
            marginTop: '14px',
            letterSpacing: '0.3px',
            textAlign: 'center'
          }}
        >
          {statusText}
        </div>
      )}
    </div>
  )
}

export default OnMyPlateDisplay
