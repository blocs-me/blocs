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

  const auth = useWidgetAuth()

  return (
    <PomodoroProvider>
      <NotifProvider>
        <WidgetLayout
          onMenuClick={onMenuClick}
          iconType={getIconType()}
          hideMenuIcon={false}
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
        </WidgetLayout>
      </NotifProvider>
    </PomodoroProvider>
  )
}

export default Pomodoro
