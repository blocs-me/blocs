import Avatar from '@/design-system/Avatar'
import Button from '@/design-system/Button'
import Flex from '@/helpers/Flex'
import useUser from '@/hooks/useUser'
import { useTheme } from '@emotion/react'
import Link from 'next/link'
import { Document } from 'src/icons/document'
import Drop from 'src/icons/drop-icon'
import Stopwatch from 'src/icons/stopwatch'
import { Writing } from 'src/icons/writing'
import Gear from '../../../icons/gear.svg'
import { SignOutIcon } from '../../../icons/signout-icon'
import { useRouter } from 'next/router'

const NavButton = ({ to, isActive, text, icon }) => {
  return (
    <Link href={to} passHref>
      <Button
        width="250px"
        as="a"
        py="xs"
        px="md"
        borderRadius="sm"
        icon={icon}
        color={isActive ? 'brand.accent-1' : 'primary.accent-4'}
        bg={isActive ? 'brand.accent-5' : 'transparent'}
        hoverColor={'brand.accent-1'}
        hoverBg={'brand.accent-5'}
        fontSize="sm"
      >
        {text}
      </Button>
    </Link>
  )
}

const Sidebar = ({ avatarUrl }) => {
  const { path } = useRouter().query
  const { logout } = useUser()

  const handleUpgrade = () => {}
  const handleSignOut = () => logout()

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      bg="background"
      width="350px"
      borderRight="solid 1px"
      borderColor="primary.accent-1"
      px="md"
      py="md"
      height="calc(100vh - 70px)"
      position="sticky"
      top="0"
      left="0"
    >
      <Flex flexDirection="column" alignItems="center">
        <Avatar src={avatarUrl} alt="profile picture" />
        <Button
          mt="md"
          fontWeight={200}
          fontSize="sm"
          py="sm"
          px="sm"
          width="250px"
          bg="foreground"
          color="background"
          borderRadius="sm"
          onClick={() => handleUpgrade()}
        >
          Upgrade
        </Button>

        <Flex
          mt="md"
          flexDirection="column"
          width="250px"
          css={{ gap: '0.5rem' }}
        >
          <NavButton
            to="/dashboard/pomodoro"
            icon={<Stopwatch />}
            isActive={path === 'pomodoro'}
            text="Pomodoro"
          />
          <NavButton
            to="/dashboard/habit-tracker"
            icon={<Writing />}
            isActive={path === 'habit-tracker'}
            text="Habit Tracker"
          />
          <NavButton
            to="/dashboard/water-tracker"
            icon={<Drop />}
            isActive={path === 'water-tracker'}
            text="Water Tracker"
          />
          <NavButton
            to="/dashboard/guides"
            icon={<Document />}
            isActive={path === 'guides'}
            text="Guides"
          />
          <NavButton
            to="/dashboard/settings"
            icon={<Gear />}
            isActive={path === 'settings'}
            text="Settings"
          />
        </Flex>
      </Flex>
      <Button
        mt="sm"
        p="xs"
        width="200px"
        borderRadius="sm"
        color="brand.accent-1"
        borderColor="brand.accent-1"
        border="solid 1px"
        fontWeight={200}
        fontSize="sm"
        onClick={() => handleSignOut()}
        icon={<SignOutIcon />}
      >
        Sign out
      </Button>
    </Flex>
  )
}

export default Sidebar
