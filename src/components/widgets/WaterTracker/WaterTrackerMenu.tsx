import Flex from '@/helpers/Flex'
import WidgetMenuButton from '../../design-system/WidgetMenuButton/WidgetMenuButton'
import Avatar from '@/design-system/Avatar'
import Moon from 'src/icons/moon'
import ButtonGroup, { ButtonGroupButton } from '@/design-system/ButtonGroup'
import Drop from 'src/icons/drop-icon'
import Pencil from 'src/icons/pencil'
import LinkIcon from 'src/icons/link-icon'
import useColorMode from '../../../hooks/useColorMode/index'
import useNotifications from '@/design-system/Notifications/useNotifications'
import FadeIn from '@/helpers/FadeIn'
import useFetchShareableLink from '../../../hooks/useFetchShareableLink'
import useWaterTrackerSettings from './hooks/useWaterTrackerSettings'
import usePatchWaterTrackerSettings from './hooks/usePatchSettings'
import UpdateGoalModal from './UpdateGoalModal'
import { useState } from 'react'
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import { UrlHash } from './types'
import useDarkMode from '@/hooks/useDarkMode'
import Sun from '../../../icons/sun'
import { CopyIcon } from 'src/icons/copy'
import Box from '@/helpers/Box'
import TextInput from '@/design-system/TextInput'
import Text from '@/design-system/Text'
import WidgetModal from '../WidgetModal/WidgetModal'
import Icon from '@/helpers/Icon'

const colorModeText = {
  dark: 'Dark Mode',
  light: 'Light Mode',
  auto: 'System'
}

const WaterTrackerMenu = () => {
  const prefersDark = useDarkMode()
  const { colorMode, setTheme, setBackground } = useColorMode()
  const isDarkMode = (() =>
    colorMode === 'dark' || (prefersDark && colorMode === 'auto'))()
  const { fetcher: fetchShareableLink } = useFetchShareableLink('WATER_TRACKER')
  const { data: settings, mutate: mutateSettings } = useWaterTrackerSettings()
  const { patchUnits, loadingUnits } = usePatchWaterTrackerSettings()
  const { role } = useUrlHash() as UrlHash
  const [shareableLink, setShareableLink] = useState('')

  const [openGoalModal, setOpenGoalModal] = useState(false)

  const handleThemeChange = () => {
    const modes = ['dark', 'light', 'auto']
    const pos = modes.findIndex((mode) => mode == colorMode)

    const nextMode = pos + 1 >= 3 ? 0 : pos + 1
    setTheme(modes[nextMode])
    setBackground(modes[nextMode])
  }

  const handleUnitsChange = async () => {
    const units = ['liter', 'ounce']
    const pos = units.indexOf(settings?.data?.units)
    const nextMode = pos === 1 ? 0 : pos + 1
    const nextUnit = units[nextMode] as 'liter' | 'ounce'

    await patchUnits(nextUnit)
    mutateSettings()
  }

  const notifs = useNotifications()

  const copyShareableLink = async () => {
    try {
      const data = await fetchShareableLink()
      const shareableLink = `${window.location.origin}/water-tracker?token=${data.shareableToken}&role=friend`
      setShareableLink(shareableLink)
      try {
        window.navigator.clipboard.writeText(shareableLink)
      } catch (err) {
        console.error('Could not copy shareable link to clipboard')
      }

      notifs.createInfo('The link has been copied')
    } catch (err) {
      console.error(err)
      notifs.createError("Oops ! we couldn't create the link")
    }
  }

  return (
    <Flex width="100%" height="100%" flexDirection="column" position="relative">
      <Flex
        top={0}
        left={0}
        justifyContent="space-between"
        width="100%"
        position="absolute"
        zIndex="10"
      >
        {role === 'blocs-user' && (
          <Avatar
            alt="your profile picture"
            variant="sm"
            src={settings?.data?.avatarUrl}
          />
        )}
        <WidgetMenuButton href="/water-tracker" isOpen />
      </Flex>
      <FadeIn css={{ display: 'flex', height: '100%' }}>
        <ButtonGroup gap={['0', , 'xs']}>
          <ButtonGroupButton
            icon={isDarkMode ? <Sun /> : <Moon />}
            onClick={() => handleThemeChange()}
          >
            {colorModeText[colorMode]}
          </ButtonGroupButton>
          {/* <ButtonGroupButton
            disabled={loadingUnits}
            loading={loadingUnits}
            icon={<Drop />}
            css={{ textTransform: 'capitalize' }}
            onClick={() => handleUnitsChange()}
          >
            {settings?.data?.units}
          </ButtonGroupButton> */}
          <ButtonGroupButton
            icon={<Pencil />}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setOpenGoalModal(true)
            }}
          >
            Update goal
          </ButtonGroupButton>
          <ButtonGroupButton
            icon={<LinkIcon />}
            onClick={() => copyShareableLink()}
          >
            Shareable Link
          </ButtonGroupButton>
        </ButtonGroup>

        <UpdateGoalModal
          open={openGoalModal}
          closeModal={() => {
            setOpenGoalModal(false)
          }}
        />
      </FadeIn>

      <WidgetModal
        open={!!shareableLink}
        closeModal={() => setShareableLink('')}
        appendTo="#wt-widget-wrapper"
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
              Sometimes copying doesn&apos;t work in the app, so you need to
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
                stroke="neutral.white"
                display="flex"
                m="auto"
              >
                <CopyIcon />
              </Icon>
            </Box>
          </Box>
        </Flex>
      </WidgetModal>
    </Flex>
  )
}

export default WaterTrackerMenu
