import { useCallback, useEffect } from "react"
import useDarkMode from "../useDarkMode"

const { default: storage } = require("@/utils/storage")
const { default: makeStore } = require("src/lib/makeStore")
const {
  default: theme,
  darkModeColors,
  nightSkyColors,
} = require("src/styles/theme")

const colorModes = {
  light: theme,
  dark: darkModeColors,
}

const DEFAULT_COLOR_MODE = "light"
export const SET_COLOR_MODE = "SET_COLOR_MODE"

const reducer = (state, action) => {
  if (action.type === SET_COLOR_MODE) {
    return action.colorMode
  }
  return state
}

const [ColorModeProvider, useColorModeStore, useColorModeDispatch] = makeStore({
  initialState: DEFAULT_COLOR_MODE,
  reducer,
})

const useColorMode = (customColorModes) => {
  const currentColorMode = useColorModeStore()
  const dispatch = useColorModeDispatch()
  const cachedColorMode = storage.getItem("colorMode")
  const isDarkMode = useDarkMode()
  const autoColorMode = isDarkMode ? "dark" : "light"

  const setTheme = (colorMode) => {
    setTimeout(() => {
      storage.setItem("colorMode", colorMode)
      dispatch(
        {
          type: SET_COLOR_MODE,
          colorMode,
        },
        0
      )
    })
  }

  const getTheme = (themeKey) => colorModes[themeKey]

  const currentTheme = (() => {
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
  })()

  // useEffect(() => {
  //   if (!cachedColorMode || cachedColorMode?.toLowerCase() === "auto") {
  //     dispatch({
  //       type: SET_COLOR_MODE,
  //       colorMode: autoColorMode,
  //     })
  //   }
  // }, [isDarkMode]) // eslint-disable-line

  return {
    theme: currentTheme,
    setTheme,
    ColorModeProvider,
  }
}

export default useColorMode
export { ColorModeProvider, useColorModeStore, useColorModeDispatch }
