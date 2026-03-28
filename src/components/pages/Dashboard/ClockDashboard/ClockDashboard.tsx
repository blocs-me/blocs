import { useState, useEffect } from 'react'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import ClockDisplay from '@/widgets/Clock/ClockDisplay'
import TimerDisplay from '@/widgets/Clock/TimerDisplay'
import ClockTimerSettings from '@/widgets/Clock/ClockTimerSettings'
import { useClock } from '@/widgets/Clock/useClock'
import { useTimer } from '@/widgets/Clock/useTimer'
import { ClockTimerWidgetConfig, getDefaultConfig, configToEmbedUrl } from '@/widgets/Clock/clockConfig'
import CopyLinkButton from '../CopyLinkButton'
import HowToEmbedButton from '../HowToEmbedButton'
import storage from '@/utils/storage'

const STORAGE_KEY = 'clockConfig'

function loadConfig(): ClockTimerWidgetConfig {
  try {
    const saved = storage.getItem(STORAGE_KEY)
    if (saved) return { ...getDefaultConfig(), ...JSON.parse(saved) }
  } catch {}
  return getDefaultConfig()
}

const ClockDashboard = () => {
  const [config, setConfig] = useState<ClockTimerWidgetConfig>(loadConfig)

  useEffect(() => {
    storage.setItem(STORAGE_KEY, JSON.stringify(config))
  }, [config])

  const handleChange = (updates: Partial<ClockTimerWidgetConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  const embedUrl = configToEmbedUrl(config)

  return (
    <Flex css={{ gap: '24px' }}>
      <Box css={{ flex: '1 1 0', minWidth: 0 }}>
        <Flex justifyContent="space-between" alignItems="center" mb="sm">
          <Text as="h2" fontSize="lg" fontWeight={700} color="foreground" m={0}>
            {config.mode === 'clock' ? 'Clock' : 'Timer'}
          </Text>
          <Flex css={{ gap: '8px' }} alignItems="center">
            <HowToEmbedButton />
            <CopyLinkButton url={embedUrl} />
          </Flex>
        </Flex>

        <Box
          borderRadius="md"
          border="1px solid"
          borderColor="primary.accent-2"
          overflow="hidden"
          mb="md"
          minHeight="280px"
          css={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {config.mode === 'clock' ? (
            <ClockPreview config={config} />
          ) : (
            <TimerPreview config={config} />
          )}
        </Box>
      </Box>

      <Box
        css={{ flex: '0 0 300px', alignSelf: 'flex-start' }}
        p="sm"
        borderRadius="md"
        border="1px solid"
        borderColor="primary.accent-2"
      >
        <ClockTimerSettings config={config} onChange={handleChange} />
      </Box>
    </Flex>
  )
}

const ClockPreview = ({ config }: { config: ClockTimerWidgetConfig }) => {
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

const TimerPreview = ({ config }: { config: ClockTimerWidgetConfig }) => {
  const timer = useTimer({
    direction: config.direction,
    duration: config.duration,
    autoStart: false
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

export default ClockDashboard
