type Props = {
  text: string
  author: string
  showAuthor: boolean
  fontSize: 'sm' | 'md' | 'lg'
  textAlign: 'left' | 'center'
  theme: 'light' | 'dark'
  quoteColor?: string
  authorColor?: string
}

const FONT_SIZES = { sm: '16px', md: '22px', lg: '30px' }

const QuoteDisplay = ({
  text,
  author,
  showAuthor,
  fontSize,
  textAlign,
  theme,
  quoteColor,
  authorColor
}: Props) => {
  const isDark = theme === 'dark'
  const bgColor = isDark ? '#1a1a1a' : '#ffffff'
  const qColor = quoteColor || (isDark ? '#e0e0e0' : '#333333')
  const aColor = authorColor || (isDark ? '#888888' : '#999999')
  const decorColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: textAlign === 'center' ? 'center' : 'flex-start',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      minHeight: '120px',
      backgroundColor: bgColor,
      fontFamily: 'Georgia, "Times New Roman", serif',
      padding: '32px 28px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative quote mark */}
      <div style={{
        position: 'absolute',
        top: '8px',
        left: textAlign === 'center' ? '50%' : '20px',
        transform: textAlign === 'center' ? 'translateX(-50%)' : 'none',
        fontSize: '120px',
        fontFamily: 'Georgia, serif',
        color: decorColor,
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none'
      }}>
        &ldquo;
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign,
        maxWidth: '500px'
      }}>
        <p style={{
          fontSize: FONT_SIZES[fontSize],
          fontWeight: 400,
          color: qColor,
          lineHeight: 1.5,
          margin: 0,
          fontStyle: 'italic'
        }}>
          &ldquo;{text}&rdquo;
        </p>

        {showAuthor && author && (
          <p style={{
            fontSize: '14px',
            fontWeight: 500,
            color: aColor,
            margin: '12px 0 0',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontStyle: 'normal'
          }}>
            — {author}
          </p>
        )}
      </div>
    </div>
  )
}

export default QuoteDisplay
