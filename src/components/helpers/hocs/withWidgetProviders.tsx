import useColorMode, { ColorModeProvider } from '@/hooks/useColorMode'
import { ComponentType } from 'react'
import { ThemeProvider } from '@emotion/react'
import useNotifications from '@/design-system/Notifications/useNotifications'
import Notifications from '@/design-system/Notifications'
import { useInitUrlHash } from '@/hooks/useUrlHash/useUrlHash'
import { WithChildren } from '@/utils/tsUtils'

const withWidgetProviders = <Props,>(
  Component: ComponentType<WithChildren<{}>>
) => {
  return (props: Props extends WithChildren<{}> ? Props : any) => {
    const { NotifProvider } = useNotifications()
    const { hash, URLHashProvider } = useInitUrlHash<{
      role: string
      token: string
    }>()

    return (
      <URLHashProvider hash={hash}>
        <ColorModeProvider>
          <NotifProvider>
            <Component {...props}>
              <Notifications zIndex="2000">
                {props.children}
                <div id="wt-widget-modal"></div>
              </Notifications>
            </Component>
          </NotifProvider>
        </ColorModeProvider>
      </URLHashProvider>
    )
  }
}

export default withWidgetProviders
