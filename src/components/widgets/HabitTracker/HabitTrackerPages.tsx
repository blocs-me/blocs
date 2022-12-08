import Box from '@/helpers/Box'
import Notifications from '@/design-system/Notifications'
import HabitTrackerMainPage from './HabitTrackerMainPage'
import WidgetMenuButton from '@/design-system/WidgetMenuButton'
import { useState } from 'react'
import { useRouter } from 'next/router'
import HabitTrackerMenu from './HabitTrackerMenu'
import useMediaQuery from '@/hooks/useMediaQuery'
import storage from '@/utils/storage'

const HabitTrackerLayout = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isAnalyticsHidden, hideAnalytics] = useState(
    storage.getItem('isAnalyticsHidden') === 'true'
  )
  const { path } = useRouter().query

  const isMenu = path?.[0] === 'menu'
  const isSmallScreen = useMediaQuery('(max-width: 600px)')

  return (
    <Box
      width={isSmallScreen || isAnalyticsHidden ? 'auto' : '100%'}
      maxWidth="600px"
      minWidth="340px"
      minHeight="400px"
      bg="background"
      boxShadow="default"
      borderRadius="lg"
      p="md"
      position="relative"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ '--opacity': isHovering ? 1 : 0 }}
      overflow="hidden"
      css={{
        aspectRatio: isSmallScreen || isAnalyticsHidden ? '0.72' : '1.25'
      }}
    >
      <Notifications>
        {!isMenu && (
          <HabitTrackerMainPage isAnalyticsHidden={isAnalyticsHidden} />
        )}
        {isMenu && (
          <HabitTrackerMenu
            isAnalyticsHidden={isAnalyticsHidden}
            hideAnalytics={hideAnalytics}
          />
        )}

        <Box
          position="absolute"
          top="sm"
          right="sm"
          css={{
            opacity: 'var(--opacity)',
            transition: 'opacity 0.3s ease'
          }}
        >
          <WidgetMenuButton
            href={isMenu ? '/habit-tracker' : '/habit-tracker/menu'}
            isOpen={isMenu}
          />
        </Box>
        <div id="ht-modal-wrapper"></div>
      </Notifications>
    </Box>
  )
}

export default HabitTrackerLayout
