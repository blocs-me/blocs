import { useState } from 'react'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Avatar from '@/design-system/Avatar'
import Gear from '../../../../icons/gear.svg'
import ThemeIcon from '../../../../icons/invert-color.svg'
import Plant from '../../../../icons/plant.svg'
import { useColorModeStore } from '@/hooks/useColorMode'
import { useWidgetAuthStore } from '@/hooks/useWidgetAuth'
import Stopwatch from 'src/icons/stopwatch'
import ButtonGroup, { ButtonGroupButton } from '@/design-system/ButtonGroup'
import Link from 'next/link'
import { CircleHalf } from 'src/icons/circle-half'

const menuItems = [
  {
    href: '/pomodoro/settings',
    title: 'settings',
    itemIcon: <Gear />
  },
  {
    href: '/pomodoro/labels',
    title: 'pomodoro',
    itemIcon: <Stopwatch />
  },
  {
    href: '/pomodoro/theme',
    title: 'theme',
    itemIcon: <ThemeIcon />,
    iconProps: {
      fill: 'primary.accent-3',
      stroke: 2
    }
  }
]

const PomodoroMainMenu = () => {
  const [avatarMenu, setAvatarMenu] = useState(false)
  const colorMode = useColorModeStore()

  const { user } = useWidgetAuthStore() || {}

  return (
    <Flex
      width="100%"
      height="100%"
      position="relative"
      p="md"
      alignItems="center"
      justifyContent="center"
    >
      <Box position="absolute" top="0" left="0">
        <Box
          position="relative"
          onMouseOver={() => setAvatarMenu(true)}
          onClick={() => setAvatarMenu(!avatarMenu)}
          onMouseLeave={() => setAvatarMenu(false)}
        >
          <div css={{ cursor: 'pointer' }}>
            <Avatar alt="profile picture" variant="sm" src={user?.avatar_url} />
          </div>
          {/* <AnimatePresence>
            {avatarMenu && (
              <LazyMotion features={domAnimation}>
                <m.div
                  key="avatar-menu"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <Card p="sm" mt="xs">
                    <Stack flexDirection="column" mt="xs">
                      <Link passHref href="/" target="_blank">
                        <Text
                          as="span"
                          color="primary.accent-2"
                          fontSize="xs"
                          mb={0}
                          target="_blank"
                        >
                          🏠 dashboard
                        </Text>
                      </Link>
                      <Link
                        passHref
                        href="https://glittery-ankle-1a8.notion.site/FAQs-0fd5043a0536496597ba827a5f0596b7"
                        target="_blank"
                      >
                        <Text
                          color="primary.accent-2"
                          as="span"
                          fontSize="xs"
                          mb={0}
                        >
                          🤔 FAQs
                        </Text>
                      </Link>
                      <Link
                        passHref
                        href="https://glittery-ankle-1a8.notion.site/pomodoro-guide-8c1c69370f904b1084b221dc3e4acd3a"
                        target="_blank"
                      >
                        <Text
                          color="primary.accent-2"
                          as="span"
                          fontSize="xs"
                          mb={0}
                        >
                          ⏰ guide
                        </Text>
                      </Link>
                      <Link href="mailto:moniet@blocs.me" passHref>
                        <Text
                          color="primary.accent-2"
                          as="span"
                          fontSize="xs"
                          mb={0}
                        >
                          🐞 bugs
                        </Text>
                      </Link>
                    </Stack>
                  </Card>
                </m.div>
              </LazyMotion>
            )}
          </AnimatePresence> */}
        </Box>
      </Box>
      <ButtonGroup css={{ '& a': { cursor: 'pointer' } }}>
        <Link href={menuItems[0].href}>
          <ButtonGroupButton p="sm" icon={<Gear />}>
            Settings
          </ButtonGroupButton>
        </Link>
        <Link href={menuItems[1].href}>
          <ButtonGroupButton p="sm" icon={<Stopwatch />}>
            Pomodoro
          </ButtonGroupButton>
        </Link>
        <Link href={menuItems[2].href}>
          <ButtonGroupButton p="sm" icon={<CircleHalf />}>
            Theme
          </ButtonGroupButton>
        </Link>
      </ButtonGroup>
      {/* <Flex
        borderRadius="999px"
        size="35px"
        position="absolute"
        bottom="sm"
        left="sm"
        border="solid 1px"
        borderColor="primary.accent-3"
        boxShadow="lg"
        as="button"
      >
        <Icon size="17px" fill="primary.accent-3" m="auto" display="flex">
          <Sun />
        </Icon>
      </Flex> */}

      {colorMode === 'light' && (
        <Box position="absolute" bottom="md" right="md" width="0.866rem">
          <Plant />
        </Box>
      )}
    </Flex>
  )
}

export default PomodoroMainMenu
