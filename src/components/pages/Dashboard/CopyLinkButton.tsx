import { useState } from 'react'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import { CopyIcon } from 'src/icons/copy'
import Text from '@/design-system/Text'
import Button from '@/design-system/Button'
import Modal from '@/design-system/Modal'
import Box from '@/helpers/Box'
import useBlocsUser from '@/hooks/useBlocsUser'
import { isLifestylePro } from '@/lambda/helpers/subscriptionChecker'
import { postReq } from '@/utils/fetchingUtils'

const UpgradeModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const res = await postReq('/api/payments/checkout-lifetime')
      window.location.href = res.url
    } catch (err) {
      console.error(err)
      setIsLoading(false)
    }
  }

  return (
    <Modal visible={visible} hideModal={onClose}>
      <Flex flexDirection="column" css={{ gap: '12px' }} maxWidth="320px">
        <Text fontSize="md" fontWeight={700} color="foreground" m={0}>
          Upgrade to Blocs Pro
        </Text>
        <Text fontSize="sm" color="primary.accent-4" m={0} lineHeight={1.5}>
          Get lifetime access to all 9 widgets, full customization, analytics, and the ability to embed any widget in your Notion workspace.
        </Text>
        <Box
          borderRadius="sm"
          p="sm"
          bg="primary.accent-2"
          css={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
        >
          {['Unlock all 9 widgets', 'Full customization & custom durations', 'Analytics, streaks & progress charts', 'Remove Blocs branding'].map((item) => (
            <Text key={item} fontSize="xs" color="foreground" m={0}>
              ✓ &nbsp;{item}
            </Text>
          ))}
        </Box>
        <Button
          className="plausible-event-name=Checkout+Lifetime"
          width="100%"
          py="xs"
          borderRadius="md"
          fontSize="sm"
          bg="brand.accent-1"
          color="neutral.white"
          onClick={handleCheckout}
          loading={isLoading}
          disabled={isLoading}
        >
          Get Blocs Pro — $17
        </Button>
        <Text fontSize="xxs" color="primary.accent-4" m={0} textAlign="center">
          One-time payment · No subscription
        </Text>
      </Flex>
    </Modal>
  )
}

const CopyLinkButton = ({ url, disabled = false }: { url: string; disabled?: boolean }) => {
  const [copied, setCopied] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const { purchases } = useBlocsUser()
  const isPro = isLifestylePro(purchases)

  const handleClick = () => {
    if (!isPro) {
      setShowUpgrade(true)
      return
    }
    if (!url || disabled) return
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Flex
        as="button"
        alignItems="center"
        px="sm"
        py="xs"
        borderRadius="md"
        bg={copied ? 'success.medium' : 'brand.accent-1'}
        color="neutral.white"
        css={{
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          gap: '6px',
          fontSize: '13px',
          fontWeight: 600,
          transition: 'all 0.15s ease',
          opacity: disabled ? 0.5 : 1,
          '&:hover': { opacity: disabled ? 0.5 : 0.85 }
        }}
        onClick={handleClick}
      >
        <Icon fill="neutral.white" width="14px" height="14px" display="flex" as="span" stroke="neutral.white">
          <CopyIcon />
        </Icon>
        <Text as="span" fontSize="xs" color="neutral.white" m={0} fontWeight={600}>
          {copied ? 'Copied!' : 'Copy Link'}
        </Text>
      </Flex>
      <UpgradeModal visible={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </>
  )
}

export default CopyLinkButton
