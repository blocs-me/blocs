import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import fadeIn from '@/keyframes/fadeIn'
import Box from '@/helpers/Box'
import Button from '@/design-system/Button'
import Link from 'next/link'

const PremiumOverlay = () => {
  return (
    <Flex
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="rgba(0,0,0,0.2)"
      css={{
        backdropFilter: 'blur(5px) saturate(50%)',
        animation: `${fadeIn} 1.5s ease forwards`
      }}
    >
      <Box
        m="auto"
        p="md"
        borderRadius="md"
        bg="background"
        boxShadow="default"
        maxWidth="450px"
        css={{ textAlign: 'center' }}
      >
        <Text variant="p" m="auto">
          You can get access to this widget with the Premium version of blocs ✨
        </Text>
        <Box mt="md" />
        <Link href="/pricing">
          <Button variant="primary" borderRadius={'sm'} as="a">
            See Pricing Plans
          </Button>
        </Link>
      </Box>
    </Flex>
  )
}

export default PremiumOverlay
