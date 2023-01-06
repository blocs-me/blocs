import { useEffect, useLayoutEffect, useState } from 'react'
import { css, useTheme } from '@emotion/react'
import CaretButton from '@/design-system/CaretButton'
import Text from '@/design-system/Text'
import WidgetMenuButton from '@/design-system/WidgetMenuButton'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Stack from '@/helpers/Stack'
import Bowl from './Bowl'
import TweenNum from './TweenNum'
import FadeIn from '@/helpers/FadeIn'
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import { UrlHash } from './types'
import useWaterTrackerSettings from './hooks/useWaterTrackerSettings'
import useNotifications from '@/design-system/Notifications/useNotifications'
import { literToOunce } from '@/utils/math/literToOunce'
import { ounceToLiter } from '@/utils/math'
import useSaveAnalytics from './hooks/useSaveAnalytics'
import useWaterLatestTrackerAnalytics from './hooks/useLatestWaterTrackerAnalytics'
import Button from '@/design-system/Button'
import Moon from 'src/icons/moon'
import useDarkMode from '@/hooks/useDarkMode'
import useColorMode from '../../../hooks/useColorMode/index'
import Sun from 'src/icons/sun'
import { Theme } from '../../../styles/theme'

const hideOnHoverEls = css`
  opacity: var(--opacity);
  transition: opacity 0.3s ease;
`
const WaterTrackerMainPage = () => {
  const [progress, setProgress] = useState(0)
  const theme = useTheme() as Theme
  const prefersDark = useDarkMode()
  const { colorMode, setTheme, setBackground } = useColorMode()
  const isDarkMode = (() =>
    colorMode === 'dark' || (prefersDark && colorMode === 'auto'))()
  const { role } = useUrlHash<UrlHash>()
  const isBlocsUser = role === 'blocs-user'
  const { data: settings, error: settingsError } = useWaterTrackerSettings()
  const units = settings?.data?.units || 'liter'
  const GOAL =
    units === 'ounce'
      ? ounceToLiter(settings?.data?.goal, false)
      : settings?.data?.goal || 4
  const notif = useNotifications()
  const progressStep = units === 'liter' ? 1 : Number(GOAL) / Math.floor(GOAL)
  const saveAnalytics = useSaveAnalytics()
  const { data: latestAnalytics } = useWaterLatestTrackerAnalytics()

  const handleThemeChange = () => {
    const modes = ['dark', 'light', 'auto']
    const pos = modes.findIndex((mode) => mode == colorMode)

    const nextMode = pos + 1 >= 3 ? 0 : pos + 1
    setTheme(modes[nextMode])
    setBackground(modes[nextMode])
  }

  const handleIncrease = () => {
    const curProg = progress < GOAL && progress + progressStep

    if (curProg !== 0 && !curProg) {
      return null
    }

    setProgress(curProg)
    saveAnalytics(curProg)
  }

  const handleDecrease = () => {
    const curProg = progress - progressStep >= 0 && progress - progressStep

    if (typeof curProg === 'boolean') {
      return null
    }

    setProgress(curProg)
    saveAnalytics(curProg)
  }

  const [isHovering, setIsHovering] = useState(false)
  const handleMouseOver = () => {
    setIsHovering(true)
  }

  useEffect(() => {
    if (settingsError) {
      notif.createError(
        "Uh oh! ☹️ we couldn't load your settings! Let us know if this continues",
        5000
      )
    }
  }, [!!settingsError]) // eslint-disable-line

  useLayoutEffect(() => {
    if (latestAnalytics?.data?.waterConsumed !== undefined) {
      setProgress(latestAnalytics.data.waterConsumed)
    }
  }, [latestAnalytics?.data?.waterConsumed])

  return (
    <FadeIn>
      <Flex
        onMouseOver={() => handleMouseOver()}
        onMouseLeave={() => setIsHovering(false)}
        m="auto"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        width="100%"
        height="100%"
        style={{ '--opacity': isHovering ? 1 : 0 }}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          mb="sm"
          minHeight="40px"
        >
          <Stack ml="xs" display="flex" css={hideOnHoverEls}>
            {isBlocsUser && (
              <>
                <CaretButton
                  orientation="bottom"
                  onClick={() => handleDecrease()}
                />
                <CaretButton
                  orientation="top"
                  onClick={() => handleIncrease()}
                />
              </>
            )}
          </Stack>

          <Box position="absolute" left="50%" transform="translateX(-50%)">
            <Text
              as="h1"
              textAlign="center"
              color="foreground"
              fontSize="sm"
              m={0}
              lineHeight="1"
              css={{ userSelect: 'none', textTransform: 'capitalize' }}
            >
              <TweenNum
                speed={0.02}
                num={units === 'ounce' ? literToOunce(progress) : progress}
              />{' '}
              {progress === 1 ? `${units}` : `${units}s`}
            </Text>
            <Text
              color="primary.accent-4"
              fontWeight="200"
              fontSize="xs"
              m={0}
              css={{ 'user-select': 'none' }}
            >
              {Math.min(100, Math.round((progress / GOAL) * 100))}% of your{' '}
              {isBlocsUser ? '' : "friend's"} goal
            </Text>
          </Box>

          <Box css={hideOnHoverEls}>
            {isBlocsUser && <WidgetMenuButton href="/water-tracker/menu" />}
            {!isBlocsUser && (
              <Button
                icon={isDarkMode ? <Sun /> : <Moon />}
                color="foreground"
                bg="primary.accent-2"
                size="40px"
                borderRadius="md"
                css={{
                  cursor: 'pointer',
                  transition: 'box-shadow 0.3s ease',
                  ':hover': { boxShadow: theme.shadows.default }
                }}
                onClick={() => handleThemeChange()}
              />
            )}
          </Box>
        </Flex>

        <Bowl goal={GOAL} progress={progress} />
      </Flex>
    </FadeIn>
  )
}

export default WaterTrackerMainPage
