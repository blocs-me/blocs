import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import Button from '@/design-system/Button'
import useColorMode from '@/hooks/useColorMode'
import { BlocsLogo } from 'src/icons/blocs-logo'
import Moon from 'src/icons/moon'
import Sun from 'src/icons/sun'
import useIsTrueDarkMode from '@/hooks/useIsTrueDarkMode'
import { useRouter } from 'next/router'
import useBlocsUser from '@/hooks/useBlocsUser'
import useNotifications from '@/design-system/Notifications/useNotifications'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { SignOutIcon } from 'src/icons/signout-icon'
import Stopwatch from 'src/icons/stopwatch'
import { Writing } from 'src/icons/writing'
import Drop from 'src/icons/drop-icon'
import Hourglass from 'src/icons/hourglass'
import ProgressBarIcon from 'src/icons/progress-bar-icon'
import ClockIcon from 'src/icons/clock-icon'
import CalendarIcon from 'src/icons/calendar-icon'
import { useEffect, useRef, useState } from 'react'
import { isLifestylePro } from '@/lambda/helpers/subscriptionChecker'
import Icon from '@/helpers/Icon'

const tabs = [
  { path: 'pomodoro', label: 'Pomodoro', icon: <Stopwatch /> },
  { path: 'habit-tracker', label: 'Habits', icon: <Writing /> },
  { path: 'water-tracker', label: 'Water', icon: <Drop /> },
  { path: 'countdown', label: 'Countdown', icon: <Hourglass /> },
  { path: 'progress-bar', label: 'Progress', icon: <ProgressBarIcon /> },
  { path: 'clock', label: 'Clock', icon: <ClockIcon /> },
  { path: 'calendar', label: 'Calendar', icon: <CalendarIcon /> }
]

const Tab = ({ label, icon, isActive, onClick }) => (
  <Flex
    as="button"
    alignItems="center"
    px="sm"
    py="xs"
    borderRadius="md"
    bg={isActive ? 'brand.accent-5' : 'transparent'}
    color={isActive ? 'brand.accent-1' : 'primary.accent-4'}
    css={{
      border: 'none',
      cursor: 'pointer',
      gap: '6px',
      fontSize: '14px',
      fontWeight: isActive ? 600 : 400,
      transition: 'all 0.15s ease',
      '&:hover': {
        backgroundColor: isActive ? undefined : 'var(--colors-primary-accent-2)',
        color: 'var(--colors-brand-accent-1)'
      }
    }}
    onClick={onClick}
  >
    <Icon fill="currentColor" stroke="currentColor" width="14px" height="14px" display="flex" as="span">
      {icon}
    </Icon>
    {label}
  </Flex>
)

