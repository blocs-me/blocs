import Box from '@/helpers/Box'
import Image from 'next/image'

import DemoText from '../../DemoText'
import ScaleIn from '../../ScaleIn'
import SlideIn from '../../SlideIn'
import SwipeAnim from '../../SwipeAnim'

const HabitTrackerAnim = ({ setNext, pause }) => {
  return (
    <div>
      <SwipeAnim delayEnd={3} setNext={setNext} pauseAtEnd={pause}>
        <ScaleIn>
          <Box width={['300px', , , '350px']}>
            <Image
              width="350px"
              height="294px"
              alt="Habit Tracker Visual Demo"
              src="/habit-tracker-demo.png"
            />
          </Box>
        </ScaleIn>
        <Box mt="sm" />

        <SlideIn delay={0.3}>
          <Box width={['280px', , '320px']} css={{ margin: '0 auto' }}>
            <DemoText>
              ✅ Tick off your daily habits <br />
              and stay motivated by maintaining your streaks 🔥
            </DemoText>
          </Box>
        </SlideIn>
      </SwipeAnim>
    </div>
  )
}

export default HabitTrackerAnim
