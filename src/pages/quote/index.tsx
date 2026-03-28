import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { configFromParams } from '@/widgets/Quote/quoteConfig'
import { useQuote } from '@/widgets/Quote/useQuote'
import QuoteDisplay from '@/widgets/Quote/QuoteDisplay'
import WidgetSettingsPopover from '@/widgets/Clock/WidgetSettingsPopover'

const QuotePage = () => {
  const router = useRouter()

  const config = useMemo(() => {
    if (!router.isReady) return null
    return configFromParams(new URLSearchParams(router.asPath.split('?')[1] || ''))
  }, [router.isReady, router.asPath])

  if (!config) return null

  return <QuoteWidget config={config} />
}

const QuoteWidget = ({ config }: { config: ReturnType<typeof configFromParams> }) => {
  const { quote, refresh } = useQuote({
    mode: config.mode,
    categories: config.categories,
    customQuotes: config.customQuotes
  })

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <WidgetSettingsPopover
        currentMode={config.mode}
        onModeChange={() => {}}
        modes={[]}
        dashboardPath="/dashboard/quote"
      />
      {config.mode === 'random' && (
        <button
          onClick={refresh}
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            zIndex: 10,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            opacity: 0.3,
            transition: 'opacity 0.2s',
            padding: '4px',
            fontSize: '16px'
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.3')}
          aria-label="New quote"
        >
          ↻
        </button>
      )}
      <QuoteDisplay
        text={quote.text}
        author={quote.author}
        showAuthor={config.showAuthor}
        fontSize={config.fontSize}
        textAlign={config.textAlign}
        theme={config.theme}
        quoteColor={config.quoteColor}
        authorColor={config.authorColor}
      />
    </div>
  )
}

export default QuotePage
