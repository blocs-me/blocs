import { useState } from 'react'
import Avatar from '@/design-system/Avatar'
import ButtonGroup, { ButtonGroupButton } from '@/design-system/ButtonGroup'
import Box from '@/helpers/Box'
import FadeIn from '@/helpers/FadeIn'
import useIsTrueDarkMode from '@/hooks/useIsTrueDarkMode'
import EyeClosed from 'src/icons/eye-closed'
import LinkIcon from 'src/icons/link-icon'
import Moon from 'src/icons/moon'
import Sun from 'src/icons/sun'
import useColorMode from '../../../hooks/useColorMode/index'
import EyeOpened from '../../../icons/eye-opened'
import storage from '@/utils/storage'
import useFetchShareableLink from '@/hooks/useFetchShareableLink'
import useNotifications from '../../design-system/Notifications/useNotifications'
import Pencil from '../../../icons/pencil'
import HabitManagerModal from './HabitManagerModal'

const colorModeText = {
  dark: 'Dark Mode',
  light: 'Light Mode',
  auto: 'System'
}

const HabitTrackerMenu = ({
  hideAnalytics,
  isAnalyticsHidden
}: {
  hideAnalytics: (arg: boolean) => void
  isAnalyticsHidden: boolean
}) => {
  const { colorMode, setTheme, setBackground } = useColorMode()
  const isDarkMode = useIsTrueDarkMode()
  const [showHabitsManager, setShowHabitsManger] = useState(false)
  const toggleAnalytics = () => {
    storage.setItem('isAnalyticsHidden', JSON.stringify(!isAnalyticsHidden))
    hideAnalytics(!isAnalyticsHidden)
  }
  const notifs = useNotifications()

  const { fetcher: fetchShareableLink, loading: isShareLinkLoading } =
    useFetchShareableLink('HABIT_TRACKER')
  const copyShareableLink = async () => {
    try {
      const data = await fetchShareableLink()
      const shareableLink = `${window.location.origin}/habit-tracker?token=${data.shareableToken}&role=friend`
      window.navigator.clipboard.writeText(shareableLink)
      notifs.createInfo('The link has been copied')
    } catch (err) {
      console.error(err)
      notifs.createError("Oops ! we couldn't create the link")
    }
  }

  const handleThemeChange = () => {
    const modes = ['dark', 'light', 'auto']
    const pos = modes.findIndex((mode) => mode == colorMode)

    const nextMode = pos + 1 >= 3 ? 0 : pos + 1
    setTheme(modes[nextMode])
    setBackground(modes[nextMode])
  }

  const handleManageHabits = () => setShowHabitsManger(!showHabitsManager)
  return (
    <>
      <FadeIn
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <ButtonGroup>
          <Box minWidth="200px" />
          <ButtonGroupButton
            icon={isDarkMode ? <Sun /> : <Moon />}
            onClick={() => handleThemeChange()}
          >
            {colorModeText[colorMode]}
          </ButtonGroupButton>
          <ButtonGroupButton
            icon={isAnalyticsHidden ? <EyeOpened /> : <EyeClosed />}
            onClick={() => toggleAnalytics()}
          >
            {isAnalyticsHidden ? 'Show Analytics' : 'Hide Analytics'}
          </ButtonGroupButton>

          <ButtonGroupButton
            disabled={isShareLinkLoading}
            icon={<LinkIcon />}
            onClick={() => copyShareableLink()}
          >
            Shareable Link
          </ButtonGroupButton>
          <ButtonGroupButton
            icon={<Pencil />}
            onClick={() => handleManageHabits()}
          >
            Manage Habits
          </ButtonGroupButton>
        </ButtonGroup>
      </FadeIn>
      <FadeIn>
        <Box position="absolute" top="sm" left="sm">
          <Avatar variant="sm" src={'/'} alt="Profile Picture" />
        </Box>
      </FadeIn>
      <HabitManagerModal
        isOpen={showHabitsManager}
        handleClose={() => handleManageHabits()}
      />
    </>
  )
}

export default HabitTrackerMenu
