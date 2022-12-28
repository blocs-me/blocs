import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import DonutChart from '@/design-system/DonutChart'
import CheckboxWithText from './CheckboxWithText'
import ScrollProvider from '@/design-system/ScrollProvider'
import Stack from '@/helpers/Stack'
import Box from '@/helpers/Box'
import FadeProvider from '@/design-system/FadeProvider'
import { UIEvent, useEffect, useRef, useState } from 'react'

import useColorMode from '@/hooks/useColorMode'
import useDarkMode from '@/hooks/useDarkMode'
import useMediaQuery from '@/hooks/useMediaQuery'
import FadeIn from '@/helpers/FadeIn'
import { useDebouncedCallback } from 'beautiful-react-hooks'
import { getCurrentISOString } from '../../../utils/dateUtils/getCurrentISOString'
import CheckoboxesSkeleton from './CheckboxesSkeleton'
import BorderedBox from './BorderedBox'
import { getPercent } from '@/utils/math'

const useHabitStreakProgress = (analytics) => {
  const bestStreak = analytics?.data?.bestStreak
  const currentStreak = analytics?.data?.currentStreak

  const streakProgress = (() => {
    if (currentStreak < bestStreak)
      return getPercent(currentStreak, bestStreak, 'floor')

    if (currentStreak < 7) return getPercent(currentStreak, 7, 'floor')
    if (currentStreak < 14) return getPercent(currentStreak, 14, 'floor')
    if (currentStreak < 30) return getPercent(currentStreak, 30, 'floor')

    if (currentStreak >= 30) {
      let count = 50

      while (currentStreak >= count) {
        count = count + 50
      }

      return count
    }
  })()

  return streakProgress
}

const formatDate = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format

const DummyHabitTracker = ({
  isAnalyticsHidden = false,
  analyticsData = { data: null },
  habits = { data: [] }
}) => {
  const today = formatDate(new Date())
  const todayISO = getCurrentISOString()
  const { colorMode } = useColorMode()
  const isSystemDM = useDarkMode()
  const isDarkMode =
    (colorMode === 'auto' && isSystemDM) || colorMode === 'dark'
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const donutProgress = useHabitStreakProgress(analyticsData)
  const scrollContainer = useRef<HTMLDivElement>(null)
  const columnOne = useRef<HTMLDivElement>(null)

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
    <Flex
      width={'550px'}
      height={'470px'}
      bg="background"
      boxShadow="default"
      borderRadius="lg"
      p="md"
      position="relative"
      overflow="hidden"
    >
      <FadeIn css={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
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
              {(isSmallScreen || isAnalyticsHidden) && (
                <Text
                  as="time"
                  color="primary.accent-4"
                  fontSize="sm"
                  fontWeight={200}
                  datetime={todayISO}
                >
                  {today}
                </Text>
              )}
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
                  <CheckoboxesSkeleton isLoading={!habits} />
                  {habits?.data?.map((d) => (
                    <CheckboxWithText
                      isChecked={analyticsData?.data?.habitsDone?.includes(
                        d.id
                      )}
                      text={d.title}
                      id={d.id}
                      onChange={() => {}}
                      key={d.id}
                    />
                  ))}
                  <Box />
                </Stack>
                <Box height="40px" />
              </ScrollProvider>
              {!hideTopFade && <FadeProvider position="top" />}
              {!hideBottomFade && <FadeProvider position="bottom" />}
            </Box>
          </Flex>

          {!isSmallScreen && !isAnalyticsHidden && (
            <Flex flexDirection="column" justifyContent="space-between" ml="md">
              <BorderedBox p="sm">
                <Text color="foreground" fontSize={'xs'} fontWeight={200} m={0}>
                  {today}
                </Text>
              </BorderedBox>
              <BorderedBox p="sm">
                <Text color="foreground" fontSize="xs" fontWeight={200} m={0}>
                  Your best streak is {analyticsData?.data?.bestStreak}{' '}
                  {analyticsData?.data?.bestStreak === 1 ? 'day' : 'days'}
                </Text>
              </BorderedBox>
              <Box position="relative">
                <BorderedBox p="xs">
                  <DonutChart
                    background="primary.accent-2"
                    foreground={isDarkMode ? 'url(#dm-gradient)' : '#3957edc6'}
                    textColor="foreground"
                    strokeWidthInner={3}
                    strokeWidthOuter={10}
                    progress={donutProgress || 0}
                    size="100%"
                  />
                </BorderedBox>

                <Box
                  position="absolute"
                  maxWidth="135px"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                >
                  <Text
                    color="foreground"
                    fontSize="xxs"
                    fontWeight={200}
                    m={0}
                    textAlign="center"
                  >
                    {analyticsData?.data?.currentStreak}{' '}
                    {analyticsData?.data?.currentStreak === 1 ? 'day' : 'days'}{' '}
                    streak
                  </Text>
                </Box>
              </Box>
            </Flex>
          )}
        </Flex>
      </FadeIn>
    </Flex>
  )
}

export default DummyHabitTracker
