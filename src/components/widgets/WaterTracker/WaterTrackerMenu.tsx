import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import WidgetMenuButton from '../../design-system/WidgetMenuButton/WidgetMenuButton'
import Avatar from '@/design-system/Avatar'
import Stack from '@/helpers/Stack'
import Button from '@/design-system/Button'
import Moon from 'src/icons/moon'
import ButtonGroup, { ButtonGroupButton } from '@/design-system/ButtonGroup'
import Drop from 'src/icons/drop-icon'
import Pencil from 'src/icons/pencil'
import LinkIcon from 'src/icons/link-icon'
import useColorMode from '../../../hooks/useColorMode/index'
import WidgetModal from '@/widgets/WidgetModal'
import Link from 'next/link'
import useNotifications from '@/design-system/Notifications/useNotifications'
import FadeIn from '@/helpers/FadeIn'

const colorModeText = {
  dark: 'Dark Mode',
  light: 'Light Mode',
  auto: 'System'
}

const WaterTrackerMenu = () => {
  const { colorMode, setTheme, setBackground } = useColorMode()
  const units = ['liter', 'ounce', 'milliliters']

  const handleThemeChange = () => {
    const modes = ['dark', 'light', 'auto']
    const pos = modes.findIndex((mode) => mode == colorMode)

    const nextMode = pos + 1 >= 3 ? 0 : pos + 1
    setTheme(modes[nextMode])
    setBackground(modes[nextMode])
  }

  const shareableLink = '/test' // TODO: use fetched data
  const notifs = useNotifications()

  const copyShareableLink = () => {
    window.navigator.clipboard.writeText(shareableLink)
    notifs.createInfo('The link has been copied')
  }

  return (
    <Flex width="100%" height="100%" flexDirection="column" position="relative">
      <Flex
        top={0}
        left={0}
        justifyContent="space-between"
        width="100%"
        zIndex="20"
        position="absolute"
      >
        {/* TODO: add dynamic profile picture */}
        <Avatar alt="your profile picture" variant="sm" />
        <WidgetMenuButton href="/water-tracker" isOpen />
      </Flex>
      <FadeIn css={{ display: 'flex', height: '100%' }}>
        <ButtonGroup gap={['0', , 'xs']}>
          <ButtonGroupButton
            icon={<Moon />}
            onClick={() => handleThemeChange()}
          >
            {colorModeText[colorMode]}
          </ButtonGroupButton>
          <ButtonGroupButton icon={<Drop />}>Liters</ButtonGroupButton>
          <Link passHref href="https://blocs.me/dashboard/water-tracker">
            <ButtonGroupButton as="a" icon={<Pencil />}>
              Update goal
            </ButtonGroupButton>
          </Link>
          <ButtonGroupButton
            icon={<LinkIcon />}
            onClick={() => copyShareableLink()}
          >
            Shareable Link
          </ButtonGroupButton>
        </ButtonGroup>
      </FadeIn>
    </Flex>
  )
}

export default WaterTrackerMenu
