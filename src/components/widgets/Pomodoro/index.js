/** @jsxImportSource @emotion/react */
import { AnimatePresence, m, domAnimation, LazyMotion } from "framer-motion"
import { useRouter } from "next/router"
import WidgetLayout from "@/helpers/WidgetLayout"
import PomodoroMainPage from "./PomodoroMainPage.js"
import PomodoroMainMenu from "./PomodoroMainMenu.js"
import PomodoroSettings from "./PomodoroSettings.js"
import { PomodoroProvider } from "./usePomodoroStore"

import PomodoroLabels from "./PomodoroLabels.js/index.js"
import Notifications from "@/design-system/Notifications/index.js"
import useNotifications from "@/design-system/Notifications/useNotifications.js"

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

  const onMenuClick = () => {
    if (mainPage) router.push("/pomodoro/main-menu")
    else router.back()
  }

  const getIconType = () => {
    if (mainPage) return "hamburger"
    return "back-arrow"
  }

  return (
    <PomodoroProvider>
      <WidgetLayout onMenuClick={onMenuClick} iconType={getIconType()}>
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
              <FadeIn id="lables" key={4}>
                <PomodoroLabels />
              </FadeIn>
            )}
          </AnimatePresence>
        </Notifications>
      </WidgetLayout>
    </PomodoroProvider>
  )
}

export default Pomodoro
