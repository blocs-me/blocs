import { useCallback, useEffect, useMemo } from "react"
import useDarkMode from "../useDarkMode"
import ColorModeProvider from "./ColorModeProvider"

const { default: storage } = require("@/utils/storage")
const { default: makeStore } = require("src/lib/makeStore")
const { default: theme, darkModeColors, nightSky } = require("src/styles/theme")

const defaultThemes = {
  light: theme,
  dark: darkModeColors,
}

const defaultBackgroundColors = {
  light: "#FFF",
  dark: "#2f3437",
}

const FALLBACK_COLOR_MODE = "light"
const SET_COLOR_MODE = "SET_COLOR_MODE"
const SET_BACKGROUND_COLOR_MODE = "SET_BACKGROUND_COLOR_MODE"

const reducer = (state, action = {}) => {
  const { colorMode, backgroundColorMode } = action

  if (action.type === SET_COLOR_MODE) return { ...state, colorMode }
  if (action.type === SET_BACKGROUND_COLOR_MODE)
    return { ...state, backgroundColorMode }

  return state
}

const initialState = {
  colorMode: FALLBACK_COLOR_MODE,
  background: FALLBACK_COLOR_MODE,
}

const [Provider, useColorModeStore, useColorModeDispatch] = makeStore({
  initialState,
  reducer,
})

const useColorMode = (options = {}) => {
  const {
    themes = defaultThemes,
    defaultColorMode = FALLBACK_COLOR_MODE,
    backgroundColors = defaultBackgroundColors,
  } = options
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
    themes[themeKey] || themes[defaultColorMode || FALLBACK_COLOR_MODE]

  const currentTheme = useMemo(() => {
    if (cachedColorMode?.toLowerCase() === "auto") {
      setTheme("auto")
      return getTheme(autoColorMode)
    }

    if (cachedColorMode) {
      setTheme(cachedColorMode)
      return getTheme(cachedColorMode)
    }

    setTheme(defaultColorMode || FALLBACK_COLOR_MODE)
    return getTheme(defaultColorMode || FALLBACK_COLOR_MODE)
  }, [cachedColorMode, autoColorMode, colorMode]) // eslint-disable-line

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
    // eslint-disable-next-line
  }, [cachedBackgroundColorMode, autoColorMode, colorMode, backgroundColorMode])

  return {
    theme: currentTheme,
    colorMode: colorMode || FALLBACK_COLOR_MODE,
    backgroundColorMode,
    setTheme,
    Provider,
    setBackground,
    backgroundColor,
  }
}

export default useColorMode

const DefaultProvider = Provider

export {
  ColorModeProvider,
  useColorModeStore,
  DefaultProvider,
  useColorModeDispatch,
}
