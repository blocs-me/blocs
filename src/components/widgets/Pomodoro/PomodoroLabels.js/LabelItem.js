import { useRef, useState } from "react"
import DropdownMenu from "@/design-system/DropdownMenu"
import Text from "@/design-system/Text"
import Flex from "@/helpers/Flex"
import { setPomodoroSessionLabel } from "../pomodoroActions"
import { usePomodoroDispatch } from "../usePomodoroStore"
import Ellipses from "../../../../icons/ellipses.svg"
import Trash from "../../../../icons/trash.svg"
import Pencil from "../../../../icons/pencil.svg"
import Card from "@/design-system/Card"
import Icon from "@/helpers/Icon"
import FadeIn from "@/helpers/FadeIn"
import Box from "@/helpers/Box"
import { useClickOutside } from "@/hooks/useClickOutside"
import Stack from "@/helpers/Stack"

const EllipsesIcon = ({ selected, menuOpen }) => (
  <Icon
    width="20px"
    stroke={selected || menuOpen ? "primary.accent-4" : "primary.accent-1"}
  >
    <Ellipses css={{ transition: "fill ease 0.2s" }} />
  </Icon>
)

const LabelItem = ({ selected = false, label = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = usePomodoroDispatch()
  const [name, id, color] = label
  const container = useRef()
  const swatch = useRef()

  useClickOutside({
    element: container,
    onClickOutside: () => menuOpen && setMenuOpen(false),
  })

  const handleClick = () => {
    dispatch(
      setPomodoroSessionLabel({
        label: name,
        labelColor: color,
        id,
      })
    )
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
        css={{ transition: "border ease 0.2s, box-shadow ease 0.2s" }}
        boxShadow={selected ? "md" : "none"}
        border="solid 1px"
        borderColor={selected ? "primary.accent-4" : "primary.accent-1"}
        borderRadius="md"
        position="relative"
        height="50px"
        alignItems="center"
        as="button"
        onClick={() => handleClick()}
        hoverColor="primary.accent-4"
      >
        <Flex
          width="30px"
          height="100%"
          borderRadius="sm"
          bg="var(--bg)"
          mr="xs"
          style={{ "--bg": color, "--opacity": selected ? 1 : 0.5 }}
          css={{ transition: "opacity 0.2s ease", opacity: "var(--opacity)" }}
          ref={swatch}
        />
        <Text
          m={0}
          p={0}
          fontWeight="400"
          color={selected ? "primary.accent-4" : "primary.accent-2"}
          css={{ transition: "color 0.2s ease" }}
        >
          {name}
        </Text>
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
