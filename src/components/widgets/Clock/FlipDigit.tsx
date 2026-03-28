import { useEffect, useRef, useState } from 'react'

type Props = {
  digit: string
  color: string
  bgColor: string
}

const CARD_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '44px',
  height: '64px',
  perspective: '300px',
  overflow: 'hidden'
}

const HALF_STYLE: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  height: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backfaceVisibility: 'hidden'
}

const DIGIT_STYLE: React.CSSProperties = {
  fontSize: '48px',
  fontWeight: 700,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: '64px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
}

const FlipDigit = ({ digit, color, bgColor }: Props) => {
  const [displayDigit, setDisplayDigit] = useState(digit)
  const [prevDigit, setPrevDigit] = useState(digit)
  const [flipping, setFlipping] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (digit === displayDigit) return

    setPrevDigit(displayDigit)
    setFlipping(true)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setDisplayDigit(digit)
      setFlipping(false)
    }, 300)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [digit, displayDigit])

  const cardBg = bgColor === '#1a1a1a' ? '#252525' : '#f0f0f0'
  const dividerColor = bgColor === '#1a1a1a' ? '#1a1a1a' : '#d0d0d0'

  return (
    <div style={CARD_STYLE}>
      {/* Top half — static, shows current */}
      <div style={{
        ...HALF_STYLE,
        top: 0,
        borderRadius: '6px 6px 0 0',
        backgroundColor: cardBg
      }}>
        <span style={{ ...DIGIT_STYLE, color, position: 'relative', top: '50%' }}>
          {flipping ? prevDigit : displayDigit}
        </span>
      </div>

      {/* Bottom half — static, shows current */}
      <div style={{
        ...HALF_STYLE,
        bottom: 0,
        borderRadius: '0 0 6px 6px',
        backgroundColor: cardBg
      }}>
        <span style={{ ...DIGIT_STYLE, color, position: 'relative', top: '-50%' }}>
          {displayDigit}
        </span>
      </div>

      {/* Divider line */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        height: '1px',
        backgroundColor: dividerColor,
        zIndex: 3
      }} />

      {/* Flip flap — top half flipping down */}
      {flipping && (
        <div style={{
          ...HALF_STYLE,
          top: 0,
          borderRadius: '6px 6px 0 0',
          backgroundColor: cardBg,
          transformOrigin: 'bottom',
          animation: 'flipDown 0.3s ease-in forwards',
          zIndex: 2
        }}>
          <span style={{ ...DIGIT_STYLE, color, position: 'relative', top: '50%' }}>
            {prevDigit}
          </span>
        </div>
      )}

      <style>{`
        @keyframes flipDown {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-90deg); }
        }
      `}</style>
    </div>
  )
}

export default FlipDigit
