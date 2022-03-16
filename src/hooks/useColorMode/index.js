import { useCallback, useEffect, useMemo } from "react"
import useDarkMode from "../useDarkMode"

const { default: storage } = require("@/utils/storage")
const { default: makeStore } = require("src/lib/makeStore")
const { default: theme, darkModeColors, nightSky } = require("src/styles/theme")

const colorModes = {
  light: theme,
  dark: darkModeColors,
  nightSky,
}

const backgroundColors = {
  light: "#FFF",
  dark: "rgb(25,25,25)",
}

const DEFAULT_COLOR_MODE = "light"
export const SET_COLOR_MODE = "SET_COLOR_MODE"
export const SET_BACKGROUND_COLOR_MODE = "SET_BACKGROUND_COLOR_MODE"

const reducer = (state, action = {}) => {
  const { colorMode, backgroundColorMode } = action

  if (action.type === SET_COLOR_MODE) return { ...state, colorMode }
  if (action.type === SET_BACKGROUND_COLOR_MODE)
    return { ...state, backgroundColorMode }

  return state
}

const initialState = {
  colorMode: DEFAULT_COLOR_MODE,
  background: DEFAULT_COLOR_MODE,
}

const [ColorModeProvider, useColorModeStore, useColorModeDispatch] = makeStore({
  initialState,
  reducer,
})

const useColorMode = (customColorModes) => {
  const { colorMode, backgroundColorMode } = useColorModeStore() || initialState
  const dispatch = useColorModeDispatch()
  const cachedColorMode = storage.getItem("colorMode")
  const cachedBackgroundColorMode = storage.getItem("backgroundColorMode")
  const isDarkMode = useDarkMode()
  const autoColorMode = isDarkMode ? "dark" : "light"

  const setTheme = useCallback(
    (colorMode) => {
      setTimeout(() => {
        storage.setItem("colorMode", colorMode)
        dispatch?.({
          type: SET_COLOR_MODE,
          colorMode,
        })
      }, 0)
    },
    [dispatch]
  )

  const setBackground = useCallback(
    (backgroundColorMode) => {
      setTimeout(() => {
        storage.setItem("backgroundColorMode", backgroundColorMode)
        dispatch?.({
          type: SET_BACKGROUND_COLOR_MODE,
          backgroundColorMode,
        })
      }, 0)
    },
    [dispatch]
  )

  const getTheme = (themeKey) =>
    colorModes[themeKey] || colorModes[DEFAULT_COLOR_MODE]

  const currentTheme = useMemo(() => {
    if (!cachedColorMode || cachedColorMode?.toLowerCase() === "auto") {
      setTheme("auto")
      return getTheme(autoColorMode)
    }
    if (cachedColorMode) {
      setTheme(cachedColorMode)
      return getTheme(cachedColorMode)
    }
    setTheme(DEFAULT_COLOR_MODE)
    return getTheme(DEFAULT_COLOR_MODE)
  }, [cachedColorMode, autoColorMode]) // eslint-disable-line

  const getBackgroundColor = (colorMode) => backgroundColors[colorMode]

  const backgroundColor = useMemo(() => {
    if (
      !cachedBackgroundColorMode ||
      backgroundColorMode?.toLowerCase() === "auto"
    ) {
      setBackground("auto")
      return getBackgroundColor(autoColorMode)
    }

    if (cachedBackgroundColorMode) {
      setBackground(cachedBackgroundColorMode)
      return getBackgroundColor(cachedBackgroundColorMode)
    }

    return getBackgroundColor(backgroundColorMode)
  }, [
    cachedBackgroundColorMode,
    autoColorMode,
    backgroundColorMode,
    setBackground,
  ])

  return {
    theme: currentTheme,
    colorMode: colorMode || DEFAULT_COLOR_MODE,
    backgroundColorMode,
    setTheme,
    ColorModeProvider,
    setBackground,
    backgroundColor,
  }
}

export default useColorMode
export { ColorModeProvider, useColorModeStore, useColorModeDispatch }
