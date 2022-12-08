import Avatar from '@/design-system/Avatar'
import ButtonGroup, { ButtonGroupButton } from '@/design-system/ButtonGroup'
import Box from '@/helpers/Box'
import FadeIn from '@/helpers/FadeIn'
import Flex from '@/helpers/Flex'
import useIsTrueDarkMode from '@/hooks/useIsTrueDarkMode'
import EyeClosed from 'src/icons/eye-closed'
import LinkIcon from 'src/icons/link-icon'
import Moon from 'src/icons/moon'
import Sun from 'src/icons/sun'
import useColorMode from '../../../hooks/useColorMode/index'
import EyeOpened from '../../../icons/eye-opened'
import storage from '@/utils/storage'

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

  const toggleAnalytics = () => {
    storage.setItem('isAnalyticsHidden', JSON.stringify(!isAnalyticsHidden))
    hideAnalytics(!isAnalyticsHidden)
  }

  const copyShareableLink = () => {}

  const handleThemeChange = () => {
    const modes = ['dark', 'light', 'auto']
    const pos = modes.findIndex((mode) => mode == colorMode)

    const nextMode = pos + 1 >= 3 ? 0 : pos + 1
    setTheme(modes[nextMode])
    setBackground(modes[nextMode])
  }

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
            icon={<LinkIcon />}
            onClick={() => copyShareableLink()}
          >
            Shareable Link
          </ButtonGroupButton>
        </ButtonGroup>
      </FadeIn>
      <FadeIn>
        <Box position="absolute" top="sm" left="sm">
          <Avatar variant="sm" src={'/'} alt="Profile Picture" />
        </Box>
      </FadeIn>
    </>
  )
}

export default HabitTrackerMenu
