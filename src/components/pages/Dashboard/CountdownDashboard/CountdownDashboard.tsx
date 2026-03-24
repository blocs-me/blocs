import { useState, useEffect, useMemo } from 'react'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import CountdownDisplay from '@/widgets/Countdown/CountdownDisplay'
import CountdownSettings from '@/widgets/Countdown/CountdownSettings'
import { useCountdown, autoDetectUnits, computeCountdown } from '@/widgets/Countdown/useCountdown'
import { CountdownWidgetConfig, getDefaultConfig, configToEmbedUrl } from '@/widgets/Countdown/countdownConfig'
import CopyLinkButton from '../CopyLinkButton'
import HowToEmbedButton from '../HowToEmbedButton'
import storage from '@/utils/storage'

const STORAGE_KEY = 'countdownConfig'

function loadConfig(): CountdownWidgetConfig {
  try {
    const saved = storage.getItem(STORAGE_KEY)
    if (saved) return { ...getDefaultConfig(), ...JSON.parse(saved) }
  } catch {}
  return getDefaultConfig()
}

const CountdownDashboard = () => {
  const [config, setConfig] = useState<CountdownWidgetConfig>(loadConfig)

  useEffect(() => {
    storage.setItem(STORAGE_KEY, JSON.stringify(config))
  }, [config])

  const handleChange = (updates: Partial<CountdownWidgetConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  const endDate = useMemo(() => new Date(config.endDate), [config.endDate])
  const autoUnits = useMemo(() => {
    const result = computeCountdown(new Date(), endDate, config.countUp)
    return autoDetectUnits(result.parts)
  }, [endDate, config.countUp])

  const { parts, visibleUnits } = useCountdown({
    endDate,
    countUp: config.countUp,
    visibleUnits: config.visibleUnits ?? undefined
  })

  const embedUrl = configToEmbedUrl(config)

  return (
    <Flex css={{ gap: '24px' }}>
      <Box css={{ flex: '1 1 0', minWidth: 0 }}>
        <Flex justifyContent="space-between" alignItems="center" mb="sm">
          <Text as="h2" fontSize="lg" fontWeight={700} color="foreground" m={0}>
            Countdown Timer
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
          <CountdownDisplay
            title={config.title}
            showTitle={config.showTitle}
            parts={parts}
            visibleUnits={visibleUnits}
            numberColor={config.numberColor}
            labelColor={config.labelColor}
            theme={config.theme}
          />
        </Box>

      </Box>

      <Box
        css={{ flex: '0 0 300px', alignSelf: 'flex-start' }}
        p="sm"
        borderRadius="md"
        border="1px solid"
        borderColor="primary.accent-2"
      >
        <CountdownSettings
          config={config}
          autoUnits={autoUnits}
          onChange={handleChange}
        />
      </Box>
    </Flex>
  )
}

export default CountdownDashboard
