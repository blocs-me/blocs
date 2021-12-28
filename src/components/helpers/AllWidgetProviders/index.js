const {
  NotifProvider,
} = require("@/design-system/Notifications/useNotifications")
const { ColorModeProvider } = require("@/hooks/useColorMode")
const { WidgetAuthProvider } = require("@/hooks/useWidgetAuth")

const AllWidgetProviders = ({ children, colorModeOptions = {} }) => {
  return (
    <ColorModeProvider colorModeOptions={colorModeOptions}>
      <WidgetAuthProvider>
        <NotifProvider>{children}</NotifProvider>
      </WidgetAuthProvider>
    </ColorModeProvider>
  )
}

export default AllWidgetProviders
