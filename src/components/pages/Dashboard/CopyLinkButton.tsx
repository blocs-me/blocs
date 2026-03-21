import { useState } from 'react'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import { CopyIcon } from 'src/icons/copy'
import Text from '@/design-system/Text'

const CopyLinkButton = ({ url, disabled = false }: { url: string; disabled?: boolean }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!url || disabled) return
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
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
      onClick={handleCopy}
    >
      <Icon fill="neutral.white" width="14px" height="14px" display="flex" as="span" stroke="neutral.white">
        <CopyIcon />
      </Icon>
      <Text as="span" fontSize="xs" color="neutral.white" m={0} fontWeight={600}>
        {copied ? 'Copied!' : 'Copy Link'}
      </Text>
    </Flex>
  )
}

export default CopyLinkButton
