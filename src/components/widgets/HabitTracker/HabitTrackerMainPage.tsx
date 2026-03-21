import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import CheckboxWithText from './CheckboxWithText'
import ScrollProvider from '@/design-system/ScrollProvider'
import Stack from '@/helpers/Stack'
import Box from '@/helpers/Box'
import FadeProvider from '@/design-system/FadeProvider'
import { UIEvent, useEffect, useRef, useState } from 'react'

import useMediaQuery from '@/hooks/useMediaQuery'
import FadeIn from '@/helpers/FadeIn'
import { useDebouncedCallback } from 'beautiful-react-hooks'
import { useFetchHabits } from './hooks/useFetchHabits'
import useFetchHabitsAnalytics from './hooks/useFetchHabitsAnalytics'
import useSaveHabitsAnalytics from './hooks/useSaveHabitsAnalytics'
import { getCurrentISOString } from '../../../utils/dateUtils/getCurrentISOString'
import CheckoboxesSkeleton from './CheckboxesSkeleton'
import EmptyHabitsScreen from './EmptyHabitsScreen'
import StreakGrid from './StreakGrid'

const formatDate = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format

const HabitTrackerMainPage = ({ isAnalyticsHidden = false }) => {
  const today = formatDate(new Date())
  const todayISO = getCurrentISOString()
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const { data: habits } = useFetchHabits()
  const { data: analyticsData } = useFetchHabitsAnalytics()
  const saveHabits = useSaveHabitsAnalytics()
  const scrollContainer = useRef<HTMLDivElement>(null)
  const columnOne = useRef<HTMLDivElement>(null)

  const handleOnChange = (habitId: string) => {
    saveHabits(habitId)
  }

  const [hideTopFade, setHideTopFade] = useState(true)
  const [hideBottomFade, setHideBottomFade] = useState(false)
  const handleScroll = useDebouncedCallback(
    (e: UIEvent<HTMLDivElement>, hide) => {
      const target = e.target as HTMLDivElement
      if (target.scrollTop > 0 && hide) {
        setHideTopFade(false)
      }

      if (target.scrollTop === 0) {
        setHideTopFade(true)
      }
    },
    [],
    10
  )

  useEffect(() => {
    const scrollHeight = scrollContainer.current.scrollHeight
    const clientHeight = scrollContainer.current.clientHeight

    if (scrollHeight - clientHeight > 30) {
      setHideBottomFade(false)
    } else {
      setHideBottomFade(true)
    }
  }, [habits])

  return (
    <FadeIn css={{ width: '100%', height: '100%' }}>
      <Flex
        justifyContent="center"
        width="100%"
        height="100%"
        overflow="hidden"
        alignItems={isSmallScreen ? 'start' : 'stretch'}
      >
        <Flex
          flexDirection="column"
          minWidth="250px"
          maxWidth="600px"
          justfyContent="center"
          ref={columnOne}
        >
          <Flex flexDirection="column">
            <Text
              as="h1"
              lineHeight={1}
              fontSize="lg"
              color="foreground"
              mb="xs"
              fontWeight="bold"
            >
              Daily Habits
            </Text>
            <Text
              as="time"
              color="primary.accent-4"
              fontSize="xs"
              fontWeight={200}
              datetime={todayISO}
            >
              {today}
            </Text>
          </Flex>

          <Box position="relative">
            <ScrollProvider
              ref={scrollContainer}
              onScroll={(e) => handleScroll(e, hideTopFade)}
              maxHeight={isSmallScreen ? '300px' : '325px'}
              mt={isSmallScreen ? 'md' : 'sm'}
              pr="md"
            >
              <Stack mt="sm" width="100%">
                {<CheckoboxesSkeleton isLoading={!habits} />}
                {habits?.data?.map((d) => (
                  <CheckboxWithText
                    isChecked={analyticsData?.data?.habitsDone?.includes(d.id)}
                    text={d.title}
                    id={d.id}
                    onChange={(id) => handleOnChange(id)}
                    key={d.id}
                  />
                ))}
                {habits && !habits?.data?.length && <EmptyHabitsScreen />}
                <Box />
              </Stack>
              <Box height="40px" />
            </ScrollProvider>
            {!hideTopFade && <FadeProvider position="top" />}
            {!hideBottomFade && <FadeProvider position="bottom" />}
          </Box>
        </Flex>

        {!isSmallScreen && !isAnalyticsHidden && (
          <Flex flexDirection="column" ml="md" width="180px" css={{ flexShrink: 0, justifyContent: 'center' }}>
            <StreakGrid
              currentStreak={analyticsData?.data?.currentStreak || 0}
              bestStreak={analyticsData?.data?.bestStreak || 0}
            />
          </Flex>
        )}
      </Flex>
    </FadeIn>
  )
}

export default HabitTrackerMainPage
