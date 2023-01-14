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
import useNotifications from '../../design-system/Notifications/useNotifications'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import useBlocsUser from '@/hooks/useBlocsUser'

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

const Sidebar = () => {
  const { path } = useRouter().query
  const notif = useNotifications()
  const supabase = useSupabaseClient()
  const { user } = useBlocsUser()

  const handleUpgrade = () => {}
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      notif.createError('Something went wrong when trying to sign out')
    }
  }

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      bg="background"
      width="350px"
      borderRight="solid 1px"
      borderColor="primary.accent-2"
      px="md"
      py="md"
      height="calc(100vh - 80px)"
      position="sticky"
      top="0"
      left="0"
    >
      <Flex flexDirection="column" alignItems="center">
        <Avatar
          src={user?.data?.avatar_url}
          loading={!user}
          alt="profile picture"
        />
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
            to="/dashboard/guide"
            icon={<Document />}
            isActive={path === 'guide'}
            text="Guide"
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
        border="solid 1px"
        color="brand.accent-1"
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
