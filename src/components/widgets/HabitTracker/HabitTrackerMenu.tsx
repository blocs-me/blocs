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
import WidgetModal from '../WidgetModal/WidgetModal'
import Flex from '@/helpers/Flex'
import TextInput from '@/design-system/TextInput'
import Text from '@/design-system/Text'
import Button from '@/design-system/Button'
import { CopyIcon } from 'src/icons/copy'
import Icon from '@/helpers/Icon'
import useUrlHash from '@/hooks/useUrlHash'
import { UrlHash } from '../WaterTracker/types'

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
  const [shareableLink, setShareableLink] = useState('')
  const { role } = useUrlHash<UrlHash>()

  const { fetcher: fetchShareableLink, loading: isShareLinkLoading } =
    useFetchShareableLink('HABIT_TRACKER')
  const copyShareableLink = async () => {
    try {
      const data = await fetchShareableLink()
      const shareableLink = `${window.location.origin}/habit-tracker?token=${data.shareableToken}&role=friend`

      try {
        window.navigator?.clipboard?.writeText(shareableLink)
      } catch (err) {
        console.error('could not copy yo clipboard')
      }

      setShareableLink(shareableLink)
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

          {role === 'blocs-user' && (
            <ButtonGroupButton
              disabled={isShareLinkLoading}
              icon={<LinkIcon />}
              onClick={() => copyShareableLink()}
            >
              Shareable Link
            </ButtonGroupButton>
          )}
          {role === 'blocs-user' && (
            <ButtonGroupButton
              icon={<Pencil />}
              onClick={() => handleManageHabits()}
            >
              Manage Habits
            </ButtonGroupButton>
          )}
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

      <WidgetModal
        open={!!shareableLink}
        closeModal={() => setShareableLink('')}
        appendTo="#ht-modal-wrapper"
      >
        <Flex p="md" flexDirection="column">
          <Text
            fontSize="sm"
            letterSpacing="sm"
            color="foreground"
            textAlign="center"
          >
            You can copy the link here. <br />
            <Box
              width="100%"
              as="small"
              p="xxs"
              borderRadius="5px"
              bg="primary.accent-2"
            >
              Sometimes copying doesn&quot;t work in the app, so you need to
              copy it manually
            </Box>
          </Text>
          <Box position="relative">
            <TextInput
              htmlFor="Shareable Link"
              ariaLabel="Shareable Link"
              name="Shareable Link"
              value={shareableLink}
              type="text"
              readOnly
            />

            <Box
              css={{
                transition: 'transform ease 0.1s',
                '&:active': {
                  transform: 'scale(0.9)'
                }
              }}
              bg="success.medium"
              as="button"
              boxShadow="default"
              display="flex"
              p="xxs"
              borderRadius="sm"
              width="32px"
              height="32px"
              position="absolute"
              top="6px"
              right="0.5rem"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window?.navigator?.clipboard.writeText(shareableLink)
              }}
            >
              <Icon
                as="span"
                width="20px"
                stroke="foreground"
                display="flex"
                m="auto"
              >
                <CopyIcon />
              </Icon>
            </Box>
          </Box>
        </Flex>
      </WidgetModal>
    </>
  )
}

export default HabitTrackerMenu
