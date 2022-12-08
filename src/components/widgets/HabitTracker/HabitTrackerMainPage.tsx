import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import DonutChart from '@/design-system/DonutChart'
import CheckboxWithText from './CheckboxWithText'
import ScrollProvider from '@/design-system/ScrollProvider'
import Stack from '@/helpers/Stack'
import Box from '@/helpers/Box'
import FadeProvider from '@/design-system/FadeProvider'
import {
  MouseEvent,
  ReactNode,
  UIEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import { IBox } from '@/helpers/Box/Box.types'
import { Theme } from 'src/styles/theme'

import useColorMode from '@/hooks/useColorMode'
import useDarkMode from '@/hooks/useDarkMode'
import useMediaQuery from '@/hooks/useMediaQuery'
import FadeIn from '@/helpers/FadeIn'
import { useDebouncedFn } from 'beautiful-react-hooks'

const donutDarkTheme = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    donutFill:
      'conic-gradient(from 238.8deg at 50.07% 50.07%, #28D9E4 0deg, #00F0FF 120deg, #1E78CC 241.88deg, #28D9E4 360deg)'
  }
})

const BorderedBox = ({
  children,
  ...rest
}: { children?: ReactNode } & IBox) => {
  return (
    <Flex
      width="100%"
      maxWidth="200px"
      minWidth="150px"
      borderRadius="5px"
      border="solid 1px"
      borderColor="primary.accent-3"
      css={{ textAlign: 'center' }}
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      {children}
    </Flex>
  )
}

const formatDate = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format

const data = Array(10).fill('')

const HabitTrackerMainPage = ({ isAnalyticsHidden = false }) => {
  const today = formatDate(new Date())
  const todayISO = new Date().toISOString()
  const { colorMode } = useColorMode()
  const isSystemDM = useDarkMode()
  const isDarkMode =
    (colorMode === 'auto' && isSystemDM) || colorMode === 'dark'
  const isSmallScreen = useMediaQuery('(max-width: 600px)')

  const [hideTopFade, setHideTopFade] = useState(true)
  const handleScroll = useDebouncedFn((e: UIEvent<HTMLDivElement>, hide) => {
    const target = e.target as HTMLDivElement
    if (target.scrollTop > 0 && hide) {
      setHideTopFade(false)
    }

    if (target.scrollTop === 0) {
      setHideTopFade(true)
    }
  }, 10)

  return (
    <FadeIn css={{ width: '100%' }}>
      <Flex
        justifyContent="center"
        width="100%"
        height="100%"
        overflow="hidden"
        alignItems={isSmallScreen ? 'center' : 'start'}
      >
        <Flex flexDirection="column" minWidth="250px" justfyContent="center">
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
              onScroll={(e) => handleScroll(e, hideTopFade)}
              maxHeight={isSmallScreen ? '300px' : '325px'}
              mt={isSmallScreen ? 'md' : 'sm'}
              pr="md"
            >
              <Stack mt="sm" width="100%">
                {data.map((_, i) => (
                  <CheckboxWithText
                    isChecked={i % 4 === 0}
                    text="Study German 2 hrs"
                    value=""
                    onChange={() => {}}
                    key={i}
                  />
                ))}
                <Box />
              </Stack>
            </ScrollProvider>
            {!hideTopFade && <FadeProvider position="top" />}
            <FadeProvider position="bottom" />
          </Box>
        </Flex>

        {!isSmallScreen && !isAnalyticsHidden && (
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            ml="md"
            css={{ gap: '0.5rem' }}
          >
            <BorderedBox p="sm" css={{ flex: 1 }}>
              <Text color="foreground" fontSize="xs" fontWeight={200} m={0}>
                {today}
              </Text>
            </BorderedBox>
            <BorderedBox p="sm" css={{ flex: 1 }}>
              <Text color="foreground" fontSize="xs" fontWeight={200} m={0}>
                Your best streak was 98 day
              </Text>
            </BorderedBox>
            <Box position="relative">
              <BorderedBox p="xs" css={{ flex: 1 }}>
                <DonutChart
                  background="primary.accent-2"
                  foreground={isDarkMode ? 'url(#dm-gradient)' : '#3956ED'}
                  textColor="foreground"
                  strokeWidthInner={3}
                  strokeWidthOuter={10}
                  progress={50}
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
                  60 days streak
                </Text>
              </Box>
            </Box>
          </Flex>
        )}
      </Flex>
    </FadeIn>
  )
}

export default HabitTrackerMainPage

export {}
