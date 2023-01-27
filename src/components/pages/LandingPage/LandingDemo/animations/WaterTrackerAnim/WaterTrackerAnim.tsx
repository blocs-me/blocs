import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import DemoText from '../../DemoText'
import ScaleIn from '../../ScaleIn'
import SlideIn from '../../SlideIn'
import SwipeAnim from '../../SwipeAnim'

const WaterTrackerAnim = ({ setNext, pause }) => {
  return (
    <SwipeAnim delayEnd={3} setNext={setNext} pauseAtEnd={pause}>
      <Flex
        width={['300px', , , '350px', '400px ', '450px']}
        flexDirection="column"
        gap="sm"
        alignItems={'center'}
      >
        <ScaleIn>
          <Box
            as="img"
            width="100%"
            height="auto"
            src="/water-tracker-demo.png"
          />
        </ScaleIn>
        <Box width={['250px', , '300px']}>
          <SlideIn delay={0.2}>
            <DemoText>
              A super fun way to track your 💧 water habits. See yourself
              improve with our 📊 analytics.
            </DemoText>
          </SlideIn>
        </Box>
      </Flex>
    </SwipeAnim>
  )
}

export default WaterTrackerAnim
