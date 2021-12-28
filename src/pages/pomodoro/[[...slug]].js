import useNotifications from "@/design-system/Notifications/useNotifications"
import AllWidgetProviders from "@/helpers/AllWidgetProviders"
import { ColorModeProvider } from "@/hooks/useColorMode"
import { WidgetAuthProvider } from "@/hooks/useWidgetAuth"
import Pomodoro from "@/widgets/Pomodoro"
import { PomodoroProvider } from "@/widgets/Pomodoro/usePomodoroStore"
import WidgetPage from "@/widgets/WidgetPage"
import pomodoroThemes from "src/styles/themes/pomodoroThemes"

const colorModeOptions = {
  getTheme: pomodoroThemes,
  defaultColorMode: "dark",
}

export default function MainPomodoro() {
  return (
    <AllWidgetProviders colorModeOptions={colorModeOptions}>
      <PomodoroProvider>
        <WidgetPage>
          <Pomodoro />
        </WidgetPage>
      </PomodoroProvider>
    </AllWidgetProviders>
  )
}
