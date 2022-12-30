import Flex from '@/helpers/Flex'
import DummyHabitTracker from '../../../widgets/HabitTracker/DummyHabitTracker'
import Box from '@/helpers/Box'
import Button from '@/design-system/Button'
import HabitRow from '@/widgets/HabitTracker/HabitManagerModal/HabitRow'
import Grid from '@/helpers/Grid'
import WidgetLinkWrapper from '../WidgetLinkWrapper'
import Text from '@/design-system/Text'
import PremiumOverlay from '../PremiumOverlay'
import ClipboardModal from '../ClipboardModal'
import { useState } from 'react'
import { useCreateToken } from '../useCreateToken'
import useUser from '@/hooks/useUser'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import HabitTrackerForm from './HabitTrackerForm'
import { useFetchHabits } from '../../../widgets/HabitTracker/hooks/useFetchHabits'
import useFetchHabitsAnalytics from '../../../widgets/HabitTracker/hooks/useFetchHabitsAnalytics'

const dummyAnalyticsData = {
  data: {
    bestStreak: "'x' days",
    currentStreak: '5'
  }
}

const dummyHabits = {
  data: [
    {
      id: '123',
      title: 'Study Language'
    },
    {
      id: '124',
      title: 'Go for a walk'
    },
    {
      id: '125',
      title: 'Skincare Routine'
    }
  ]
}

const HabitTrackerWidget = () => {
  const { data: habits } = useFetchHabits()
  const { data: analytics = dummyAnalyticsData } = useFetchHabitsAnalytics()

  return <DummyHabitTracker habits={habits} analyticsData={analytics} />
}

const Habits = ({ setFormAction, setShowForm }) => {
  const { data: habits = dummyHabits } = useFetchHabits()

  return (
    <>
      {habits?.data?.map((d) => (
        <HabitRow
          key={d.id}
          {...d}
          setAction={(d) => {
            setFormAction(d)
            setShowForm(true)
          }}
        />
      ))}

      {!habits?.data?.length && (
        <Flex width="100%" py="md" mt="sm">
          <Text
            variant="pSmall"
            p={0}
            m={'0 auto'}
            textAlign="center"
            css={{ width: '70%' }}
          >
            When you create a habit it&#39;ll show up here
          </Text>
        </Flex>
      )}
    </>
  )
}

const HabitTrackerDashboard = () => {
  const [url, setUrl] = useState('')
  const [shareableUrl, setShareableUrl] = useState('')
  const [formAction, setFormAction] = useState({})
  const [showForm, setShowForm] = useState(false)
  const { isPremiumUser = true } = useUser() // TODO: change based on Stripe integratoin

  const { token, publicToken, isLoading } = useCreateToken(
    'HABIT_TRACKER',
    isPremiumUser
  )

  const handleCopy = () => {
    if (token) {
      const baseUrl = window.origin
      setUrl(`${baseUrl}/habit-tracker?token=${token}&role=blocs-user`)
      setShareableUrl(
        `${baseUrl}/habit-tracker?token=${publicToken}&role=friend`
      )
    }
  }

  return (
    <URLHashProvider
      hash={{
        token,
        role: 'blocs-user'
      }}
    >
      <Flex width="100%" height="100%" flexWrap="wrap">
        <Box p="md">
          <WidgetLinkWrapper onClick={handleCopy} isLoading={isLoading}>
            <HabitTrackerWidget />
          </WidgetLinkWrapper>
        </Box>
        <Box pr="sm" />
        <Flex
          p="md"
          flexDirection="column"
          width="300px"
          height="fit-content"
          bg="background"
          border="solid 1px"
          borderColor="primary.accent-1"
          m="md"
          borderRadius="md"
          boxShadow="sm"
        >
          <Button
            variant="success"
            maxHeight="45px"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()

              setFormAction({ mode: 'create' })
              setShowForm(true)
            }}
          >
            Create A New Habit
          </Button>

          <Flex
            mt="sm"
            flexDirection="column"
            gridTemplateColumns={'repeat(auto-fit, 200px)'}
            gridGap="sm"
            minWidth="200px"
          >
            <Habits setFormAction={setFormAction} setShowForm={setShowForm} />
          </Flex>
        </Flex>

        <ClipboardModal
          isOpen={!!url}
          url={url}
          shareableUrl={shareableUrl}
          hideModal={() => setUrl('')}
        />

        <HabitTrackerForm
          closeModal={() => setShowForm(false)}
          isOpen={showForm}
          {...formAction}
        />
      </Flex>
    </URLHashProvider>
  )
}

export default HabitTrackerDashboard
