import { useTheme } from '@emotion/react'
import slideIn from 'src/styles/keyframes/slideIn'
import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'
import themeGet from '@styled-system/theme-get'

import useNotifications, {
  ERROR_NOTIF,
  INFO_NOTIF,
  SUCCESS_NOTIF
} from './useNotifications'
import styled from '@emotion/styled'

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

const NotifItemContainer = styled.div`
  position: absolute;
  animation: ${slideIn} 0.2s ease forwards;
  z-index: ${themeGet('zIndices.notification')};

  @media (min-width: 320px) {
    top: 0;
  }

  @media (min-width: 768px) {
    top: 0;
    right: 0;
  }
`

const NotifItem = ({ type, content = '', isLastItem }) => {
  const theme = useTheme()
  const bgColor = getNotifBgColor(theme, type)

  return (
    <NotifItemContainer>
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
        color="neutral.white"
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
    </NotifItemContainer>
  )
}

const NotifContainer = (props) => {
  const { useNotifs } = useNotifications()
  const notifs = useNotifs()

  return (
    <Flex
      position="absolute"
      top={0}
      left="50%"
      width="100%"
      justifyContent={['center', 'center', , 'end']}
      p="sm"
      pt={['sm', 'sm', , 0]}
      css={{
        transform: 'translate(-50%)',
        display: notifs.length ? 'flex' : 'none'
      }}
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
