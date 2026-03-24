import { useRouter } from 'next/router'
import CountdownDisplay from '@/widgets/Countdown/CountdownDisplay'
import { useCountdown } from '@/widgets/Countdown/useCountdown'
import { configFromParams } from '@/widgets/Countdown/countdownConfig'
import { useMemo } from 'react'

const CountdownPage = () => {
  const router = useRouter()

  const config = useMemo(() => {
    if (!router.isReady) return null
    return configFromParams(new URLSearchParams(router.asPath.split('?')[1] || ''))
  }, [router.isReady, router.asPath])

  if (!config) return null

  return <CountdownWidget config={config} />
}

const CountdownWidget = ({ config }: { config: ReturnType<typeof configFromParams> }) => {
  const endDate = useMemo(() => new Date(config.endDate), [config.endDate])

  const { parts, visibleUnits } = useCountdown({
    endDate,
    countUp: config.countUp,
    visibleUnits: config.visibleUnits ?? undefined
  })

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <CountdownDisplay
        title={config.title}
        showTitle={config.showTitle}
        parts={parts}
        visibleUnits={visibleUnits}
        numberColor={config.numberColor}
        labelColor={config.labelColor}
        theme={config.theme}
      />
    </div>
  )
}

export default CountdownPage
