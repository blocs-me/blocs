import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import useColorMode from '@/hooks/useColorMode'
import { BlocsLogo } from 'src/icons/blocs-logo'
import Moon from 'src/icons/moon'
import Sun from 'src/icons/sun'
import useIsTrueDarkMode from '@/hooks/useIsTrueDarkMode'
import Button from '@/design-system/Button'
import Link from 'next/link'
import Avatar from '@/design-system/Avatar'
import useUser from '@/hooks/useUser'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import { ReactNode, forwardRef } from 'react'

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
  const { user } = useUser()

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
      pl="150px"
      pr="md"
      borderBottom="solid 1px"
      borderColor="primary.accent-1"
    >
      <Flex size="50px">
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
        <Avatar variant="sm" alt="profile picture" src={user?.avatar_url} />
      </Flex>
    </Flex>
  )
}

export default DashboardNav
