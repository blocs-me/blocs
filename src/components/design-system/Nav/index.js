import themeGet from '@styled-system/theme-get'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { color } from 'styled-system'
import styled from '@emotion/styled'
import Link from 'next/link'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import Box from '@/helpers/Box'
import Text from '../Text'
import BetaWrapper from '../BetaWrapper'
import Stack from '@/helpers/Stack'
import { useClickOutside } from '@/hooks/useClickOutside'
import Avatar from '../Avatar'
import Button from '../Button'
import useMediaQuery from '@/hooks/useMediaQuery'
import PageGutters from '@/helpers/PageGutters'
import useIsTrueDarkMode from '@/hooks/useIsTrueDarkMode'
import Sun from 'src/icons/sun'
import Moon from 'src/icons/moon'
import useColorMode from '@/hooks/useColorMode'
import { useUser } from '@supabase/auth-helpers-react'
import useBlocsUser from '@/hooks/useBlocsUser'
import { BlocsLogo as Logo } from 'src/icons/blocs-logo'

export const A = styled(Text)`
  text-decoration: none;
  text-transform: capitalize;
  font-size: ${themeGet('fontSizes.sm')};
  ${color}

  &:hover {
    color: ${themeGet('colors.primary.accent-4')};
  }

  cursor: pointer;
  transition: color 0.2s ease;
`

export const NavLink = ({
  href,
  text = '',
  passHref = false,
  as = 'a',
  preload = false
}) => {
  const { pathname } = useRouter()

  const active = (() => {
    if (pathname === '/' && href === '/') return true

    return pathname === href
  })()

  return (
    <Flex
      height="100%"
      borderBottom="solid 2px"
      borderBottomColor={active ? 'foreground' : 'transparent'}
      alignSelf={['center', , , , 'end']}
      alignItems="center"
    >
      <Link href={href} passHref={passHref} prefetch={preload}>
        <A as={as} color={'foreground'} fontSize="sm" isActive={active}>
          {text}
        </A>
      </Link>
    </Flex>
  )
}

const Hamburger = ({ open }) => {
  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Box
        width="20px"
        height="2px"
        borderRadius="2px"
        bg="foreground"
        css={{
          transition: 'transform 0.5s ease',
          transform: open
            ? 'rotate(45deg) translateY(1px)'
            : 'rotate(0deg) translateY(-2px)',
          transformOrigin: 'center center'
        }}
      />
      <Box
        width="20px"
        height="2px"
        borderRadius="2px"
        bg="foreground"
        css={{
          transition: 'transform 0.5s ease',
          transform: open
            ? 'rotate(-45deg) translateY(-1px)'
            : 'rotate(0deg) translateY(2px)',
          transformOrigin: 'center center'
        }}
      />
    </Flex>
  )
}

