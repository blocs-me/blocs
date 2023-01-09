import Flex from '@/helpers/Flex'

import useColorMode from '@/hooks/useColorMode'
import { BlocsLogo } from 'src/icons/blocs-logo'
import Moon from 'src/icons/moon'
import Sun from 'src/icons/sun'
import useIsTrueDarkMode from '@/hooks/useIsTrueDarkMode'
import Button from '@/design-system/Button'
import Link from 'next/link'
import Avatar from '@/design-system/Avatar'
import Text from '@/design-system/Text'
import { ReactNode, forwardRef } from 'react'
import { useRouter } from 'next/router'
import useBlocsUser from '@/hooks/useBlocsUser'

const LinkText = forwardRef(({ children }: { children: ReactNode }, ref) => (
  <Text
    as="div"
    variant="pSmall"
    css={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
  >
    {children}
  </Text>
))

const DashboardNav = () => {
  const { setTheme, setBackground } = useColorMode()
  const isDarkMode = useIsTrueDarkMode()
  const blocsUser = useBlocsUser()
  const router = useRouter()

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
      height="80px"
      bg="background"
      pl="md"
      pr="md"
      borderBottom="solid 1px"
      borderColor="primary.accent-2"
    >
      <Flex
        size="50px"
        onClick={() => router.push('/')}
        css={{ cursor: 'pointer' }}
      >
        <BlocsLogo />
      </Flex>

      <Flex css={{ gap: '2rem' }} alignItems="center">
        <Button
          p="0"
          mb="-2px"
          onClick={() => handleThemeChange()}
          color="foreground"
          icon={isDarkMode ? <Sun /> : <Moon />}
        />

        <Link href="/">
          <a>
            <LinkText>Home</LinkText>
          </a>
        </Link>
        <Link
          href="https://glittery-ankle-1a8.notion.site/FAQs-0fd5043a0536496597ba827a5f0596b7"
          passHref
        >
          <a>
            <LinkText>FAQs</LinkText>
          </a>
        </Link>
        <Avatar
          variant="sm"
          alt="profile picture"
          loading={!blocsUser.user}
          src={blocsUser.user?.data?.avatar_url}
        />
      </Flex>
    </Flex>
  )
}

export default DashboardNav
