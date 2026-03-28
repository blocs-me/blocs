import { useState, useEffect } from 'react'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import QuoteDisplay from '@/widgets/Quote/QuoteDisplay'
import QuoteSettings from '@/widgets/Quote/QuoteSettings'
import { useQuote } from '@/widgets/Quote/useQuote'
import { QuoteWidgetConfig, getDefaultConfig, configToEmbedUrl } from '@/widgets/Quote/quoteConfig'
import CopyLinkButton from '../CopyLinkButton'
import HowToEmbedButton from '../HowToEmbedButton'
import storage from '@/utils/storage'

const STORAGE_KEY = 'quoteConfig'

function loadConfig(): QuoteWidgetConfig {
  try {
    const saved = storage.getItem(STORAGE_KEY)
    if (saved) return { ...getDefaultConfig(), ...JSON.parse(saved) }
  } catch {}
  return getDefaultConfig()
}

const QuoteDashboard = () => {
  const [config, setConfig] = useState<QuoteWidgetConfig>(loadConfig)

  useEffect(() => {
    storage.setItem(STORAGE_KEY, JSON.stringify(config))
  }, [config])

  const handleChange = (updates: Partial<QuoteWidgetConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  const { quote, refresh } = useQuote({
    mode: config.mode,
    categories: config.categories,
    customQuotes: config.customQuotes
  })

  const embedUrl = configToEmbedUrl(config)

  return (
    <Flex css={{ gap: '24px' }}>
      <Box css={{ flex: '1 1 0', minWidth: 0 }}>
        <Flex justifyContent="space-between" alignItems="center" mb="sm">
          <Text as="h2" fontSize="lg" fontWeight={700} color="foreground" m={0}>
            Quote of the Day
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
        </Box>

        {config.mode === 'random' && (
          <Box
            as="button"
            px="sm"
            py="xs"
            borderRadius="sm"
            bg="primary.accent-2"
            color="foreground"
            css={{
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              '&:hover': { opacity: 0.7 }
            }}
            onClick={refresh}
          >
            New Quote
          </Box>
        )}
      </Box>

      <Box
        css={{ flex: '0 0 300px', alignSelf: 'flex-start' }}
        p="sm"
        borderRadius="md"
        border="1px solid"
        borderColor="primary.accent-2"
      >
        <QuoteSettings config={config} onChange={handleChange} />
      </Box>
    </Flex>
  )
}

export default QuoteDashboard
