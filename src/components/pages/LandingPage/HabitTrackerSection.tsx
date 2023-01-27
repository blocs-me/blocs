import SlideIn from './LandingDemo/SlideIn'
import WidgetExplainerSection from './WidgetExplainerSection'
import DummyHabitTracker from '@/widgets/HabitTracker/DummyHabitTracker'
import Box from '@/helpers/Box'
import { IHabitTrackerWidget } from '@/gtypes/habit-tracker'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import { useEffect, useState } from 'react'

const paraOne =
  'Have a new habit you want to create ? No problem! With our new habit tracker widget you can create any habit and watch the list refresh everyday to tick off again ☑️'
const paraTwo =
  'The coolest part of the habit tracker is the streak chart 📊 The only way to keep your streak going by is ticking off 100% of your habits everyday. 🔥'

const habits: IHabitTrackerWidget['data']['habits'] = [
  {
    id: '1',
    title: 'Exercise 30m'
  },
  {
    id: '2',
    title: 'Practice French 15m'
  },
  {
    id: '3',
    title: 'Organise & Plan'
  }
]

const HabitTrackerSection = () => {
  const [currentStreak, setCurrentSteak] = useState(40)

  useEffect(() => {
    let interval = setInterval(() => {
      setCurrentSteak(Math.floor(Math.max(20, Math.random() * 55)))
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <WidgetExplainerSection
      header="Habit Tracker"
      paraOne={paraOne}
      paraTwo={paraTwo}
    >
      {(reveal) => (
        <>
          <SlideIn delay={0.2} pause={!reveal}>
            <Box>
              <URLHashProvider hash={{ role: 'blocs-user' }}>
                <DummyHabitTracker
                  isEditable
                  habits={{ data: habits }}
                  checkedValues={['1', '2']}
                  analyticsData={{
                    data: {
                      bestStreak: 60,
                      currentStreak
                    }
                  }}
                />
              </URLHashProvider>
            </Box>
          </SlideIn>
          {/* <SlideIn delay={0.2} pause={!reveal}>
            <Box width="300px">
              <DummyHabitTracker isAnalyticsHidden />
            </Box>
          </SlideIn> */}
        </>
      )}
    </WidgetExplainerSection>
  )
}

export default HabitTrackerSection