const Nav = ({ title = '', links = [] }) => {
  const [hideNav, setHideNav] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 992px)')
  const mobileNavContainer = useRef(null)
  const prevScrollPos = useRef(0)
  const isDarkMode = useIsTrueDarkMode()
  const { setTheme, setBackground } = useColorMode()
  const user = useUser()
  const blocsUser = useBlocsUser()

  const isSignedIn = user?.aud === 'authenticated'

  const handleThemeChange = (e) => {
    e.stopPropagation()
    e.preventDefault()

    if (isDarkMode) {
      setTheme('light')
      setBackground('light')
    } else {
      setTheme('dark')
      setBackground('dark')
    }
  }

  const handleScroll = (ev) => {
    const currentPos = window.scrollY

    if (currentPos > 0 && currentPos > prevScrollPos.current)
      !hideNav && setHideNav(true)
    else setHideNav(false)

    prevScrollPos.current = currentPos
  }

  const toggleMobileNav = (e) => {
    setShowMobileNav(!showMobileNav)
  }

  useClickOutside({
    onClickOutside: () => !isDesktop && setShowMobileNav(false),
    element: mobileNavContainer
  })

  useEffect(() => {
    setShowMobileNav(isDesktop)
  }, [isDesktop])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box
      as="nav"
      ref={mobileNavContainer}
      width="100%"
      aria-label="Main Navigation"
      alignItems="center"
      position="fixed"
      top="0"
      left="0"
      zIndex="nav"
      bg={isDarkMode ? 'rgba(34,34,34,0.9)' : 'rgba(255,255,255,0.8)'}
      css={{
        transform: `translateY(var(--translateY))`,
        transition: 'transform 0.5s ease',
        backdropFilter: 'blur(5px) saturate(50%)'
      }}
      style={{ '--translateY': hideNav ? '-100%' : '0' }}
      borderBottom="solid 1px"
      borderBottomColor="primary.accent-2"
    >
      <Box width="100%" bg="neutral.black">
        <Text fontSize="sm" textAlign={'center'} mb="0" color="neutral.white">
          🎉 It is BLACK FRIDAY! Enjoy an 50% discount using code <b>BF2023</b>
        </Text>
      </Box>
      <PageGutters height={'80px'}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          height="100%"
        >
          <div css={{ flex: 1 }}>
            <Link href="/" passHref prefetch>
              <a aria-label="blocs home page">
                <Icon
                  css={{ svg: { verticalAlign: 'middle' } }}
                  stroke="secondary"
                  fill="secondary"
                  role="img"
                  alt="Blocs Logo"
                >
                  <Box width={['32px', '32px', '50px']}>
                    <Logo />
                  </Box>
                </Icon>
              </a>
            </Link>
          </div>
          {title && (
            <Flex flex={1} justifyContent="center">
              <BetaWrapper css={{ padding: '0px' }}>
                <Text
                  letterSpacing="md"
                  fontSize={['xs', 'xs', , 'sm', 'md', 'lg']}
                  mb={0}
                  fontWeight="bold"
                  color="primary.accent-3"
                >
                  {title}
                </Text>
              </BetaWrapper>
            </Flex>
          )}
          <Flex
            display={['flex', 'flex', , , 'none']}
            justifyContent="flex-end"
            alignItems="center"
            flex={1}
            as="button"
            onClick={(e) => toggleMobileNav()}
            aria-label="Open / Close Main Navigation"
            aria-pressed={showMobileNav}
          >
            <Icon
              size="20px"
              css={{
                lineHeight: 0,
                height: 'fit-content',
                pointerEvent: 'none'
              }}
            >
              <Hamburger open={showMobileNav} />
            </Icon>
          </Flex>
          <Box
            position={['fixed', 'fixed', , , 'relative']}
            right={['sm', 'sm', , , 0]}
            top={['calc(80px + 1rem)', 'calc(80px + 1rem)', , , 0]}
            bg={['background', 'background', , , 'transparent']}
            p={['md', 'md', , , 0]}
            borderRadius={['md', 'md', , , 0]}
            boxShadow={['lg', 'lg', , , 'none']}
            height={['fit-content', , , , '100%']}
            css={{
              flex: 1,
              opacity: 'var(--opacity)',
              transform: 'var(--transform)',
              transition: 'opacity 1s ease '
            }}
            style={{
              '--opacity': showMobileNav ? 1 : 0,
              '--transform': showMobileNav
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(1000px, 0, 0)'
            }}
          >
            <Stack
              display="flex"
              ml={[0, 0, , , 'md']}
              pt={['sm', 'sm', , , '0']}
              flexDirection={['column', 'column', , , 'row']}
              alignItems="center"
              justifyContent="flex-end"
              height="100%"
            >
              <NavLink href="/" text="Home" passHref preload />
              <NavLink href="/pricing" text="pricing" passHref preload />
              <NavLink
                href="https://glittery-ankle-1a8.notion.site/FAQs-0fd5043a0536496597ba827a5f0596b7"
                text="FAQs"
                passHref
              />
              {!isSignedIn && (
                <Box pt={['1.5rem', , , , '0']} pb={['0.5rem', '0.5rem', 0]}>
                  <Link href="/sign-in" passHref prefetch>
                    <Button as="a" variant="primary" borderRadius="sm">
                      Sign In
                    </Button>
                  </Link>
                </Box>
              )}
              <Button
                aria-label="Color Theme Toggle"
                color="foreground"
                icon={isDarkMode ? <Sun /> : <Moon />}
                onClick={(e) => handleThemeChange(e)}
              />
              {isSignedIn && (
                <Link href="/dashboard/pomodoro">
                  <a>
                    <Avatar
                      loading={!blocsUser?.user}
                      variant="sm"
                      src={blocsUser.user?.data?.avatar_url}
                      alt="User Profile"
                    />
                  </a>
                </Link>
              )}
            </Stack>
          </Box>
        </Flex>
      </PageGutters>
    </Box>
  )
}

export default Nav
