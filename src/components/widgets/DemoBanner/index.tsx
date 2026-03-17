import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Link from 'next/link'

const DemoBanner = () => {
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      width="100%"
      zIndex={1000}
      bg="foreground"
      py="xs"
      px="sm"
    >
      <Flex justifyContent="center" alignItems="center" css={{ gap: '0.5rem' }}>
        <Text fontSize="sm" color="background" m={0}>
          This is a demo.
        </Text>
        <Link href="/pricing" passHref>
          <Box
            as="a"
            fontSize="sm"
            color="brand.accent-3"
            fontWeight="bold"
            css={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            Get the full widget for your Notion workspace
          </Box>
        </Link>
      </Flex>
    </Box>
  )
}

export default DemoBanner
