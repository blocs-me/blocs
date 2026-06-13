import { useEffect, useMemo, useState } from 'react'
import { computePlateLayout, shadeColor } from './useOnMyPlate'
import { OnMyPlateConfig } from './onMyPlateConfig'

type Props = Pick<
  OnMyPlateConfig,
  'title' | 'showTitle' | 'items' | 'theme' | 'plateStyle' | 'plateColor' | 'itemColor' | 'showCount'
>

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
  const { bubbles, statusText } = useMemo(
    () => computePlateLayout(items, itemColor),
    [items, itemColor]
  )

  // Tap a bubble to read its full label in the caption below (works on touch,
  // where hover tooltips don't). Tapping again clears it.
  const [selected, setSelected] = useState<number | null>(null)
  useEffect(() => setSelected(null), [bubbles.length])

  const isDark = theme === 'dark'
  const bgColor = isDark ? '#1a1a1a' : '#ffffff'
  const titleColor = isDark ? '#cccccc' : '#666666'
  const captionColor = isDark ? '#9a9a9a' : '#888888'
  const rimColor = shadeColor(plateColor, -0.1)

  const plateBackground =
    plateStyle === 'ceramic'
      ? `radial-gradient(circle at 32% 28%, ${shadeColor(plateColor, 0.18)}, ${plateColor} 68%, ${shadeColor(plateColor, -0.07)} 100%)`
      : plateStyle === 'matte'
        ? plateColor
        : 'transparent'

  const plateShadow =
    plateStyle === 'minimal'
      ? 'none'
      : `0 6px 18px rgba(0,0,0,${isDark ? 0.5 : 0.16})`

  const selectedLabel = selected !== null ? bubbles[selected]?.label : undefined
  const caption = selectedLabel ?? (showCount ? statusText : undefined)

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

      <div
        style={{
          position: 'relative',
          width: 'min(86%, 320px)',
          aspectRatio: '1 / 1',
          margin: '0 auto',
          // Lets the bubble text scale with the plate via cqmin units.
          containerType: 'size'
        } as React.CSSProperties}
      >
        {/* Plate */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: plateBackground,
            border: plateStyle === 'minimal' ? `2px solid ${plateColor}` : 'none',
            boxShadow: plateShadow
          }}
        />
        {/* Inner rim */}
        <div
          style={{
            position: 'absolute',
            inset: '18%',
            borderRadius: '50%',
            border: `1.5px solid ${plateStyle === 'minimal' ? plateColor : rimColor}`,
            opacity: plateStyle === 'minimal' ? 0.35 : 0.5,
            pointerEvents: 'none'
          }}
        />

        {bubbles.length === 0 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: captionColor,
              fontSize: '6cqmin',
              textAlign: 'center',
              padding: '0 20%'
            }}
          >
            Nothing here yet
          </div>
        )}

        {bubbles.map((bubble, i) => {
          const diameterCq = bubble.size * 100
          const showLabel = diameterCq >= 8.5
          const fontSize = Math.max(2.8, diameterCq * 0.16)
          const isSelected = selected === i

          return (
            <button
              key={`${bubble.label}-${i}`}
              type="button"
              title={bubble.label}
              aria-label={bubble.label}
              onClick={() => setSelected((prev) => (prev === i ? null : i))}
              style={{
                position: 'absolute',
                left: `${bubble.x * 100}%`,
                top: `${bubble.y * 100}%`,
                width: `${diameterCq}%`,
                height: `${diameterCq}%`,
                transform: `translate(-50%, -50%) scale(${isSelected ? 1.08 : 1})`,
                borderRadius: '50%',
                border: 'none',
                padding: '0 6%',
                background: bubble.color,
                color: bubble.textColor,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                boxShadow: isSelected
                  ? `0 0 0 2px ${bgColor}, 0 0 0 4px ${bubble.color}, 0 4px 10px rgba(0,0,0,0.2)`
                  : '0 1px 3px rgba(0,0,0,0.16)',
                transition: 'transform 0.12s ease, box-shadow 0.12s ease',
                zIndex: isSelected ? 2 : 1,
                fontFamily: 'inherit'
              }}
            >
              {showLabel && (
                <span
                  style={{
                    fontSize: `${fontSize}cqmin`,
                    fontWeight: 600,
                    lineHeight: 1.1,
                    maxWidth: '100%',
                    minWidth: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {bubble.label}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {(caption || showCount) && (
        <div
          style={{
            fontSize: '12px',
            fontWeight: selectedLabel ? 600 : 500,
            color: selectedLabel ? titleColor : captionColor,
            marginTop: '14px',
            minHeight: '16px',
            maxWidth: '90%',
            letterSpacing: '0.3px',
            textAlign: 'center'
          }}
        >
          {caption}
        </div>
      )}
    </div>
  )
}

export default OnMyPlateDisplay
