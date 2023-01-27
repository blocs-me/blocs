import Flex from '@/helpers/Flex'
import DemoText from '../../DemoText'
import ScaleIn from '../../ScaleIn'
import SlideIn from '../../SlideIn'
import SwipeAnim from '../../SwipeAnim'
import Box from '@/helpers/Box'

const PomodoroAnim = ({ setNext, pause }) => {
  return (
    <SwipeAnim delayEnd={3} setNext={() => setNext(2)} pauseAtEnd={pause}>
      <Flex
        flexDirection="column"
        gap="sm"
        width={['300px', , , '400px']}
        alignItems="center"
      >
        <ScaleIn delay={0.2}>
          <Box
            as="img"
            src="/pomodoro-demo.png"
            width={['250px', , '300px', , '380px']}
            maxWidth={['300px', , , , '380px']}
            alt="Pomodoro Demo"
          />
        </ScaleIn>
        <SlideIn delay={0.3}>
          <Box width={['250px', , , 'auto']}>
            <DemoText>
              Master your time with our supercharged ⏰ <b>pomodoro</b> widget
              bundled with 📊 <b>analytics</b>
            </DemoText>
          </Box>
        </SlideIn>
      </Flex>
    </SwipeAnim>
  )
}

export default PomodoroAnim
