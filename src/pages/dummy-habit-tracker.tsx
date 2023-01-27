import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import DummyHabitTracker from '@/widgets/HabitTracker/DummyHabitTracker'
import WidgetPage from '@/widgets/WidgetPage'

const createHabit = (title: string, id) => ({
  id,
  title
})

const habits = {
  data: [
    createHabit('Study math', 1),
    createHabit('Exercise', 2),
    createHabit('Reading, 30 mins', 3),
    createHabit('French, 15 min', 4),
    createHabit('No caffeine ☕️🧋', 5)
  ]
}

const HabitTrackerDummyPage = () => {
  return (
    <BlocsThemeProvider>
      <WidgetPage p="sm">
        <URLHashProvider hash={{ role: 'blocs-user' }}>
          <DummyHabitTracker
            isEditable
            habits={habits}
            checkedValues={[1, 2]}
            analyticsData={{
              data: {
                bestStreak: 60,
                currentStreak: 40
              }
            }}
          />
        </URLHashProvider>
      </WidgetPage>
    </BlocsThemeProvider>
  )
}

export default HabitTrackerDummyPage
