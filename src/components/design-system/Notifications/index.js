import { useTheme } from '@emotion/react'
import slideIn from 'src/styles/keyframes/slideIn'
import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'

import useNotifications, {
  ERROR_NOTIF,
  INFO_NOTIF,
  SUCCESS_NOTIF
} from './useNotifications'

const getNotifBgColor = (theme, notifType) => {
  switch (notifType) {
    case ERROR_NOTIF:
      return theme.colors.danger
    case INFO_NOTIF:
    case SUCCESS_NOTIF:
      return theme.colors.success.dark
    default:
      return theme.colors.success.dark
  }
}

const NotifItem = ({ type, content = '', isLastItem }) => {
  const theme = useTheme()
  const bgColor = getNotifBgColor(theme, type)

  return (
    <div
      css={{
        position: 'absolute',
        top: 0,
        animation: `${slideIn} 0.2s ease forwards`,
        zIndex: theme.zIndices.notification
      }}
    >
      <Flex
        borderRadius="lg"
        boxShadow="lg"
        bg={bgColor}
        width="fit-content"
        zIndex="notification"
        minWidth="200px"
        minHeight="50px"
        alignItems="center"
        justifyContent="center"
        p="xs"
        color="primary.accent-1"
        style={{
          transform: !isLastItem ? 'scale(0.9) translateY(10px)' : 'none',
          opacity: isLastItem ? 1 : 0.7
        }}
        css={{
          textAlign: 'center',
          transition: '0.2s opacity ease, transform 0.2s ease'
        }}
      >
        <Text
          fontSize="xs"
          textAlign="center"
          fontWeight="300"
          lineHeight={1.5}
          m={0}
        >
          {content}
        </Text>
      </Flex>
    </div>
  )
}

const NotifContainer = (props) => {
  const { useNotifs } = useNotifications()
  const notifs = useNotifs()

  return (
    <Flex
      position="absolute"
      pd="md"
      top="0"
      left="50%"
      width="100%"
      justifyContent="center"
      p="sm"
      css={{ transform: 'translate(-50%)' }}
      {...props}
    >
      <Flex flexDirection="column" position="relative" alignItems="center">
        {notifs.slice(0, 2).map((item) => (
          <NotifItem
            {...item}
            key={item.id}
            isLastItem={notifs.slice(-1)[0].id === item.id}
          />
        ))}
      </Flex>
    </Flex>
  )
}

const Notifications = (props) => {
  const { NotifProvider } = useNotifications()

  return (
    <NotifProvider>
      {props.children}
      <NotifContainer {...props} />
    </NotifProvider>
  )
}

export default Notifications
