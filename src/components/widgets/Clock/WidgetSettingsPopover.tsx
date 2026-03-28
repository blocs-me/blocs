import { useState, useRef, useEffect } from 'react'

type ModeOption = {
  value: string
  label: string
}

type Props = {
  currentMode: string
  onModeChange: (mode: string) => void
  modes?: ModeOption[]
  dashboardPath?: string
}

const DEFAULT_MODES: ModeOption[] = [
  { value: 'clock', label: 'Clock' },
  { value: 'timer', label: 'Timer' }
]

const WidgetSettingsPopover = ({
  currentMode,
  onModeChange,
  modes = DEFAULT_MODES,
  dashboardPath = '/dashboard/clock'
}: Props) => {
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div ref={popoverRef} style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10 }}>
      <button
        onClick={() => setOpen(prev => !prev)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          opacity: 0.3,
          transition: 'opacity 0.2s',
          padding: '4px',
          lineHeight: 1
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={e => { if (!open) e.currentTarget.style.opacity = '0.3' }}
        aria-label="Widget settings"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '28px',
          right: 0,
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          minWidth: '160px',
          fontSize: '13px'
        }}>
          <div style={{ padding: '4px 8px', color: '#888', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            View
          </div>
          {modes.map(mode => (
            <button
              key={mode.value}
              onClick={() => { onModeChange(mode.value); setOpen(false) }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '6px 8px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: currentMode === mode.value ? '#f0f0f0' : 'transparent',
                fontWeight: currentMode === mode.value ? 600 : 400,
                color: '#333',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              {mode.label}
            </button>
          ))}
          <div style={{ height: '1px', backgroundColor: '#e0e0e0', margin: '6px 0' }} />
          <a
            href={dashboardPath}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '6px 8px',
              color: '#666',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '13px'
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Customize in Dashboard →
          </a>
        </div>
      )}
    </div>
  )
}

export default WidgetSettingsPopover
