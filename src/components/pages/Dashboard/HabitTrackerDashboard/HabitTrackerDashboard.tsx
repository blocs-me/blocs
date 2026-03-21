import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'
import DummyHabitTracker from '@/widgets/HabitTracker/DummyHabitTracker'
import { useCreateToken } from '../useCreateToken'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import { useFetchHabits } from '@/widgets/HabitTracker/hooks/useFetchHabits'
import useFetchHabitsAnalytics from '@/widgets/HabitTracker/hooks/useFetchHabitsAnalytics'
import useBlocsUser from '@/hooks/useBlocsUser'
import CopyLinkButton from '../CopyLinkButton'
import HowToEmbedButton from '../HowToEmbedButton'

const dummyAnalyticsData = {
  data: {
    bestStreak: 0,
    currentStreak: 0
  }
}

const HabitTrackerWidget = () => {
  const { data: habits } = useFetchHabits()
  const { data: analytics = dummyAnalyticsData } = useFetchHabitsAnalytics()

  return (
    <DummyHabitTracker
      habits={habits}
      analyticsData={analytics}
      isEditable
    />
  )
}

const HabitTrackerDashboardInner = () => {
  const { purchases, isUserOnFreeTrial } = useBlocsUser()
  const ownsHabitTracker =
    purchases.lifetimeAccess || purchases.habitTracker || purchases.lifestylePro || isUserOnFreeTrial

  const { token, publicToken, isLoading } = useCreateToken('HABIT_TRACKER', ownsHabitTracker)

  const baseUrl = typeof window !== 'undefined' ? window.origin : ''
  const widgetUrl = token ? `${baseUrl}/habit-tracker?token=${token}&role=blocs-user` : ''

  return (
    <URLHashProvider hash={{ token, role: 'blocs-user' }}>
      <Flex flexDirection="column" css={{ gap: '2rem' }}>
        <Flex flexDirection="column">
          <Flex alignItems="center" justifyContent="space-between" mb="sm">
            <Flex alignItems="center" css={{ gap: '12px' }}>
              <Text as="h2" fontSize="md" fontWeight={700} color="foreground" m={0}>
                Habit Tracker
              </Text>
              <HowToEmbedButton />
            </Flex>
            <CopyLinkButton url={widgetUrl} disabled={isLoading} />
          </Flex>
          <Flex justifyContent="center">
            <HabitTrackerWidget />
          </Flex>
        </Flex>
      </Flex>
    </URLHashProvider>
  )
}

export default HabitTrackerDashboardInner
