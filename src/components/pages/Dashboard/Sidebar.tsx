import Avatar from '@/design-system/Avatar'
import Button from '@/design-system/Button'
import Flex from '@/helpers/Flex'
import { PRO_PLAN_NAME } from '@/constants/planNames'
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
import Sparkles from '@/design-system/Sparkles'
import Box from '@/helpers/Box'
import float from '@/keyframes/float'
import daysBetween from '@/utils/dateUtils/daysBetween'
import { isLifestylePro, isLifestyleBasic } from '@/lambda/helpers/subscriptionChecker'
import Giftbox from 'src/icons/giftbox'

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
  const router = useRouter()
  const { path } = router.query
  const notif = useNotifications()
  const supabase = useSupabaseClient()
  const { user, purchases } = useBlocsUser()
  const isPremium = !!user?.data?.purchasedProducts?.length
  const fourteenDays = 1000 * 60 * 60 * 24 * 14
  const daysLeft = Math.max(
    0,
    14 -
    daysBetween(
      new Date(),
      new Date(
        user?.data?.freeTrialStartedAt || new Date().getTime() - fourteenDays
      )
    )
  )

  const handleUpgrade = () => router.push('/pricing')
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
        {isLifestyleBasic(purchases) && (
          <Box mt="md" boxShadow="default" borderRadius="md" bg="background">
            <Button
              bg="brand.accent-1"
              loading={!user}
              fontWeight={500}
              fontSize="sm"
              py="sm"
              px="sm"
              width="250px"
              color="neutral.white"
              borderRadius="sm"
              as="div"
              textAlign={'center'}
              css={{ userSelect: 'none' }}
            >
              Lifestyle Basic
            </Button>
          </Box>
        )}
        {isPremium && isLifestyleBasic(purchases) && (
          <Box mt="md">
            <Button
              css={{ animation: `${float} 1s alternate infinite` }}
              loading={!user}
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
          </Box>
        )}
        {!isPremium && (
          <Box mt="md">
            <Button
              css={{ animation: `${float} 1s` }}
              loading={!user}
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
              Free Trial{' '}
              {daysLeft > 0 && (
                <small>
                  ({daysLeft} day{daysLeft === 1 ? '' : 's'} left)
                </small>
              )}
              {daysLeft === 0 && <small>(expired)</small>}
            </Button>
          </Box>
        )}
        {isLifestylePro(purchases) && (
          <Box mt="md" boxShadow="default" borderRadius="md" bg="background">
            <Button
              bg="brand.accent-1"
              loading={!user}
              fontWeight={500}
              fontSize="sm"
              py="sm"
              px="sm"
              width="250px"
              color="neutral.white"
              borderRadius="sm"
              as="div"
              textAlign={'center'}
              css={{ userSelect: 'none' }}
            >
              {purchases.lifetimeAccess ? ("Lifetime Access") : (PRO_PLAN_NAME)}
            </Button>
          </Box>
        )}
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
