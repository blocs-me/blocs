import { ColorModeProvider } from "@/hooks/useColorMode"
import { WidgetAuthProvider } from "@/hooks/useWidgetAuth"
import Pomodoro from "@/widgets/Pomodoro"
import WidgetPage from "@/widgets/WidgetPage"

export default function MainPomodoro() {
  return (
    <ColorModeProvider>
      <WidgetAuthProvider>
        <WidgetPage>
          <Pomodoro />
        </WidgetPage>
      </WidgetAuthProvider>
    </ColorModeProvider>
  )
}
