import { default as Flex } from '@/helpers/Flex'
import Grid from '@/helpers/Grid'
import Icon from '@/helpers/Icon'
import useColorMode, { useColorModeStore } from '@/hooks/useColorMode'
import MenuHeader from '../Typography/MenuHeader'
import AutoThemeIcon from '../../../../icons/auto-theme.svg'
import Text from '@/design-system/Text'
import ScrollProvider from '@/design-system/ScrollProvider'
import { useCallback } from 'react'
import { CircleHalf } from 'src/icons/circle-half'
import Sun from 'src/icons/sun'
import Moon from 'src/icons/moon'

const modes = [
  {
    title: 'light',
    themeIcon: <Sun />,
    colorModeKey: 'light',
    size: '18px'
  },
  {
    title: 'dark',
    themeIcon: <Moon />,
    colorModeKey: 'dark',
    size: '22px'
  },

  {
    title: 'auto',
    themeIcon: <AutoThemeIcon />,
    colorModeKey: 'auto',
    size: '18px'
  }
]

const backgroundModes = [...modes.slice(0, 2), ...modes.slice(3)]

const ThemeItem = ({
  title,
  themeIcon,
  size = '20px',
  handleClick,
  selected
}) => {
  return (
    <Flex
      as="button"
      height="50px"
      width="100%"
      alignItems="center"
      justifyContent="center"
      border="solid 1px"
      borderColor={selected ? 'foreground' : 'primary.accent-3'}
      bg="primary.accent-0.5"
      p="sm"
      borderRadius="lg"
      onClick={(e) => handleClick?.(e)}
      css={{ transition: 'border 0.2s ease' }}
    >
      <Icon
        size={size}
        mr="xs"
        fill={selected ? 'foreground' : 'primary.accent-3'}
        display="flex"
      >
        {themeIcon}
      </Icon>
      <Text
        color={selected ? 'foreground' : 'primary.accent-3'}
        fontWeight="300"
        fontSize="sm"
        mb={0}
      >
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

  const handleColorModeChange = useCallback(
    (colorModeKey) => {
      setTheme(colorModeKey)
      setBackground(colorModeKey)
    },
    [setTheme, setBackground]
  )

  return (
    <Flex flexDirection="column" size="100%">
      <MenuHeader
        icon={
          <Icon fill="foreground" as="span">
            <CircleHalf />
          </Icon>
        }
        title="Theme"
      />

      <ScrollProvider pt="sm">
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
      </ScrollProvider>
    </Flex>
  )
}

export default PomodoroThemeMenu
