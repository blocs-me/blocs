import { useState } from 'react'
import Text from '@/design-system/Text'
import Button from '@/design-system/Button'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'

export const CopyWidgetButton = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      bg="brand.accent-1"
      color="background"
      borderRadius="sm"
      px="md"
      py="xs"
      fontSize="sm"
      fontWeight="bold"
      height="50px"
      onClick={handleCopy}
      minWidth="200px"
    >
      {copied ? 'Copied!' : 'Copy Widget URL'}
    </Button>
  )
}

export const StepCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    flex={1}
    px="sm"
    minWidth="200px"
  >
    <Flex
      size="48px"
      borderRadius="50%"
      bg="brand.accent-1"
      center
      mb="xs"
    >
      <Text fontSize="md" fontWeight="bold" color="background" m={0}>
        {number}
      </Text>
    </Flex>
    <Text fontSize="md" fontWeight="bold" color="foreground" m={0} mb="4px" textAlign="center">
      {title}
    </Text>
    <Text fontSize="sm" color="primary.accent-4" m={0} textAlign="center" lineHeight={1.5}>
      {description}
    </Text>
  </Flex>
)

export const BenefitCard = ({ title, description }: { title: string; description: string }) => (
  <Box
    flex={1}
    p="md"
    borderRadius="md"
    bg="primary.accent-2"
    minWidth="200px"
  >
    <Text fontSize="md" fontWeight="bold" color="foreground" m={0} mb="4px">
      {title}
    </Text>
    <Text fontSize="sm" color="primary.accent-4" m={0} lineHeight={1.5}>
      {description}
    </Text>
  </Box>
)

export const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <Box
    as="details"
    borderBottom="solid 1px"
    borderColor="primary.accent-1"
    py="sm"
    css={{
      '&[open] summary': { fontWeight: 600 },
      'summary': { cursor: 'pointer', listStyle: 'none' },
      'summary::-webkit-details-marker': { display: 'none' }
    }}
  >
    <Box as="summary">
      <Text fontSize="sm" fontWeight={500} color="foreground" m={0}>
        {question}
      </Text>
    </Box>
    <Text fontSize="sm" color="primary.accent-4" mt="xs" mb={0} lineHeight={1.6}>
      {answer}
    </Text>
  </Box>
)
