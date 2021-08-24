/** @jsxImportSource @emotion/react */
import { AnimatePresence, m, domAnimation, LazyMotion } from "framer-motion"
import { useRouter } from "next/router"
import WidgetLayout from "@/helpers/WidgetLayout"
import PomodoroMainPage from "./PomodoroMainPage/index.js"
import PomodoroMainMenu from "./PomodoroMainMenu"
import PomodoroSettings from "./PomodoroSettings"
import { PomodoroProvider } from "./usePomodoroStore"

import PomodoroLabels from "./PomodoroPresets/index.js"
import Notifications from "@/design-system/Notifications/index.js"
import useNotifications from "@/design-system/Notifications/useNotifications.js"
import ClientSideOnly from "@/helpers/ClientSideOnly/index.js"
import PomodoroThemeMenu from "./PomdoroThemeMenu/index.js"
import useWidgetAuth, { useWidgetAuthDispatch } from "@/hooks/useWidgetAuth.js"
import WidgetModal from "../WidgetModal/index.js"
import Text from "@/design-system/Text/index.js"
import Flex from "@/helpers/Flex/index.js"
import Button from "@/design-system/Button/index.js"
import Link from "@/design-system/Link/index.js"
import useDidMount from "@/hooks/useDidMount.js"
import { useEffect, useState } from "react"

const FadeIn = ({ id, children }) => (
  <LazyMotion features={domAnimation}>
    <m.div
      key={id}
      style={{ width: "100%", height: "100%" }}
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
  const { NotifProvider } = useNotifications()
  const { slug } = router.query
  const mainPage = !slug
  const mainMenu = slug && slug[0] === "main-menu"
  const settingsMenu = slug && slug[0] === "settings"
  const labelsMenu = slug && slug[0] === "labels"
  const themeMenu = slug && slug[0] === "theme"

  const onMenuClick = () => {
    if (mainPage) router.push("/pomodoro/main-menu")
    else router.back()
  }

  const getIconType = () => {
    if (mainPage) return "hamburger"
    return "back-arrow"
  }

  const [authModal, setAuthModal] = useState(false)

  const { isLoggingIn, isLoggedIn } = useWidgetAuth({
    onError: () => setAuthModal(true),
  })

  return (
    <>
      <PomodoroProvider>
        <NotifProvider>
          <WidgetLayout
            onMenuClick={onMenuClick}
            iconType={getIconType()}
            hideMenuIcon={!isLoggedIn}
          >
            <Notifications>
              <AnimatePresence exitBeforeEnter initial={false}>
                {mainPage && (
                  <FadeIn id="main-page" key={1}>
                    <PomodoroMainPage />
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
                    <PomodoroLabels />
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
                css={{ textAlign: "center" }}
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
                  You will need to go back to the dashboard and create another
                  link
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
          </WidgetLayout>
        </NotifProvider>
      </PomodoroProvider>
    </>
  )
}

export default Pomodoro
