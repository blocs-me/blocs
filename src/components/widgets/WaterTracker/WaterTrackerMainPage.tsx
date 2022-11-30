import CaretButton from '@/design-system/CaretButton'
import Text from '@/design-system/Text'
import WidgetMenuButton from '@/design-system/WidgetMenuButton'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Stack from '@/helpers/Stack'
import Bowl from './Bowl'
import { useState } from 'react'
import TweenNum from './TweenNum'
import { css } from '@emotion/react'
import FadeIn from '@/helpers/FadeIn'
import { useWaterTrackerStore } from './hooks/useWaterTracker/useWaterTracker'
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import { UrlHash } from './types'

const GOAL = 3 // TODO: replace with fetched values

const hideOnHoverEls = css`
  opacity: var(--opacity);
  transition: opacity 0.3s ease;
`

const WaterTrackerMainPage = () => {
  const [progress, setProgress] = useState(0)
  const handleIncrease = () => progress !== GOAL && setProgress(progress + 1)
  const handleDecrease = () => progress && setProgress(progress - 1)
  const { role } = useUrlHash<UrlHash>()
  const isBlocsUser = role === 'blocs-user'

  const [isHovering, setIsHovering] = useState(false)
  const handleMouseOver = () => {
    if (isBlocsUser) setIsHovering(true)
  }

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
              css={{ 'user-select': 'none' }}
            >
              <TweenNum speed={0.02} num={progress} />{' '}
              {progress === 1 ? 'Liter' : 'Liters'}
            </Text>
            <Text
              color="primary.accent-4"
              fontWeight="200"
              fontSize="xs"
              m={0}
              css={{ 'user-select': 'none' }}
            >
              {Math.ceil((progress / GOAL) * 100)}% of your goal
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
