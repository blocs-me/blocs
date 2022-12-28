import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import fadeIn from '@/keyframes/fadeIn'

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
      <Text variant="p" m="auto">
        You can get access to this widget with the Premium version of blocs ✨
      </Text>
    </Flex>
  )
}

export default PremiumOverlay
