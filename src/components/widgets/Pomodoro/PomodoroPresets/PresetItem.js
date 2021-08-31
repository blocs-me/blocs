import { useRef, useState } from "react"

import Text from "@/design-system/Text"
import Flex from "@/helpers/Flex"
import {
  resetPomodoroSession,
  setCurrentPomodoroPreset,
} from "../pomodoroActions"
import { usePomodoroDispatch, usePomodoroStore } from "../usePomodoroStore"
import Ellipses from "../../../../icons/ellipses.svg"
import Trash from "../../../../icons/trash.svg"
import Pencil from "../../../../icons/pencil.svg"
import Card from "@/design-system/Card"
import Icon from "@/helpers/Icon"
import FadeIn from "@/helpers/FadeIn"
import Box from "@/helpers/Box"
import { useClickOutside } from "@/hooks/useClickOutside"
import Stack from "@/helpers/Stack"
import minsAsms from "@/utils/minsAsms"
import msToMins from "@/utils/msToMins"

const EllipsesIcon = ({ selected, menuOpen }) => (
  <Icon
    width="20px"
    stroke={selected || menuOpen ? "primary.accent-4" : "primary.accent-1"}
  >
    <Ellipses css={{ transition: "fill ease 0.2s" }} />
  </Icon>
)

const PresetItem = ({
  selected = false,
  preset = {},
  initEditForm,
  initDeleteForm,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = usePomodoroDispatch()
  const container = useRef()
  const swatch = useRef()
  const {
    labelColor,
    label,
    pomodoroInterval,
    longBreakInterval,
    shortBreakInterval,
    id,
    notEditable,
  } = preset

  useClickOutside({
    element: container,
    onClickOutside: () => menuOpen && setMenuOpen(false),
  })

  const handleClick = () => {
    dispatch(resetPomodoroSession())
    dispatch(setCurrentPomodoroPreset(preset))
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
    !selected && swatch.current?.style.setProperty("--opacity", 1)
  }
  const handleMouseLeave = () => {
    !selected && swatch.current?.style.setProperty("--opacity", 0.5)
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
    >
      <Flex
        onMouseOver={() => handleMouseOver()}
        onMouseLeave={() => handleMouseLeave()}
        width="100%"
        padding="xs"
        mr="sm"
        css={{
          transition:
            "border ease 0.2s, box-shadow ease 0.2s, height ease 0.2s",
        }}
        boxShadow={selected ? "md" : "none"}
        border="solid 1px"
        borderColor={selected ? "primary.accent-4" : "primary.accent-1"}
        borderRadius="md"
        position="relative"
        minHeight="55px"
        alignItems="center"
        as="button"
        onClick={() => handleClick()}
      >
        <Flex
          width="30px"
          borderRadius="sm"
          bg="var(--bg)"
          mr="xs"
          style={{ "--bg": labelColor, "--opacity": selected ? 1 : 0.5 }}
          css={{ transition: "opacity 0.2s ease", opacity: "var(--opacity)" }}
          ref={swatch}
          alignSelf="stretch"
        />
        <Flex
          position="relative"
          flex="1"
          flexDirection="column"
          alignItems="start"
          py="xs"
          pl="xs"
        >
          <Text
            color={selected ? "primary.accent-4" : "primary.accent-2"}
            m={0}
            p={0}
            fontWeight="400"
            lineHeight={1}
            textAlign="left"
          >
            {label}
          </Text>

          <Text
            fontSize="xxs"
            color={"primary.accent-2"}
            mb={0}
            mt="xs"
            lineHeight={0}
          >
            {selected && "pomodoro :"} {msToMins(pomodoroInterval) + " mins"}
          </Text>
          {selected && (
            <Text
              fontSize="xxs"
              color={"primary.accent-2"}
              mb={0}
              mt="sm"
              lineHeight={0}
            >
              long break : {msToMins(longBreakInterval) + " mins"}
            </Text>
          )}
          {selected && (
            <Text
              fontSize="xxs"
              color={"primary.accent-2"}
              mb={0}
              mt="sm"
              lineHeight={0}
            >
              short break : {msToMins(shortBreakInterval) + " mins"}
            </Text>
          )}
        </Flex>
      </Flex>

      <Box position="relative" overflow="visible">
        {!notEditable && (
          <button onClick={() => handleMenuOpen()} css={{ padding: 0 }}>
            <EllipsesIcon selected={selected} menuOpen={menuOpen} />
          </button>
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
                borderRadius="md"
                px="xs"
                py="sm"
                css={{ textAlign: "left" }}
              >
                <Stack display="flex" flexDirection="column" mt="xs">
                  <Text
                    css={{ display: "flex" }}
                    as="button"
                    fontSize="xs"
                    color="primary.accent-3"
                    textAlign="left"
                    onClick={(e) => handleEdit(e)}
                  >
                    <Icon
                      as="span"
                      display="inline-block"
                      mb={0}
                      mr="xs"
                      fill="primary.accent-4"
                      width="9px"
                    >
                      <Pencil />
                    </Icon>
                    edit
                  </Text>
                  <Text
                    css={{ display: "flex" }}
                    as="button"
                    fontSize="xs"
                    color="primary.accent-3"
                    textAlign="left"
                    onClick={(e) => handleDelete(e)}
                  >
                    <Icon
                      as="span"
                      display="inline-block"
                      mb={0}
                      mr="xs"
                      fill="danger"
                      width="8px"
                    >
                      <Trash />
                    </Icon>
                    delete
                  </Text>
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
