import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import float from '@/keyframes/float'
import SlideIn from '../SlideIn'
import SwipeAnim from '../SwipeAnim'
import HeartAnim from './HeartAnim'

const IntroText = ({
  setNext,
  pause
}: {
  setNext: () => void
  pause: boolean
}) => {
  return (
    <SwipeAnim delayEnd={3} setNext={setNext} pauseAtEnd={pause}>
      <Flex
        flexDirection="column"
        color="foreground"
        width={['300px', , , '400px']}
        alignItems="center"
      >
        <SlideIn>
          <Text fontSize={['md', , , 'lg']} mb={0} textAlign="center">
            Track all your habits
          </Text>
        </SlideIn>

        <SlideIn delay={0.2}>
          <Flex flexDirection="column" alignItems={'center'} mt="-5px">
            <Text fontSize={['md', , , 'lg']} mb={0} textAlign="center">
              with{' '}
              <Box as="span" color="brand.accent-1">
                blocs
              </Box>{' '}
              widgets inside 👇{' '}
            </Text>
          </Flex>
        </SlideIn>

        <Box position="relative">
          <SlideIn delay={0.4}>
            <Box
              display="inline-flex"
              as="span"
              css={{
                alignItems: 'center',
                animation: `${float} 1s ease-in-out alternate infinite`
              }}
              mt="xs"
              position="relative"
            >
              <Box
                display="inline-flex"
                as="img"
                src="/notion-logo.png"
                size="50px"
                mr="xs"
                alt="Notion Logo"
              />
              <Text fontSize={['md', , , 'lg']} fontWeight="bold" mb={0}>
                Notion
              </Text>
            </Box>
            <Box position="absolute" top={0} left={'-10%'}>
              <HeartAnim size="20px" />
            </Box>

            <Box position="absolute" top={'60%'} right={'-10%'}>
              <HeartAnim size="20px" />
            </Box>

            <Box position="absolute" top={'5%'} right={'20%'}>
              <HeartAnim size="10px" />
            </Box>
          </SlideIn>
        </Box>
      </Flex>

      {/* <Box
        width="fit-content"
        minWidth="200px"
        color="foreground"
        m="0 auto"
        height="80px"
      >
        <SlideIn delay={0.2}>
         
        </SlideIn>
      </Box> */}
    </SwipeAnim>
  )
}

export default IntroText
