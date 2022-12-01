import CaretButton from '@/design-system/CaretButton'
import Text from '@/design-system/Text'
import WidgetMenuButton from '@/design-system/WidgetMenuButton'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Stack from '@/helpers/Stack'
import Bowl from './Bowl'
import { useEffect, useState } from 'react'
import TweenNum from './TweenNum'
import { css } from '@emotion/react'
import FadeIn from '@/helpers/FadeIn'
import { useWaterTrackerStore } from './hooks/useWaterTracker/useWaterTracker'
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import { UrlHash } from './types'
import useWaterTrackerSettings from './hooks/useWaterTrackerSettings'
import useNotifications from '@/design-system/Notifications/useNotifications'
import { literToOunce } from '@/utils/math/literToOunce'
import { ounceToLiter } from '@/utils/math'

const hideOnHoverEls = css`
  opacity: var(--opacity);
  transition: opacity 0.3s ease;
`

const WaterTrackerMainPage = () => {
  const [progress, setProgress] = useState(0)
  const { role } = useUrlHash<UrlHash>()
  const isBlocsUser = role === 'blocs-user'
  const { data: settings, error: settingsError } = useWaterTrackerSettings()
  const units = settings?.data?.units || 'liter'
  const GOAL =
    units === 'ounce'
      ? ounceToLiter(settings?.data?.goal, false)
      : settings?.data?.goal || 4
  const notif = useNotifications()

  const progressStep = units === 'liter' ? 1 : GOAL / Math.floor(GOAL)

  const handleIncrease = () =>
    progress.toFixed(4) < GOAL.toFixed(4) &&
    setProgress(progress + progressStep)
  const handleDecrease = () =>
    progress - progressStep >= 0 && setProgress(progress - progressStep)

  const [isHovering, setIsHovering] = useState(false)
  const handleMouseOver = () => {
    if (isBlocsUser) setIsHovering(true)
  }

  useEffect(() => {
    if (settingsError) {
      notif.createError(
        "Uh oh! ☹️ we couldn't load your settings! Let us know if this continues",
        5000
      )
    }
  }, [!!settingsError]) // eslint-disable-line

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
          {isBlocsUser && (
            <Stack ml="xs" display="flex" css={hideOnHoverEls}>
              <CaretButton
                orientation="bottom"
                onClick={() => handleDecrease()}
              />
              <CaretButton orientation="top" onClick={() => handleIncrease()} />
            </Stack>
          )}

          <Box position="absolute" left="50%" transform="translateX(-50%)">
            <Text
              as="h1"
              textAlign="center"
              color="foreground"
              fontSize="sm"
              m={0}
              lineHeight="1"
              css={{ 'user-select': 'none', textTransform: 'capitalize' }}
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
              {Math.round((progress / GOAL) * 100)}% of your goal
            </Text>
          </Box>

          <Box css={hideOnHoverEls}>
            {isBlocsUser && <WidgetMenuButton href="/water-tracker/menu" />}
          </Box>
        </Flex>

        <Bowl goal={GOAL} progress={progress} />
      </Flex>
    </FadeIn>
  )
}

export default WaterTrackerMainPage
