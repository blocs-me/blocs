/** @jsxImportSource @emotion/react */
import { AnimatePresence, m, domAnimation, LazyMotion } from 'framer-motion'
import Router, { useRouter } from 'next/router'
import PomodoroMainPage from './PomodoroMainPage/index.js'
import PomodoroMainMenu from './PomodoroMainMenu'
import PomodoroSettings from './PomodoroSettings'
import { usePomodoroStore } from './usePomodoroStore'
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
import Hamburger from 'src/icons/hamburger'
import { useTheme } from '@emotion/react'

const FadeIn = ({ id, children }) => (
  <LazyMotion features={domAnimation}>
    <m.div
      key={id}
      style={{ width: '100%', height: '100%' }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </m.div>
  </LazyMotion>
)

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
          <AnimatePresence exitBeforeEnter initial={false}>
            {mainPage && (
              <FadeIn id="main-page" key={1}>
                <PomodoroMainPage isHovering={hovering} />
              </FadeIn>
            )}
            {mainMenu && (
              <FadeIn id="main-menu" key={2}>
                <PomodoroMainMenu />
              </FadeIn>
            )}
            {settingsMenu && (
              <FadeIn id="settings" key={3}>
                <PomodoroSettings />
              </FadeIn>
            )}
            {labelsMenu && (
              <FadeIn id="labels" key={4}>
                <PomodoroPresets />
              </FadeIn>
            )}
            {themeMenu && (
              <FadeIn id="themeMenu" key={5}>
                <PomodoroThemeMenu />
              </FadeIn>
            )}
          </AnimatePresence>
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
              href="https://blocs.me/dashboard"
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
            onClick={() => {
              const link =
                mainPage || isMenuSubPage ? '/pomodoro/main-menu' : '/pomodoro'
              Router.push(link)
            }}
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
            {(mainMenu || mainPage) && (
              <Icon
                m="auto"
                fill="foreground"
                width="15px"
                height="15px"
                display="flex"
              >
                {<Hamburger isOpen={mainMenu} />}
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
        </Box>
        <div id="pomo-modal-wrapper" />
      </Box>
    </>
  )
}

export default Pomodoro
