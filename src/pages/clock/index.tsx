import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { configFromParams } from '@/widgets/Clock/clockConfig'
import { useClock } from '@/widgets/Clock/useClock'
import { useTimer } from '@/widgets/Clock/useTimer'
import ClockDisplay from '@/widgets/Clock/ClockDisplay'
import TimerDisplay from '@/widgets/Clock/TimerDisplay'
import WidgetSettingsPopover from '@/widgets/Clock/WidgetSettingsPopover'
import type { ClockTimerMode } from '@/widgets/Clock/clockConfig'

const ClockPage = () => {
  const router = useRouter()

  const config = useMemo(() => {
    if (!router.isReady) return null
    return configFromParams(new URLSearchParams(router.asPath.split('?')[1] || ''))
  }, [router.isReady, router.asPath])

  if (!config) return null

  return <ClockWidget config={config} />
}

const ClockWidget = ({ config }: { config: ReturnType<typeof configFromParams> }) => {
  const [modeOverride, setModeOverride] = useState<ClockTimerMode | null>(null)
  const activeMode = modeOverride ?? config.mode

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <WidgetSettingsPopover
        currentMode={activeMode}
        onModeChange={(mode) => setModeOverride(mode as ClockTimerMode)}
      />
      {activeMode === 'clock' ? (
        <ClockModeWidget config={config} />
      ) : (
        <TimerModeWidget config={config} />
      )}
    </div>
  )
}

const ClockModeWidget = ({ config }: { config: ReturnType<typeof configFromParams> }) => {
  const clock = useClock({
    format: config.format,
    showSeconds: config.showSeconds,
    timezone: config.timezone,
    showDate: config.showDate,
    dateFormat: config.dateFormat
  })

  return (
    <ClockDisplay
      hours={clock.hours}
      minutes={clock.minutes}
      seconds={clock.seconds}
      ampm={clock.ampm}
      dateString={clock.dateString}
      timezoneLabel={clock.timezoneLabel}
      title={config.title}
      showTitle={config.showTitle}
      showDate={config.showDate}
      showTimezone={config.showTimezone}
      showSeconds={config.showSeconds}
      style={config.style}
      theme={config.theme}
      numberColor={config.numberColor}
      labelColor={config.labelColor}
    />
  )
}

const TimerModeWidget = ({ config }: { config: ReturnType<typeof configFromParams> }) => {
  const timer = useTimer({
    direction: config.direction,
    duration: config.duration,
    autoStart: config.autoStart
  })

  return (
    <TimerDisplay
      display={timer.display}
      isRunning={timer.isRunning}
      isFinished={timer.isFinished}
      onStart={timer.start}
      onPause={timer.pause}
      onReset={timer.reset}
      title={config.title}
      showTitle={config.showTitle}
      style={config.style}
      theme={config.theme}
      numberColor={config.numberColor}
      labelColor={config.labelColor}
    />
  )
}

export default ClockPage
