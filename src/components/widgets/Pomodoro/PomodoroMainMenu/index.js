import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"
import Avatar from "@/design-system/Avatar"
import Gear from "../../../../icons/gear.svg"
import Clock from "../../../../icons/clock.svg"
import Stats from "../../../../icons/stats.svg"
import Heart from "../../../../icons/heart.svg"
import WidgetMenu from "@/widgets/WidgetMenu"
import Icon from "@/helpers/icon"
import Sun from "../../../../icons/sun.svg"
import ThemeIcon from "../../../../icons/invert-color.svg"
import Plant from "../../../../icons/plant.svg"

const menuItems = [
  {
    href: "/pomodoro/settings",
    title: "settings",
    itemIcon: <Gear />,
  },
  {
    href: "/pomodoro/labels",
    title: "pomodoro",
    itemIcon: <Clock />,
  },
  {
    href: "/pomodoro/theme",
    title: "theme",
    itemIcon: <ThemeIcon />,
    iconProps: {
      fill: "primary.accent-3",
      stroke: 2,
    },
  },
  // {
  //   href: "/pomodoro/stats",
  //   title: "stats",
  //   icon: <Stats />,
  // },
  // {
  //   href: "/pomodoro/favorites",
  //   title: "favorites",
  //   icon: <Heart />,
  // },
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
      {/* <Flex
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
      </Flex> */}

      <Box position="absolute" bottom="md" right="md" width="0.866rem">
        <Plant />
      </Box>
    </Flex>
  )
}

export default PomodoroMainMenu
