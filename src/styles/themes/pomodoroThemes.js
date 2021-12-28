const { darkModeColors, shadows } = require("../theme")

const pomodoroThemes = (theme) => ({
  theme,
  dark: darkModeColors,
  nightSky: {
    colors: {
      ...darkModeColors.colors,
      secondary: "#eaeaea",
      danger: "#FA7A7A",
      success: "#FFF",
      primary: {
        ...darkModeColors.colors.primary,
        "accent-1": "#003FA5",
        "accent-2": "rgba(255,255,255,0.8)",
        "accent-3": "rgba(255,255,255,0.7)",
        "accent-4": "#FFF",
      },
      bg: {
        ...darkModeColors.bg,
        default: "#003180",
        light: "#013486",
      },
    },
    shadows: {
      widgetLayout: shadows.default,
      default: `0px 0px 10px #002560`,
      lg: `5px 5px 10px #002560,
      -5px -5px 10px #003da0`,
    },
  },
})

export default pomodoroThemes
