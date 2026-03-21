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
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import { HABITS_PATH } from '@/utils/endpoints'
import { postReq, deleteReq } from '@/utils/fetchingUtils'
import { getCurrentISOString } from '@/utils/dateUtils/getCurrentISOString'
import useNotifications from '@/design-system/Notifications/useNotifications'

const dummyAnalyticsData = {
  data: {
    bestStreak: 0,
    currentStreak: 0
  }
}

const HabitTrackerWidget = () => {
  const { data: habits, mutate } = useFetchHabits()
  const { data: analytics = dummyAnalyticsData } = useFetchHabitsAnalytics()
  const { token } = useUrlHash<{ token: string }>()
  const notifs = useNotifications()

  const handleAddHabit = async (title: string) => {
    const path = `${HABITS_PATH}?widgetToken=${token}&isoDateString=${getCurrentISOString()}`
    try {
      await mutate(postReq(path, { body: { title } }), { revalidate: true })
    } catch {
      notifs.createError('Could not create habit')
    }
  }

  const handleRemoveHabit = async (id: number) => {
    const path = `${HABITS_PATH}?widgetToken=${token}&isoDateString=${getCurrentISOString()}`
    try {
      await mutate(deleteReq(path, { body: { id } }), { revalidate: true })
    } catch {
      notifs.createError('Could not delete habit')
    }
  }

  return (
    <DummyHabitTracker
      habits={habits}
      analyticsData={analytics}
      isEditable
      onAddHabit={handleAddHabit}
      onRemoveHabit={handleRemoveHabit}
    />
  )
}

const HabitTrackerDashboardInner = () => {
  const { purchases, isUserOnFreeTrial } = useBlocsUser()
  const ownsHabitTracker =
    purchases.lifetimeAccess || purchases.habitTracker || purchases.lifestylePro || isUserOnFreeTrial

  const { token, isLoading } = useCreateToken('HABIT_TRACKER', ownsHabitTracker)

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
