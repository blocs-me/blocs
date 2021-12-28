import { ThemeProvider, useTheme } from "@emotion/react"
import useColorMode, { DefaultProvider } from "."

const ColorModeThemeProvider = ({
  children,
  getTheme,
  defaultColorMode,
  backgroundColors,
}) => {
  const globalTheme = useTheme()
  const { theme } = useColorMode({
    themes: getTheme?.(globalTheme),
    defaultColorMode,
    backgroundColors,
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const ColorModeProvider = ({ children, colorModeOptions = {} }) => {
  return (
    <DefaultProvider>
      <ColorModeThemeProvider {...colorModeOptions}>
        {children}
      </ColorModeThemeProvider>
    </DefaultProvider>
  )
}

export default ColorModeProvider
