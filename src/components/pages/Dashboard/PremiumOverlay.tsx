import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import fadeIn from '@/keyframes/fadeIn'
import Box from '@/helpers/Box'
import Button from '@/design-system/Button'
import Link from 'next/link'
import float from '@/keyframes/float'
import Sparkles from '@/design-system/Sparkles'

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
        <Text fontSize="sm" m="auto" color="brand.accent-1">
          You can get access to this widget and all features with the Premium
          version of blocs ✨
        </Text>
        <Box mt="md" />
        <Box
          width="fit-content"
          height="fit-content"
          bg="background"
          borderRadius="sm"
          m="0 auto"
          css={{ animation: `${float} 1s ease-in-out alternate infinite` }}
          boxShadow="default"
        >
          <Sparkles duration={600}>
            <Link href="/pricing">
              <Button variant="primary" borderRadius={'sm'} as="a">
                See Pricing Plans
              </Button>
            </Link>
          </Sparkles>
        </Box>
      </Box>
    </Flex>
  )
}

export default PremiumOverlay
