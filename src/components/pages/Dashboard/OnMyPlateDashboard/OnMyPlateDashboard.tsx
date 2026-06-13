import { useState, useEffect } from 'react'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import OnMyPlateDisplay from '@/widgets/OnMyPlate/OnMyPlateDisplay'
import OnMyPlateSettings from '@/widgets/OnMyPlate/OnMyPlateSettings'
import { OnMyPlateConfig, getDefaultConfig, configToEmbedUrl } from '@/widgets/OnMyPlate/onMyPlateConfig'
import CopyLinkButton from '../CopyLinkButton'
import HowToEmbedButton from '../HowToEmbedButton'
import NewWidgetButton from '../NewWidgetButton'
import storage from '@/utils/storage'

const STORAGE_KEY = 'onMyPlateConfig'

function loadConfig(): OnMyPlateConfig {
  try {
    const saved = storage.getItem(STORAGE_KEY)
    if (saved) return { ...getDefaultConfig(), ...JSON.parse(saved) }
  } catch {}
  return getDefaultConfig()
}

const OnMyPlateDashboard = () => {
  const [config, setConfig] = useState<OnMyPlateConfig>(loadConfig)

  useEffect(() => {
    storage.setItem(STORAGE_KEY, JSON.stringify(config))
  }, [config])

  const handleChange = (updates: Partial<OnMyPlateConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }

  const embedUrl = configToEmbedUrl(config)

  return (
    <Flex css={{ gap: '24px' }}>
      <Box css={{ flex: '1 1 0', minWidth: 0 }}>
        <Flex justifyContent="space-between" alignItems="center" mb="sm">
          <Text as="h2" fontSize="lg" fontWeight={700} color="foreground" m={0}>
            On My Plate
          </Text>
          <Flex css={{ gap: '8px' }} alignItems="center">
            <NewWidgetButton onClick={() => setConfig(getDefaultConfig())} />
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
          minHeight="320px"
          css={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <OnMyPlateDisplay
            title={config.title}
            showTitle={config.showTitle}
            items={config.items}
            theme={config.theme}
            plateStyle={config.plateStyle}
            plateColor={config.plateColor}
            itemColor={config.itemColor}
            showCount={config.showCount}
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
        <OnMyPlateSettings config={config} onChange={handleChange} />
      </Box>
    </Flex>
  )
}

export default OnMyPlateDashboard
