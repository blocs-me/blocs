import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'
import { useRouter } from 'next/router'

const ProGate = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  return (
    <Box position="relative">
      {children}
      <Flex
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        css={{
          cursor: 'pointer',
          zIndex: 10
        }}
        onClick={() => router.push('/pricing')}
      >
        <Flex
          m="auto"
          px="md"
          py="sm"
          borderRadius="md"
          bg="background"
          boxShadow="lg"
          border="1px solid"
          borderColor="primary.accent-2"
          flexDirection="column"
          alignItems="center"
          css={{ textAlign: 'center', maxWidth: '320px' }}
        >
          <Text fontSize="sm" fontWeight={600} color="foreground" m={0} mb="xxs">
            Upgrade to Pro
          </Text>
          <Text fontSize="xs" color="primary.accent-4" m={0} lineHeight={1.5}>
            Get full access to customize widgets, copy embed links, and view analytics.
          </Text>
          <Box
            mt="xs"
            px="sm"
            py="xxs"
            borderRadius="sm"
            bg="brand.accent-1"
            color="neutral.white"
            css={{ fontSize: '12px', fontWeight: 600 }}
          >
            See Pricing
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default ProGate
