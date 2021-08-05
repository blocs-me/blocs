import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"
import Avatar from "@/design-system/Avatar"
import Clock from "../../../../icons/clock.svg"
import Label from "../../../../icons/label.svg"
import Stats from "../../../../icons/stats.svg"
import Heart from "../../../../icons/heart.svg"
import WidgetMenu from "@/widgets/WidgetMenu"
import Icon from "@/helpers/icon"
import Sun from "../../../../icons/sun.svg"
import ImageIcon from "../../../../icons/image.svg"

const menuItems = [
  {
    href: "/pomodoro/settings",
    title: "settings",
    icon: <Clock />,
  },
  {
    href: "/pomodoro/labels",
    title: "labels",
    icon: <Label />,
  },
  {
    href: "/pomodoro/stats",
    title: "stats",
    icon: <Stats />,
  },
  {
    href: "/pomodoro/favorites",
    title: "favorites",
    icon: <Heart />,
  },
]

const PomodoroMainMenu = () => {
  return (
    <Flex width="100%" height="100%" position="relative" p="md" center>
      <Box position="absolute" top="sm" left="sm">
        <Avatar alt="" variant="sm" />
      </Box>
      <Box m="auto">
        <WidgetMenu menuItems={menuItems} />
      </Box>
      <Flex
        borderRadius="999px"
        size="35px"
        position="absolute"
        bottom="sm"
        left="sm"
        border="solid 1px"
        borderColor="primary.accent-3"
        boxShadow="lg"
        as="button"
      >
        <Icon size="17px" fill="primary.accent-3" m="auto" display="flex">
          <Sun />
        </Icon>
      </Flex>
    </Flex>
  )
}

export default PomodoroMainMenu
