import Router, { useRouter } from 'next/router'
import PomodoroMainPage from './PomodoroMainPage/index.js'
import PomodoroMainMenu from './PomodoroMainMenu/index.js'
import PomodoroSettings from './PomodoroSettings/index.js'
import { usePomodoroStore } from './usePomodoroStore.js'
import PomodoroPresets from './PomodoroPresets/index.js'
import Notifications from '@/design-system/Notifications/index.js'
import PomodoroThemeMenu from './PomdoroThemeMenu/index.js'
import useWidgetAuth from '@/hooks/useWidgetAuth.js'
import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import Button from '@/design-system/Button'
import { useState } from 'react'
import Box from '@/helpers/Box/index.js'
import WidgetModal from '../LegacyWidgetModal/index.js'
import BackArrow from 'src/icons/back-arrow'
import Icon from '@/helpers/Icon/index'
import Gear from 'src/icons/gear'
import { css, useTheme } from '@emotion/react'
import FadeIn from '@/helpers/FadeIn/index.js'
import PoweredBy from '@/design-system/PoweredBy'
import PomodoroSettingsPopover from './PomodoroSettingsPopover.tsx'

const fadeInCss = css`
  width: 100%;
  height: 100%;
`

const Pomodoro = () => {
  const router = useRouter()
  const { slug } = router.query
  const mainPage = !slug
  const mainMenu = slug && slug[0] === 'main-menu'
  const settingsMenu = slug && slug[0] === 'settings'
  const labelsMenu = slug && slug[0] === 'labels'
  const themeMenu = slug && slug[0] === 'theme'
  const isMenuSubPage = settingsMenu || labelsMenu || themeMenu
  const theme = useTheme()

  const {
    session: { startedAt }
  } = usePomodoroStore()

  const [authModal, setAuthModal] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const { isLoggingIn, isLoggedIn } = useWidgetAuth({
    onError: () => setAuthModal(true)
  })

  return (
    <>
      <Box
        width="100%"
        maxWidth="385px"
        minWidth="300px"
        bg="background"
        boxShadow="default"
        css={{ aspectRatio: '0.85' }}
        borderRadius="lg"
        p="sm"
        position="relative"
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Notifications>
          {mainPage && (
            <FadeIn id="main-page" css={fadeInCss}>
              <PomodoroMainPage isHovering={hovering} />
            </FadeIn>
          )}
          {mainMenu && (
            <FadeIn id="main-menu" css={fadeInCss}>
              <PomodoroMainMenu />
            </FadeIn>
          )}
          {settingsMenu && (
            <FadeIn id="settings" css={fadeInCss}>
              <PomodoroSettings />
            </FadeIn>
          )}
          {labelsMenu && (
            <FadeIn id="labels" css={fadeInCss}>
              <PomodoroPresets />
            </FadeIn>
          )}
          {themeMenu && (
            <FadeIn id="themeMenu" css={fadeInCss}>
              <PomodoroThemeMenu />
            </FadeIn>
          )}
        </Notifications>

        <WidgetModal
          framerKey="pomodo-unauth"
          open={authModal}
          hideModal={() => {}}
          readonly
        >
          <Flex
            css={{ textAlign: 'center' }}
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            size="100%"
          >
            <Text fontSize="md" color="primary.accent-3">
              😞 Uh oh !
            </Text>
            <Text variant="pSmall">Looks like the link expired</Text>
            <Text variant="pSmall" mt="xs">
              You will need to go back to the dashboard and create another link
            </Text>

            <Button
              mt="md"
              variant="default"
              bg="primary.accent-4"
              borderRadius="md"
              as="a"
              href="https://blocs.me/dashboard/sign-in"
              target="_blank"
            >
              To the dashboard 🚀
            </Button>
          </Flex>
        </WidgetModal>
        <Box
          position="absolute"
          top="sm"
          right="sm"
          css={{
            opacity: 'var(--opacity)',
            transition: 'opacity 0.3s ease'
          }}
        >
          {/* Gear icon for main page, back arrow for sub-pages */}
          {mainPage && (
            <Flex
              as="button"
              borderRadius="md"
              alignItems="center"
              justifyContent="center"
              bg="primary.accent-2"
              p="xs"
              size="40px"
              overflow="hidden"
              opacity="var(--opacity)"
              onClick={() => setShowSettings(!showSettings)}
              style={{
                '--opacity': hovering ? 1 : 0
              }}
              css={{
                '&:hover': {
                  boxShadow: theme.shadows.default,
                  transition: 'box-shadow 0.3s ease'
                }
              }}
            >
              <Icon
                m="auto"
                fill="foreground"
                width="15px"
                height="15px"
                display="flex"
              >
                <Gear />
              </Icon>
            </Flex>
          )}

          {(mainMenu || isMenuSubPage) && (
            <Flex
              as="button"
              borderRadius="md"
              alignItems="center"
              justifyContent="center"
              bg="primary.accent-2"
              p="xs"
              size="40px"
              overflow="hidden"
              onClick={() => {
                const link = mainMenu ? '/pomodoro' : '/pomodoro/main-menu'
                Router.push(link)
              }}
              style={{
                '--opacity': hovering ? 1 : 0
              }}
              css={{
                opacity: 'var(--opacity)',
                '&:hover': {
                  boxShadow: theme.shadows.default,
                  transition: 'box-shadow 0.3s ease'
                }
              }}
            >
              {mainMenu && (
                <Icon
                  m="auto"
                  fill="foreground"
                  width="15px"
                  height="15px"
                  display="flex"
                >
                  <Gear />
                </Icon>
              )}
              {isMenuSubPage && (
                <Icon
                  display="flex"
                  m="auto"
                  stroke="foreground"
                  width="15px"
                  height="15px"
                >
                  <BackArrow />
                </Icon>
              )}
            </Flex>
          )}

          {showSettings && mainPage && (
            <PomodoroSettingsPopover onClose={() => setShowSettings(false)} isAuthenticated={isLoggedIn} />
          )}
        </Box>
        <div id="pomo-modal-wrapper" />
        <PoweredBy type="pomodoro" />
      </Box>
    </>
  )
}

export default Pomodoro
