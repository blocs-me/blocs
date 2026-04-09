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
import Avatar from '../Avatar'
import Button from '../Button'
import PageGutters from '@/helpers/PageGutters'
import useIsTrueDarkMode from '@/hooks/useIsTrueDarkMode'
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

export const NavLink = ({ href, text = '' }) => {
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
      <Link href={href} style={{ textDecoration: 'none' }}>
        <A as="span" color={'foreground'} fontSize="sm" isActive={active}>
          {text}
        </A>
      </Link>
    </Flex>
  )
}

const Nav = ({ title = '', links = [] }) => {
  const [hideNav, setHideNav] = useState(false)
  const mobileNavContainer = useRef(null)
  const prevScrollPos = useRef(0)
  const isDarkMode = useIsTrueDarkMode()
  const user = useUser()
  const blocsUser = useBlocsUser()

  const isSignedIn = user?.aud === 'authenticated'

  const handleScroll = (ev) => {
    const currentPos = window.scrollY

    if (currentPos > 0 && currentPos > prevScrollPos.current)
      !hideNav && setHideNav(true)
    else setHideNav(false)

    prevScrollPos.current = currentPos
  }

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
      {/* <Box width="100%" bg="brand.accent-1" px="xs">
        <Text fontSize="sm" textAlign={'center'} mb="0" color="neutral.white">
          ✨ We are extending our Cyber Monday deals. Get <b>40%</b> discount
          now! ✨
        </Text>
      </Box> */}
      <PageGutters height={'80px'}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          height="100%"
        >
          <div css={{ flex: 1 }}>
            <Link href="/" aria-label="blocs home page">

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
            alignItems="center"
            justifyContent="flex-end"
            height="100%"
            css={{ flex: 1, gap: '16px' }}
          >
            <NavLink href="/pricing" text="pricing" />
            <NavLink href="/blog" text="Blog" />
            {!isSignedIn && (
              <Link href="/sign-in" style={{ textDecoration: 'none' }}>
                <Button className="plausible-event-name=Nav+Sign+In" variant="primary" borderRadius="sm" fontSize="xs" py="xxs" px="xs" css={{ whiteSpace: 'nowrap' }}>
                  Sign In
                </Button>
              </Link>
            )}
            {isSignedIn && (
              <Link href="/dashboard/pomodoro">
                <Avatar
                  loading={!blocsUser?.user}
                  variant="sm"
                  src={blocsUser.user?.data?.avatar_url}
                  alt="User Profile"
                />
              </Link>
            )}
          </Flex>
        </Flex>
      </PageGutters>
    </Box>
  );
}

export default Nav
