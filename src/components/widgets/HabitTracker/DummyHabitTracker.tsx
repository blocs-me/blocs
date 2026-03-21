import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import DonutChart from '@/design-system/DonutChart'
import CheckboxWithText from './CheckboxWithText'
import ScrollProvider from '@/design-system/ScrollProvider'
import Stack from '@/helpers/Stack'
import Box from '@/helpers/Box'
import FadeProvider from '@/design-system/FadeProvider'
import Icon from '@/helpers/Icon'
import Gear from 'src/icons/gear'
import Moon from 'src/icons/moon'
import Sun from 'src/icons/sun'
import { UIEvent, useEffect, useRef, useState } from 'react'

import useColorMode from '@/hooks/useColorMode'
import useDarkMode from '@/hooks/useDarkMode'
import useMediaQuery from '@/hooks/useMediaQuery'
import useIsTrueDarkMode from '@/hooks/useIsTrueDarkMode'
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
        color="foreground"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSubmit()}
        css={{
          flex: 1,
          border: 'none',
          borderBottom: '1px solid',
          borderColor: 'inherit',
          borderRadius: 0,
          padding: '6px 2px',
          fontSize: '14px',
          background: 'transparent',
          outline: 'none'
        }}
      />
      {value.trim() && (
        <Box
          as="button"
          bg="brand.accent-1"
          color="neutral.white"
          borderRadius="sm"
          onClick={handleSubmit}
          css={{
            border: 'none',
            cursor: 'pointer',
            padding: '6px 10px',
            fontSize: '13px',
            lineHeight: 1,
            '&:hover': { opacity: 0.85 }
          }}
        >
          ✓
        </Box>
      )}
    </Flex>
  )
}

const RemoveButton = ({ onClick }: { onClick: () => void }) => (
  <Box
    as="button"
    color="primary.accent-4"
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
      borderRadius: '4px',
      opacity: 0.5,
      transition: 'opacity 0.15s ease',
      '&:hover': { opacity: 1 }
    }}
  >
    ✕
  </Box>
)

const FreeSettingsPopover = ({ onClose }: { onClose: () => void }) => {
  const { colorMode, setTheme, setBackground } = useColorMode()
  const isDarkMode = useIsTrueDarkMode()
  const ref = useRef<HTMLDivElement>(null)
  const [showSignInCTA, setShowSignInCTA] = useState(false)

  const handleThemeChange = (mode: string) => {
    setTheme(mode)
    setBackground(mode)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <Box
      ref={ref}
      position="absolute"
      top="48px"
      right="0"
      width="220px"
      bg="background"
      borderRadius="md"
      boxShadow="lg"
      p="sm"
      zIndex={100}
      border="1px solid"
      borderColor="primary.accent-1"
    >
      <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
        Settings
      </Text>

      <Text m={0} fontSize="xs" fontWeight={400} color="foreground" mb="xxs">
        Theme
      </Text>
      <Flex css={{ gap: '4px' }} mb="xs">
        {['light', 'dark', 'auto'].map(mode => (
          <Box
            key={mode}
            as="button"
            flex="1"
            py="4px"
            borderRadius="sm"
            bg={colorMode === mode ? 'brand.accent-1' : 'primary.accent-2'}
            color={colorMode === mode ? 'neutral.white' : 'foreground'}
            css={{
              border: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: colorMode === mode ? 600 : 400,
              textTransform: 'capitalize',
              transition: 'all 0.15s ease'
            }}
            onClick={() => handleThemeChange(mode)}
          >
            {mode === 'auto' ? 'System' : mode === 'dark' ? 'Dark' : 'Light'}
          </Box>
        ))}
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xs" />

      {!showSignInCTA ? (
        <Box
          as="button"
          width="100%"
          css={{
            display: 'block',
            textAlign: 'left',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '6px',
            padding: '8px',
            '&:hover': { backgroundColor: 'var(--colors-primary-accent-2)' }
          }}
          onClick={() => setShowSignInCTA(true)}
        >
          <Text fontSize="xxs" fontWeight={600} color="foreground" m={0}>
            Show Analytics
          </Text>
          <Text fontSize="10px" color="primary.accent-4" m={0} mt="2px">
            View streaks, progress, and more
          </Text>
        </Box>
      ) : (
        <Box p="xs" borderRadius="md" bg="primary.accent-2">
          <Text fontSize="xs" fontWeight={600} color="foreground" m={0} mb="xxs">
            Track your streaks
          </Text>
          <Text fontSize="xxs" color="primary.accent-4" m={0} mb="xs" lineHeight={1.4}>
            Sign in to Blocs to see streaks, analytics, and daily progress. It&apos;s free.
          </Text>
          <Box
            as="a"
            href="https://blocs.me/sign-in"
            target="_blank"
            rel="noopener noreferrer"
            bg="brand.accent-1"
            color="neutral.white"
            borderRadius="sm"
            css={{
              display: 'block',
              textAlign: 'center',
              textDecoration: 'none',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              '&:hover': { opacity: 0.85 }
            }}
          >
            Sign in to Blocs
          </Box>
        </Box>
      )}
    </Box>
  )
}

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

  const [isHovering, setIsHovering] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
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
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ '--settings-opacity': isHovering || showSettings ? 1 : 0 } as React.CSSProperties}
    >
      {onAddHabit && (
        <Box
          position="absolute"
          top="sm"
          right="sm"
          zIndex={50}
          css={{
            opacity: 'var(--settings-opacity)',
            transition: 'opacity 0.3s ease'
          }}
        >
          <Flex
            as="button"
            borderRadius="md"
            alignItems="center"
            justifyContent="center"
            bg="primary.accent-2"
            p="xs"
            size="40px"
            overflow="hidden"
            onClick={() => setShowSettings(!showSettings)}
            css={{
              border: 'none',
              cursor: 'pointer',
              '&:hover': { boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }
            }}
          >
            <Icon m="auto" fill="foreground" width="15px" height="15px" display="flex">
              <Gear />
            </Icon>
          </Flex>
          {showSettings && (
            <FreeSettingsPopover onClose={() => setShowSettings(false)} />
          )}
        </Box>
      )}
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
                  {onAddHabit && habits?.data?.length > 0 && habits?.data?.length < (maxHabits ?? Infinity) && (
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
                        color="brand.accent-1"
                        css={{
                          fontSize: '12px',
                          fontWeight: 600,
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
                    <AddHabitInput onAdd={onAddHabit} />
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
