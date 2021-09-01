import { default as Flex } from "@/helpers/Flex"
import Grid from "@/helpers/Grid"
import Icon from "@/helpers/Icon"
import useColorMode, { useColorModeStore } from "@/hooks/useColorMode"
import ThemeIcon from "../../../../icons/invert-color.svg"
import MenuHeader from "../Typography/MenuHeader"
import Moon from "../../../../icons/moon.svg"
import Pencil from "../../../../icons/pencil.svg"
import Sun from "../../../../icons/sun.svg"
import AutoThemeIcon from "../../../../icons/auto-theme.svg"
import Text from "@/design-system/Text"
import ScrollProvider from "@/design-system/ScrollProvider"
import { useCallback } from "react"
import useNotifications from "@/design-system/Notifications/useNotifications"

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

const backgroundModes = [...modes]

const ThemeItem = ({
  title,
  themeIcon,
  size = "20px",
  handleClick,
  selected,
}) => {
  return (
    <Flex
      as="button"
      height="50px"
      width="100%"
      alignItems="center"
      justifyContent="center"
      border="solid 1px"
      borderColor={selected ? "primary.accent-4" : "primary.accent-1"}
      bg="primary.accent-0.5"
      p="sm"
      borderRadius="lg"
      onClick={(e) => handleClick?.(e)}
      css={{ transition: "border 0.2s ease" }}
    >
      <Icon size={size} mr="xs" fill="primary.accent-4" display="flex">
        {themeIcon}
      </Icon>
      <Text color="primary.accent-4" fontWeight="300" fontSize="sm" mb={0}>
        {title}
      </Text>
    </Flex>
  )
}

const Header = ({ children }) => (
  <Text
    fontSize="sm"
    ml="sm"
    color="primary.accent-3"
    mb="xxs"
    lineHeight={1}
    fontWeight="400"
  >
    {children}
  </Text>
)

const PomodoroThemeMenu = () => {
  const { colorMode, backgroundColorMode } = useColorModeStore() || {}
  const { setTheme, setBackground } = useColorMode()
  const notifs = useNotifications()

  const handleColorModeChange = useCallback(
    (colorModeKey) => {
      notifs.createInfo(`theme set to ${colorModeKey}`)

      setTheme(colorModeKey)
    },
    [setTheme]
  )

  const handleBackgroundChange = useCallback(
    (colorModeKey) => setBackground(colorModeKey),
    [setBackground]
  )

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

      <ScrollProvider pt="sm">
        <Header>Widget</Header>
        <Grid gridTemplateColumns="repeat(2, 1fr)" p="sm" gridGap="sm" mb="sm">
          {modes.map((mode) => (
            <ThemeItem
              key={mode.colorModeKey}
              {...mode}
              colorMode={colorMode}
              handleClick={() => handleColorModeChange(mode.colorModeKey)}
              selected={colorMode === mode.colorModeKey}
            />
          ))}
        </Grid>

        <Header>Background</Header>
        <Grid gridTemplateColumns="repeat(2, 1fr)" p="sm" gridGap="sm">
          {backgroundModes.map((mode) => (
            <ThemeItem
              key={mode.colorModeKey}
              {...mode}
              text={colorMode}
              handleClick={() => handleBackgroundChange(mode.colorModeKey)}
              selected={mode.colorModeKey === backgroundColorMode}
            />
          ))}
        </Grid>
      </ScrollProvider>
    </Flex>
  )
}

export default PomodoroThemeMenu
