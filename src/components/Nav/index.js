/** @jsxImportSource @emotion/react */
import themeGet from "@styled-system/theme-get"
import { useContext, useEffect, useRef, useState } from "react"
import { animate } from "popmotion"
import { useRouter } from "next/router"
import { color } from "styled-system"
import styled from "@emotion/styled"
import Link from "next/link"
import Flex from "../Flex"
import Logo from "../../icons/blocs-logo.svg"
import Icon from "../Icon"
import Box from "../Box"
import { PageGutters } from "../PageLayout"
import Text from "../Text"
import Stack from "../Stack"
import BetaWrapper from "../BetaWrapper"
import Hamburger from "../../icons/hamburger.svg"
import { useMediaQuery } from "beautiful-react-hooks"
import { useClickOutside } from "../../hooks/useClickOutside"
import Avatar from "../Avatar"
import useUser from "../../hooks/useUser"
import globalContext from "../../contexts/GlobalContextProvider/globalContext"
import { LOADING } from "../../constants/fetchStates"

export const A = styled(Text)`
  text-decoration: none;
  text-transform: lowercase;
  font-size: ${themeGet("fontSizes.sm")};
  ${color}

  &:hover {
    color: ${themeGet("colors.primary.dark")};
  }

  cursor: pointer;
  transition: color 0.2s ease;
`

export const NavLink = ({ href, text = "", passHref = false, as = "a" }) => {
  const { pathname } = useRouter()

  const active = (() => {
    if (pathname === "/" && href === "/") {
      return true
    }

    pathname === href ? true : pathname.includes(href)
  })()

  return (
    <Link href={href} passHref={passHref}>
      <A as={as} color={active ? "highlight" : "primary.light"} fontSize="sm">
        {text}
      </A>
    </Link>
  )
}

const Nav = ({ title = "", links = [] }) => {
  const [hideNav, setHideNav] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(true)
  const isDesktop = useMediaQuery("(min-width: 992px")
  const mobileNavContainer = useRef(null)
  const prevScrollPos = useRef(0)

  const { pathname } = useRouter()
  const isDashboard = pathname.includes("dashboard")
  const isPricing = pathname.includes("pricing")

  const { user, logout } = useUser({ shouldFetch: false })
  const { avatar_url } = user
  const [{ authValid, authState }] = useContext(globalContext)

  const handleScroll = (ev) => {
    const currentPos = window.scrollY

    if (currentPos > 0 && currentPos > prevScrollPos.current)
      !hideNav && setHideNav(true)
    else setHideNav(false)

    prevScrollPos.current = currentPos
  }

  const toggleMobileNav = () => !showMobileNav && setShowMobileNav(true)

  const scrollToWhyBlocs = () => {
    const currentYPos = window.scrollY
    const whyBlocs = document.getElementById("why-blocs")
    const whyBlocsPos = Math.floor(whyBlocs?.offsetTop)

    animate({
      to: [currentYPos, whyBlocsPos],
      onUpdate: (pos) => window.scroll(0, pos),
      type: "spring",
    })
  }

  useClickOutside({
    onClickOutside: () => !isDesktop && setShowMobileNav(false),
    element: mobileNavContainer,
  })

  useEffect(() => {
    setShowMobileNav(isDesktop)
  }, [isDesktop])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Box
      as="nav"
      width="100%"
      aria-label="Main Navigaiton"
      alignItems="center"
      position="fixed"
      top="0"
      left="0"
      zIndex="nav"
      bg="rgba(255,255,255,0.8)"
      css={{
        transform: `translateY(var(--translateY))`,
        transition: "transform 0.5s ease",
        backdropFilter: "blur(5px) saturate(50%)",
      }}
      style={{ "--translateY": hideNav ? "-100%" : "0" }}
      borderBottom="solid 1px"
      borderBottomColor="primary.lightest"
    >
      <PageGutters height="80px">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          height="100%"
        >
          <div css={{ flex: 1 }}>
            <Link href="/">
              <a>
                <Icon css={{ svg: { verticalAlign: "middle" } }}>
                  <Box width={["32px", "32px", "50px"]}>
                    <Logo />
                  </Box>
                </Icon>
              </a>
            </Link>
          </div>
          {title && (
            <Flex flex={1} justifyContent="center">
              <BetaWrapper css={{ padding: "0px" }}>
                <Text
                  letterSpacing="md"
                  fontSize={["xs", "xs", , "sm", "md", "lg"]}
                  mb={0}
                  fontWeight="bold"
                  color="primary.default"
                >
                  {title}
                </Text>
              </BetaWrapper>
            </Flex>
          )}
          <Flex
            display={["flex", "flex", , , "none"]}
            justifyContent="flex-end"
            alignItems="center"
            flex={1}
            as="button"
            onClick={() => toggleMobileNav()}
            aria-label="Navigation Links"
          >
            <Icon size="20px" css={{ lineHeight: 0, height: "fit-content" }}>
              <Hamburger css={{ verticalAlign: "middle" }} />
            </Icon>
          </Flex>
          <Box
            ref={mobileNavContainer}
            position={["fixed", "fixed", , , "relative"]}
            right={["sm", "sm", , , 0]}
            top={["calc(80px + 1rem)", "calc(80px + 1rem)", , , 0]}
            bg={["background", "background", , , "transparent"]}
            p={["sm", "sm", , , 0]}
            borderRadius={["md", "md", , , 0]}
            boxShadow={["lg", "lg", , , "none"]}
            css={{
              flex: 1,
              opacity: "var(--opacity)",
              transform: "var(--transform)",
              transition: "opacity 1s ease ",
            }}
            style={{
              "--opacity": showMobileNav ? 1 : 0,
              "--transform": showMobileNav
                ? "translate3d(0, 0, 0)"
                : "translate3d(1000px, 0, 0)",
            }}
          >
            <Stack
              display="flex"
              pl={[0, 0, , , "sm"]}
              pt={["xs", "xs", , , "0"]}
              flexDirection={["column", "column", , , "row"]}
              alignItems="center"
              justifyContent="flex-end"
            >
              <NavLink href="/" text="Home" />
              <NavLink href="/pricing" text="pricing" />
              {!isDashboard && !isPricing && (
                <A
                  as="button"
                  color="primary.light"
                  onClick={() => scrollToWhyBlocs()}
                  key={3}
                >
                  why blocs?
                </A>
              )}
              {!isDashboard && (authValid || authState === LOADING) && (
                <Link href="/dashboard">
                  <a>
                    <Avatar
                      variant="sm"
                      src={avatar_url}
                      loading={authState === LOADING}
                    />
                  </a>
                </Link>
              )}
              {isDashboard && (
                <A as="button" color="primary.light" onClick={() => logout()}>
                  🖖 Logout
                </A>
              )}
            </Stack>
          </Box>
        </Flex>
      </PageGutters>
    </Box>
  )
}

export default Nav
