import { useState, useEffect, useMemo } from 'react'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import ProgressBarDisplay, { CalendarDisplay } from '@/widgets/ProgressBar/ProgressBarDisplay'
import ProgressBarControls from '@/widgets/ProgressBar/ProgressBarControls'
import ProgressBarSettings from '@/widgets/ProgressBar/ProgressBarSettings'
import { useManualProgress, useDateRangeProgress, useCalendarProgress } from '@/widgets/ProgressBar/useProgressBar'
import { ProgressWidgetConfig, getDefaultConfig, configToEmbedUrl } from '@/widgets/ProgressBar/progressBarConfig'
import CopyLinkButton from '../CopyLinkButton'
import HowToEmbedButton from '../HowToEmbedButton'
import storage from '@/utils/storage'

const STORAGE_KEY = 'progressBarConfig'

function loadConfig(): ProgressWidgetConfig {
  try {
    const saved = storage.getItem(STORAGE_KEY)
    if (saved) return { ...getDefaultConfig(), ...JSON.parse(saved) }
  } catch {}
  return getDefaultConfig()
}

const ManualPreview = ({ config }: { config: ProgressWidgetConfig }) => {
  const { current, percentage, increment, decrement } = useManualProgress(config)
  return (
    <>
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
    </>
  )
}

const DateRangePreview = ({ config }: { config: ProgressWidgetConfig }) => {
  const { percentage } = useDateRangeProgress(config)
  return (
    <ProgressBarDisplay
      style={config.style}
      percentage={percentage}
      title={config.title}
      showTitle={config.showTitle}
      fillColor={config.fillColor}
      theme={config.theme}
    />
  )
}

const CalendarPreview = ({ config }: { config: ProgressWidgetConfig }) => {
  const progress = useCalendarProgress()
  return (
    <CalendarDisplay
      style={config.style}
      progress={progress}
      calendarBars={config.calendarBars}
      title={config.title}
      showTitle={config.showTitle}
      fillColor={config.fillColor}
      theme={config.theme}
    />
  )
}

const ProgressBarDashboard = () => {
  const [config, setConfig] = useState<ProgressWidgetConfig>(loadConfig)

  useEffect(() => {
    storage.setItem(STORAGE_KEY, JSON.stringify(config))
  }, [config])

  const handleChange = (updates: Partial<ProgressWidgetConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  const embedUrl = configToEmbedUrl(config)

  return (
    <Flex css={{ gap: '24px' }}>
      <Box css={{ flex: '1 1 0', minWidth: 0 }}>
        <Flex justifyContent="space-between" alignItems="center" mb="sm">
          <Text as="h2" fontSize="lg" fontWeight={700} color="foreground" m={0}>
            Progress Bar
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
          minHeight="280px"
          css={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {config.mode === 'manual' && <ManualPreview config={config} />}
          {config.mode === 'dateRange' && <DateRangePreview config={config} />}
          {config.mode === 'calendar' && <CalendarPreview config={config} />}
        </Box>
      </Box>

      <Box
        css={{ flex: '0 0 300px', alignSelf: 'flex-start' }}
        p="sm"
        borderRadius="md"
        border="1px solid"
        borderColor="primary.accent-2"
      >
        <ProgressBarSettings config={config} onChange={handleChange} />
      </Box>
    </Flex>
  )
}

export default ProgressBarDashboard
