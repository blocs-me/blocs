import ClientSideOnly from "@/helpers/ClientSideOnly"
import Flex from "@/helpers/Flex"
import useColorMode, { ColorModeProvider } from "@/hooks/useColorMode"
import Pomodoro from "@/widgets/Pomodoro"
import { PomodoroProvider } from "@/widgets/Pomodoro/usePomodoroStore"
import WidgetPage from "@/widgets/WidgetPage"
import { ThemeProvider } from "@emotion/react"
import { useMediaQuery } from "beautiful-react-hooks"
import theme, { darkModeColors } from "src/styles/theme"

export default function MainPomodoro() {
  return (
    <ColorModeProvider>
      <WidgetPage>
        <Pomodoro />
      </WidgetPage>
    </ColorModeProvider>
  )
}
