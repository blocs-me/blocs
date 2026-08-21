import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { configFromParams, ProgressWidgetConfig } from '@/widgets/ProgressBar/progressBarConfig'
import ProgressBarDisplay, { CalendarDisplay } from '@/widgets/ProgressBar/ProgressBarDisplay'
import ProgressBarControls from '@/widgets/ProgressBar/ProgressBarControls'
import { useManualProgress, useDateRangeProgress, useCalendarProgress } from '@/widgets/ProgressBar/useProgressBar'
import MadeWithBlocs from '@/design-system/MadeWithBlocs'

const ProgressBarPage = () => {
  const router = useRouter()

  const config = useMemo(() => {
    if (!router.isReady) return null
    return configFromParams(new URLSearchParams(router.asPath.split('?')[1] || ''))
  }, [router.isReady, router.asPath])

  if (!config) return null

  return (
    <>
      <Head><meta name="robots" content="noindex" /></Head>
      <ProgressBarWidget config={config} />
    </>
  )
}

const ProgressBarWidget = ({ config }: { config: ProgressWidgetConfig }) => {
  const widget =
    config.mode === 'manual' ? <ManualWidget config={config} /> :
    config.mode === 'dateRange' ? <DateRangeWidget config={config} /> :
    <CalendarWidget config={config} />

  return (
    <>
      {widget}
      <MadeWithBlocs floating href="https://blocs.me/progress-bar-widget" />
    </>
  )
}

const ManualWidget = ({ config }: { config: ProgressWidgetConfig }) => {
  const { current, percentage, increment, decrement } = useManualProgress(config)

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <ProgressBarDisplay
        style={config.style}
        percentage={percentage}
        title={config.title}
        showTitle={config.showTitle}
        fillColor={config.fillColor}
        theme={config.theme}
        current={current}
        total={config.total}
        showValue
      />
      <ProgressBarControls
        current={current}
        onIncrement={increment}
        onDecrement={decrement}
        theme={config.theme}
        fillColor={config.fillColor}
      />
    </div>
  )
}

const DateRangeWidget = ({ config }: { config: ProgressWidgetConfig }) => {
  const { percentage } = useDateRangeProgress(config)

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <ProgressBarDisplay
        style={config.style}
        percentage={percentage}
        title={config.title}
        showTitle={config.showTitle}
        fillColor={config.fillColor}
        theme={config.theme}
      />
    </div>
  )
}

const CalendarWidget = ({ config }: { config: ProgressWidgetConfig }) => {
  const progress = useCalendarProgress()

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <CalendarDisplay
        style={config.style}
        progress={progress}
        calendarBars={config.calendarBars}
        title={config.title}
        showTitle={config.showTitle}
        fillColor={config.fillColor}
        theme={config.theme}
      />
    </div>
  )
}

export default ProgressBarPage
