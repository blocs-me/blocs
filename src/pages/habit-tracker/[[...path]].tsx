import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import HabitTracker from '@/widgets/HabitTracker'
import DummyHabitTracker from '@/widgets/HabitTracker/DummyHabitTracker'
import WidgetPage from '@/widgets/WidgetPage'
import Text from '@/design-system/Text'
import { useRouter } from 'next/router'

const createHabit = (title: string, id: number) => ({ id, title })

const demoHabits = {
  data: [
    createHabit('Study math', 1),
    createHabit('Exercise', 2),
    createHabit('Reading, 30 mins', 3),
    createHabit('French, 15 min', 4),
    createHabit('No caffeine', 5)
  ]
}

const PoweredByBlocs = () => (
  <a
    href="https://blocs.me/habit-tracker-widget"
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: 'none' }}
  >
    <Text
      fontSize="10px"
      textAlign="center"
      color="primary.accent-4"
      mt="8px"
      mb={0}
    >
      Powered by Blocs
    </Text>
  </a>
)

const DemoHabitTracker = () => {
  return (
    <BlocsThemeProvider>
      <WidgetPage p="sm" bg="bg.notion" flexDirection="column">
        <URLHashProvider hash={{ role: 'blocs-user' }}>
          <DummyHabitTracker
            smallScreenAt="600px"
            isEditable
            habits={demoHabits}
            checkedValues={[1, 2]}
            analyticsData={{
              data: {
                bestStreak: 60,
                currentStreak: 40
              }
            }}
          />
          <PoweredByBlocs />
        </URLHashProvider>
      </WidgetPage>
    </BlocsThemeProvider>
  )
}

export default function HabitTrackerPage() {
  const router = useRouter()

  if (!router.isReady) return null

  if (!router.query.token) return <DemoHabitTracker />

  return <HabitTracker />
}
