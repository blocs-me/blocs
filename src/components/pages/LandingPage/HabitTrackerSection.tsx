import WidgetExplainerSection from './WidgetExplainerSection'
import DummyHabitTracker from '@/widgets/HabitTracker/DummyHabitTracker'
import Box from '@/helpers/Box'
import { IHabitTrackerWidget } from '@/gtypes/habit-tracker'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/design-system/Button'

const paraOne =
  'Build consistent habits with a daily checklist inside Notion. Track your streaks, see your best runs, and stay motivated with progress analytics.'

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
      paraTwo={
        <Link href="/habit-tracker-widget" passHref>
          <Button
            as="a"
            bg="brand.accent-1"
            color="background"
            borderRadius="sm"
            px="md"
            py="xxs"
            fontSize="xs"
            fontWeight="bold"
            height="40px"
          >
            Try the free Habit Tracker →
          </Button>
        </Link>
      }
    >
      {() => (
        <Box>
          <URLHashProvider hash={{ role: 'blocs-user' }}>
            <DummyHabitTracker
              smallScreenAt="600px"
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
      )}
    </WidgetExplainerSection>
  )
}

export default HabitTrackerSection
