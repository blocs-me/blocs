type Props = {
  current: number
  onIncrement: () => void
  onDecrement: () => void
  theme?: 'light' | 'dark'
  fillColor?: string
}

const ProgressBarControls = ({ current, onIncrement, onDecrement, theme = 'light', fillColor }: Props) => {
  const isDark = theme === 'dark'
  const bgColor = isDark ? '#1a1a1a' : '#ffffff'
  const btnBg = isDark ? '#333333' : '#f0f0f0'
  const btnHover = isDark ? '#444444' : '#e0e0e0'
  const textColor = isDark ? '#ffffff' : '#333333'
  const accentColor = fillColor || '#4CAF50'

  const btnStyle: React.CSSProperties = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: btnBg,
    color: textColor,
    fontSize: '18px',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.15s ease'
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '8px 20px 16px',
      backgroundColor: bgColor,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <button
        onClick={onDecrement}
        style={btnStyle}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = btnHover)}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = btnBg)}
        aria-label="Decrease"
      >
        -
      </button>
      <span style={{
        fontSize: '20px',
        fontWeight: 700,
        color: accentColor,
        minWidth: '60px',
        textAlign: 'center',
        fontVariantNumeric: 'tabular-nums'
      }}>
        {current}
      </span>
      <button
        onClick={onIncrement}
        style={btnStyle}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = btnHover)}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = btnBg)}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  )
}

export default ProgressBarControls
