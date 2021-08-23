import { default as Flex } from "@/helpers/Flex"
import Grid from "@/helpers/Grid"
import Icon from "@/helpers/Icon"
import useColorMode, { useColorModeStore } from "@/hooks/useColorMode"
import ThemeIcon from "../../../../icons/invert-color.svg"
import MenuHeader from "../Typography/MenuHeader"
import Moon from "../../../../icons/moon.svg"
import Sun from "../../../../icons/Sun.svg"
import AutoThemeIcon from "../../../../icons/auto-theme.svg"
import Text from "@/design-system/Text"
import ClientSideOnly from "@/helpers/ClientSideOnly"

const modes = [
  {
    title: "light",
    themeIcon: <Sun />,
    colorModeKey: "light",
    size: "18px",
  },
  {
    title: "dark",
    themeIcon: <Moon />,
    colorModeKey: "dark",
    size: "22px",
  },
  {
    title: "auto",
    themeIcon: <AutoThemeIcon />,
    colorModeKey: "auto",
    size: "18px",
  },
  // {
  //   title: "night sky",
  //   themeIcon: <Moon />,
  //   colorModeKey: "nightSky",
  // },
]

const ThemeItem = ({
  title,
  colorModeKey,
  colorMode,
  themeIcon,
  size = "20px",
}) => {
  const { setTheme } = useColorMode()

  const handleClick = (e) => {
    setTheme(colorModeKey)
  }

  return (
    <Flex
      as="button"
      height="50px"
      width="fit-content"
      alignItems="center"
      justifyContent="center"
      border="solid 1px"
      borderColor={
        colorMode === colorModeKey ? "primary.accent-4" : "primary.accent-1"
      }
      bg="primary.accent-0.5"
      p="sm"
      borderRadius="lg"
      onClick={(e) => handleClick(e)}
      css={{ transition: "border 0.2s ease" }}
    >
      <Icon size={size} mr="xs" fill="primary.accent-4" display="flex">
        {themeIcon}
      </Icon>
      <Text color="primary.accent-4" fontWeight="400" fontSize="sm" mb={0}>
        {title}
      </Text>
    </Flex>
  )
}

const PomodoroThemeMenu = () => {
  const colorMode = useColorModeStore()

  return (
    <Flex flexDirection="column" size="100%">
      <MenuHeader
        icon={
          <Icon fill="primary.accent-4" as="span">
            <ThemeIcon />
          </Icon>
        }
        title="theme"
      />

      <Grid gridTemplateColumns="repeat(2, 1fr)" p="sm" gridGap="sm">
        {modes.map((mode, key) => (
          <ThemeItem key={mode.colorModeKey} {...mode} colorMode={colorMode} />
        ))}
      </Grid>
    </Flex>
  )
}

export default PomodoroThemeMenu
