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
import styled from '@emotion/styled'

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

const AddHabitInput = ({ onAdd }: { onAdd: (title: string) => void }) => {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  return (
    <Flex alignItems="center" mt="xs" css={{ gap: '6px' }}>
      <Box
        as="input"
        type="text"
        value={value}
        placeholder="New habit..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSubmit()}
        css={{
          flex: 1,
          border: '1px solid var(--colors-primary-accent-2)',
          borderRadius: '6px',
          padding: '6px 10px',
          fontSize: '14px',
          background: 'transparent',
          color: 'var(--colors-foreground)',
          outline: 'none',
          '&:focus': {
            borderColor: 'var(--colors-brand-accent-1)'
          }
        }}
      />
      <Box
        as="button"
        onClick={handleSubmit}
        css={{
          border: 'none',
          cursor: 'pointer',
          borderRadius: '6px',
          padding: '6px 12px',
          fontSize: '14px',
          fontWeight: 600,
          background: 'var(--colors-brand-accent-1)',
          color: 'white',
          '&:hover': { opacity: 0.85 }
        }}
      >
        +
      </Box>
    </Flex>
  )
}

const RemoveButton = ({ onClick }: { onClick: () => void }) => (
  <Box
    as="button"
    onClick={(e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onClick()
    }}
    css={{
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: '2px 6px',
      fontSize: '14px',
      color: 'var(--colors-primary-accent-4)',
      borderRadius: '4px',
      opacity: 0.5,
      transition: 'opacity 0.15s ease',
      '&:hover': { opacity: 1 }
    }}
  >
    ✕
  </Box>
)

const DummyHabitTracker = ({
  isAnalyticsHidden = false,
  analyticsData = { data: null },
  habits = { data: [] },
  isEditable = false,
  checkedValues = [],
  smallScreenAt = '1000px',
  onCheckedChange = undefined as ((checked: any[]) => void) | undefined,
  onAddHabit = undefined as ((title: string) => void) | undefined,
  onRemoveHabit = undefined as ((id: number) => void) | undefined,
  maxHabits = undefined as number | undefined
}) => {
  const today = formatDate(new Date())
  const todayISO = getCurrentISOString()
  const { colorMode } = useColorMode()
  const isSystemDM = useDarkMode()
  const isDarkMode =
    (colorMode === 'auto' && isSystemDM) || colorMode === 'dark'
  const isSmallScreen = useMediaQuery(`(max-width: ${smallScreenAt})`)
  const donutProgress = useHabitStreakProgress(analyticsData)
  const scrollContainer = useRef<HTMLDivElement>(null)
  const columnOne = useRef<HTMLDivElement>(null)
  const [checked, setChecked] = useState(checkedValues)

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
      width={isSmallScreen ? 'auto' : '550px'}
      minHeight="200px"
      height="100%"
      maxHeight="470px"
      bg="background"
      boxShadow="default"
      borderRadius="lg"
      p="md"
      position="relative"
      overflow="hidden"
      role={onAddHabit ? 'region' : 'img'}
      aria-label={onAddHabit ? 'Habit Tracker' : 'Habit Tracker Visual Example'}
    >
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
                css={{ flex: 1, overflow: 'auto' }}
                mt={isSmallScreen ? 'md' : 'sm'}
                pr="md"
              >
                <Stack mt="sm" width="100%">
                  <CheckoboxesSkeleton isLoading={!habits} />
                  {habits?.data?.map((d) => (
                    <Flex key={d.id} alignItems="center" justifyContent="space-between">
                      <CheckboxWithText
                        isChecked={checked?.includes(d.id)}
                        text={d.title}
                        id={d.id}
                        onChange={(str) => {
                          isEditable &&
                            (() => {
                              const index = checked.findIndex((v) => v === d.id)
                              let next

                              if (index > -1) {
                                next = [
                                  ...checked.slice(0, index),
                                  ...checked.slice(index + 1)
                                ]
                              } else {
                                next = [d.id, ...checked]
                              }

                              setChecked(next)
                              onCheckedChange?.(next)
                            })()
                        }}
                      />
                      {onRemoveHabit && (
                        <RemoveButton onClick={() => onRemoveHabit(d.id)} />
                      )}
                    </Flex>
                  ))}
                  {onAddHabit && habits?.data?.length < (maxHabits ?? Infinity) && (
                    <AddHabitInput onAdd={onAddHabit} />
                  )}
                  {onAddHabit && maxHabits && habits?.data?.length >= maxHabits && (
                    <Box mt="xs">
                      <Text fontSize="xxs" color="primary.accent-4" m={0} mb="xxs">
                        Free limit reached ({maxHabits} habits)
                      </Text>
                      <Box
                        as="a"
                        href="https://blocs.me/sign-in"
                        target="_blank"
                        rel="noopener noreferrer"
                        css={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: 'var(--colors-brand-accent-1)',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        Sign in for unlimited habits →
                      </Box>
                    </Box>
                  )}
                  {habits && !habits?.data?.length && !onAddHabit && (
                    <Text fontSize="sm" color="primary.accent-4" m={0}>
                      No habits yet
                    </Text>
                  )}
                  {habits && !habits?.data?.length && onAddHabit && (
                    <Box>
                      <Text fontSize="sm" color="primary.accent-4" m={0} mb="xs">
                        Add your first habit to get started
                      </Text>
                      <AddHabitInput onAdd={onAddHabit} />
                    </Box>
                  )}
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
