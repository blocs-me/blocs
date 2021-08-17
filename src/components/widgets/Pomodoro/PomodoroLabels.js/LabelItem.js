import { useRef, useState } from "react"
import DropdownMenu from "@/design-system/DropdownMenu"
import Text from "@/design-system/Text"
import Flex from "@/helpers/Flex"
import {
  setCurrentPomodoroPreset,
  setPomodoroSessionLabel,
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

const LabelItem = ({ selected = false, preset = {} }) => {
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
  } = preset

  useClickOutside({
    element: container,
    onClickOutside: () => menuOpen && setMenuOpen(false),
  })

  const handleClick = () => {
    dispatch(setCurrentPomodoroPreset(preset))
  }

  const handleDelete = () => {}
  const handleEdit = () => {}
  const handleMouseOver = () => {
    !selected && swatch.current?.style.setProperty("--opacity", 1)
  }
  const handleMouseLeave = () => {
    !selected && swatch.current?.style.setProperty("--opacity", 0.5)
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
            lineHeight={0}
          >
            {label}
          </Text>

          <Text
            fontSize="xxs"
            color={"primary.accent-2"}
            mb={0}
            mt="sm"
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
      <button onClick={() => setMenuOpen(!menuOpen)} css={{ padding: 0 }}>
        <EllipsesIcon selected={selected} menuOpen={menuOpen} />
      </button>

      {menuOpen && (
        <Box
          position="absolute"
          bottom="0%"
          right="0"
          zIndex="10"
          css={{ transform: "translate(0%, calc(0.5rem + 75%))" }}
        >
          <FadeIn duration="0.2s">
            <Card borderRadius="md" px="xs" py="sm" css={{ textAlign: "left" }}>
              <Stack display="flex" flexDirection="column" mt="xs">
                <Text
                  as="button"
                  fontSize="xs"
                  color="primary.accent-3"
                  textAlign="left"
                >
                  <Icon
                    as="span"
                    display="inline-block"
                    mb={0}
                    mr="xs"
                    fill="primary"
                  >
                    <Pencil />
                  </Icon>
                  edit
                </Text>
                <Text
                  as="button"
                  fontSize="xs"
                  color="primary.accent-3"
                  textAlign="left"
                >
                  <Icon
                    as="span"
                    display="inline-block"
                    mb={0}
                    mr="xs"
                    fill="danger"
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
    </Flex>
  )
}

export default LabelItem
