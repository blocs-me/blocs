import { useState } from 'react'
import Button from '@/design-system/Button'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Icon from '@/helpers/Icon'
import fadeIn from '@/keyframes/fadeIn'
import Ellipses from 'src/icons/ellipses'
import Pencil from 'src/icons/pencil'
import Trash from 'src/icons/trash'
import Flex from '../../../helpers/Flex/index'

const HabitRow = ({ id, title, setAction }) => {
  const [actionsModal, setActionsModal] = useState(false)

  return (
    <Flex
      p="xs"
      pl="0"
      borderRadius="sm"
      justifyContent="space-between"
      position="relative"
    >
      <Text
        color="foreground"
        fontSize="sm"
        fontWeight={200}
        m={0}
        height="100%"
        textAlign="left"
      >
        {title}
      </Text>
      <Box
        ml="sm"
        position="relative"
        onMouseOver={() => setActionsModal(true)}
        onMouseLeave={() => setActionsModal(false)}
        css={{
          cursor: 'pointer',
          '&:before': {
            content: "''",
            position: 'absolute',
            height: '30px',
            width: '100%',
            bottom: 0,
            right: 0,
            transform: 'translateY(15px)'
          }
        }}
        height="100%"
      >
        <Box
          bg="primary.accent-2"
          p="xxs"
          borderRadius="sm"
          hoverBg="primary.accent-1"
        >
          <Icon width="20px" fill="foreground" css={{ display: 'flex' }}>
            <Ellipses />
          </Icon>
        </Box>

        {actionsModal && (
          <Flex
            zIndex="300"
            alignItems="start"
            justifyContent="center"
            flexDirection="column"
            bg="primary.accent-1"
            p="xs"
            borderRadius="md"
            boxShadow="default"
            position="absolute"
            width="100px"
            height="fit-content"
            top={0}
            right={0}
            transform="translateY(50%)"
            css={{
              animation: `${fadeIn} 0.3s ease`
            }}
          >
            <Button
              borderRadius="sm"
              fontSize="xxs"
              color="success.medium"
              icon={<Pencil />}
              gap="xs"
              css={{ '&:hover': { opacity: 0.8 } }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setAction({
                  mode: 'edit',
                  habit: {
                    title,
                    id
                  }
                })
              }}
            >
              Edit
            </Button>
            <Box pt="xxs" />
            <Button
              css={{ '&:hover': { opacity: 0.8 } }}
              gap="xs"
              fontSize="xxs"
              borderRadius="sm"
              color="danger.medium"
              icon={<Trash />}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setAction({
                  mode: 'delete',
                  habit: {
                    title,
                    id
                  }
                })
              }}
            >
              Delete
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  )
}

export default HabitRow
