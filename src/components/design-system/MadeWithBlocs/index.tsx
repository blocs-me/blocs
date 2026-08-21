import { useTheme } from '@emotion/react'
import type { Theme } from 'src/styles/theme'

type Props = {
  // Destination for the CTA. Defaults to the marketing home; widget pages
  // pass their specific landing page to send visitors somewhere relevant.
  href?: string
  label?: string
  // Pin to the bottom-center of the viewport instead of sitting in normal
  // flow. Used by full-viewport widgets (clock, countdown, etc.) whose display
  // fills the height, leaving no in-flow room below.
  floating?: boolean
}

/**
 * Clickable "Make your own → blocs.me" call-to-action shown on free-tier
 * widgets. The free-tier branding is the product's acquisition loop (widgets
 * embedded in public Notion pages), so this is a visible, hover-affordant
 * link rather than a passive watermark.
 */
const MadeWithBlocs = ({ href = 'https://blocs.me', label = 'Make your own', floating = false }: Props) => {
  const theme = useTheme() as Theme

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      css={{
        display: 'block',
        textAlign: 'center',
        fontSize: '10px',
        fontWeight: 500,
        color: theme.colors.primary['accent-4'],
        textDecoration: 'none',
        transition: 'color 0.15s ease',
        cursor: 'pointer',
        '&:hover': {
          color: theme.colors.brand['accent-1'],
          textDecoration: 'underline'
        },
        ...(floating
          ? { position: 'fixed', bottom: '6px', left: 0, right: 0, zIndex: 20 }
          : { marginTop: '8px' })
      }}
    >
      {label} → blocs.me
    </a>
  )
}

export default MadeWithBlocs
