import { useRef, useState } from 'react'

import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import {
  resetPomodoroSession,
  setCurrentPomodoroPreset,
  setPomodoroPresetMode,
  setStartedAt
} from '../pomodoroActions'
import { usePomodoroDispatch } from '../usePomodoroStore'
import Ellipses from '../../../../icons/ellipses.svg'
import Card from '@/design-system/Card'
import Icon from '@/helpers/Icon'
import FadeIn from '@/helpers/FadeIn'
import Box from '@/helpers/Box'
import { useClickOutside } from '@/hooks/useClickOutside'
import Stack from '@/helpers/Stack'
import minsAsms from '@/utils/minsAsms'
import msToMins from '@/utils/msToMins'
import { POMODORO_INTERVAL_MODE } from '../pomodoroPresetModes'
import { useTheme } from '@emotion/react'
import Button from '@/design-system/Button'
import Pencil from 'src/icons/pencil'
import Trash from 'src/icons/trash'

const EllipsesIcon = ({ selected, menuOpen }) => (
  <Icon
    width="20px"
    stroke={selected || menuOpen ? 'primary.accent-4' : 'primary.accent-3'}
  >
    <Ellipses css={{ transition: 'fill ease 0.2s' }} />
  </Icon>
)

const PresetItem = ({
  selected = false,
  preset = {},
  initEditForm,
  initDeleteForm
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pomodoroDispatch = usePomodoroDispatch()
  const container = useRef()
  const swatch = useRef()
  const theme = useTheme()
  const {
    labelColor,
    label,
    pomodoroInterval,
    longBreakInterval,
    shortBreakInterval,
    id,
    notEditable
  } = preset

  useClickOutside({
    element: container,
    onClickOutside: () => menuOpen && setMenuOpen(false)
  })

  const resetPomodoro = () => {
    pomodoroDispatch(resetPomodoroSession())
    pomodoroDispatch(setStartedAt(null))
    pomodoroDispatch(setPomodoroPresetMode(POMODORO_INTERVAL_MODE))
  }

  const handleClick = () => {
    resetPomodoro()
    pomodoroDispatch(setCurrentPomodoroPreset(preset))
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    initDeleteForm()
  }
  const handleEdit = (e) => {
    e.stopPropagation()
    initEditForm()
  }
  const handleMouseOver = () => {
    !selected && swatch.current?.style.setProperty('--opacity', 1)
  }
  const handleMouseLeave = () => {
    !selected && swatch.current?.style.setProperty('--opacity', 0.5)
  }

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen)
    handleClick()
  }

  return (
    <Flex
      ref={container}
      justifyContent="space-between"
      alignItems="center"
      overflow="visible"
      position="relative"
      bg="primary.accent-2"
      boxShadow={selected ? 'default' : 'none'}
      borderRadius="md"
    >
      <Flex
        onMouseOver={() => handleMouseOver()}
        onMouseLeave={() => handleMouseLeave()}
        width="100%"
        css={{
          transition: 'border ease 0.2s, box-shadow ease 0.2s, height ease 0.2s'
        }}
        boxShadow={selected ? 'md' : 'none'}
        border={selected ? 'solid 1px' : 'none'}
        borderColor={selected ? 'foreground' : 'primary.accent-3'}
        borderRadius="md"
        position="relative"
        alignItems="center"
        as="button"
        onClick={() => handleClick()}
        flexDirection="column"
        p={0}
      >
        <Flex
          width="100%"
          p="xs"
          borderBottom="solid 1px"
          borderColor={selected ? 'foreground' : 'primary.accent-3'}
        >
          <Text
            color={selected ? 'foreground' : 'primary.accent-3'}
            m={0}
            p={0}
            fontWeight="bold"
            fontSize="xs"
            lineHeight={1}
            textAlign="left"
          >
            {label}
          </Text>
        </Flex>

        <Text as="div" fontSize="xxs" css={{ width: '100%' }}>
          <Flex p="xs" justifyContent="start" width="100%">
            <Flex
              width="10px"
              borderRadius="lg"
              bg="var(--bg)"
              mr="xs"
              style={{ '--bg': labelColor, '--opacity': selected ? 1 : 0.5 }}
              css={{
                transition: 'opacity 0.2s ease',
                opacity: 'var(--opacity)'
              }}
              ref={swatch}
              alignSelf="stretch"
            />
            <Flex
              position="relative"
              flex="1"
              flexDirection="column"
              alignItems="start"
              css={{ gap: '5px' }}
            >
              <Flex
                fontSize="xs"
                width="100%"
                color="foreground"
                justifyContent="space-between"
              >
                <span>pomo.</span>
                <span>{msToMins(pomodoroInterval)}m</span>
              </Flex>

              <Flex
                fontSize="xs"
                width="100%"
                color="foreground"
                justifyContent="space-between"
              >
                <span>long break</span>
                <span>{msToMins(longBreakInterval)}m</span>
              </Flex>

              <Flex
                fontSize="xs"
                width="100%"
                color="foreground"
                justifyContent="space-between"
              >
                <span>short break</span>
                <span>{msToMins(shortBreakInterval)}m</span>
              </Flex>
            </Flex>
          </Flex>
        </Text>
      </Flex>
      <Box position="absolute" overflow="visible" top="xxs" right="xxs">
        {!notEditable && (
          <Icon
            fill="primary.accent-4"
            stroke="primary.accent-4"
            as="button"
            onClick={() => handleMenuOpen()}
            css={{
              '&:hover': {
                color: theme.colors.foreground,
                transform: 'scale(1.1)'
              }
            }}
          >
            <EllipsesIcon selected={selected} menuOpen={menuOpen} />
          </Icon>
        )}

        {menuOpen && (
          <Box
            position="absolute"
            top="1rem"
            right="0"
            zIndex="10"
            width="100px"
          >
            <FadeIn duration="0.2s">
              <Card
                bg="primary.accent-1"
                borderRadius="md"
                p="xs"
                css={{
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Stack
                  display="flex"
                  mt="xxs"
                  flexDirection="column"
                  alignItems="start"
                >
                  <Button
                    css={{ '&:hover': { opacity: 0.8 } }}
                    onClick={(e) => handleEdit(e)}
                    fontSize="xxs"
                    borderRadius="sm"
                    color="success.medium"
                    gap="xs"
                    icon={<Pencil />}
                  >
                    Edit
                  </Button>
                  <Button
                    css={{ '&:hover': { opacity: 0.8 } }}
                    onClick={(e) => handleDelete(e)}
                    fontSize="xxs"
                    borderRadius="sm"
                    color="danger.medium"
                    gap="xs"
                    icon={<Trash />}
                  >
                    Delete
                  </Button>
                </Stack>
              </Card>
            </FadeIn>
          </Box>
        )}
      </Box>
    </Flex>
  )
}

export default PresetItem