const AccountDropdown = ({ onClose }: { onClose: () => void }) => {
  const { purchases, isUserOnFreeTrial, user } = useBlocsUser()
  const isPremium = isLifestylePro(purchases)
  const supabase = useSupabaseClient()
  const notif = useNotifications()
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      notif.createError('Something went wrong when trying to sign out')
    }
  }

  const handleManageSubscription = () => {
    router.push('/dashboard/plan')
    onClose()
  }

  return (
    <Box
      ref={ref}
      position="absolute"
      top="calc(100% + 4px)"
      right="0"
      width="220px"
      bg="background"
      borderRadius="md"
      boxShadow="lg"
      p="sm"
      zIndex={200}
      border="1px solid"
      borderColor="primary.accent-2"
    >
      {isPremium && (
        <>
          <Box px="xs" py="xs" borderRadius="sm" bg="brand.accent-5" mb="xs">
            <Text fontSize="xxs" fontWeight={700} color="brand.accent-1" m={0}>
              Pro Plan
            </Text>
            <Text fontSize="10px" color="primary.accent-4" m={0} mt="2px">
              All widgets, analytics, and customization
            </Text>
          </Box>
          <Box
            as="button"
            width="100%"
            py="xs"
            px="xs"
            borderRadius="sm"
            css={{
              display: 'block',
              textAlign: 'left',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              color: 'var(--colors-primary-accent-4)',
              '&:hover': { backgroundColor: 'var(--colors-primary-accent-2)' }
            }}
            onClick={handleManageSubscription}
          >
            Manage Plan
          </Box>
        </>
      )}
      {!isPremium && (
        <>
          <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xs">
            {isUserOnFreeTrial ? 'Free Trial' : 'Free Plan'}
          </Text>
          <Box
            as="button"
            width="100%"
            py="xs"
            px="xs"
            borderRadius="sm"
            bg="brand.accent-1"
            color="neutral.white"
            css={{
              display: 'block',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              '&:hover': { opacity: 0.85 }
            }}
            onClick={() => router.push('/pricing')}
          >
            Upgrade to Pro
          </Box>
        </>
      )}

      <Box height="1px" bg="primary.accent-2" my="xs" />

      <Box
        as="button"
        width="100%"
        py="xs"
        px="xs"
        borderRadius="sm"
        color="foreground"
        css={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '13px',
          '&:hover': { backgroundColor: 'var(--colors-primary-accent-2)' }
        }}
        onClick={handleSignOut}
      >
        <Icon fill="currentColor" width="14px" height="14px" display="flex" as="span">
          <SignOutIcon />
        </Icon>
        Sign Out
      </Box>
    </Box>
  )
}

const UpgradePill = () => {
  const { purchases } = useBlocsUser()
  const router = useRouter()
  const isPremium = isLifestylePro(purchases)

  if (isPremium) return null

  return (
    <Box
      as="button"
      px="xs"
      py="4px"
      borderRadius="sm"
      bg="brand.accent-1"
      color="neutral.white"
      css={{
        border: 'none',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        '&:hover': { opacity: 0.85 }
      }}
      onClick={() => router.push('/pricing')}
    >
      Upgrade
    </Box>
  )
}

const DashboardNav = () => {
  const { setTheme, setBackground } = useColorMode()
  const isDarkMode = useIsTrueDarkMode()
  const router = useRouter()
  const { path } = router.query
  const [showDropdown, setShowDropdown] = useState(false)

  const handleThemeChange = () => {
    if (isDarkMode) {
      setBackground('light')
      setTheme('light')
    } else {
      setBackground('dark')
      setTheme('dark')
    }
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      height="60px"
      bg="background"
      px="md"
      borderBottom="solid 1px"
      borderColor="primary.accent-2"
    >
      <Flex alignItems="center" css={{ gap: '16px' }}>
        <Flex
          size="35px"
          onClick={() => router.push('/')}
          css={{ cursor: 'pointer', flexShrink: 0 }}
        >
          <BlocsLogo />
        </Flex>

        <Flex css={{ gap: '4px' }} alignItems="center">
          {tabs.map((tab) => (
            <Tab
              key={tab.path}
              label={tab.label}
              icon={tab.icon}
              isActive={path === tab.path}
              onClick={() => router.push(`/dashboard/${tab.path}`)}
            />
          ))}
        </Flex>
      </Flex>

      <Flex css={{ gap: '12px' }} alignItems="center">
        <UpgradePill />
        <Button
          p="0"
          onClick={handleThemeChange}
          color="foreground"
          icon={isDarkMode ? <Sun /> : <Moon />}
        />
        <Box position="relative">
          <Box
            as="button"
            px="xs"
            py="4px"
            borderRadius="sm"
            bg={showDropdown ? 'primary.accent-2' : 'transparent'}
            color="foreground"
            css={{
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
              '&:hover': { backgroundColor: 'var(--colors-primary-accent-2)' }
            }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Account
          </Box>
          {showDropdown && (
            <AccountDropdown onClose={() => setShowDropdown(false)} />
          )}
        </Box>
      </Flex>
    </Flex>
  )
}

export default DashboardNav
