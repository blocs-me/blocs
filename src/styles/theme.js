const colors = {
  fade: {
    from: "rgba(255,255,255,0)",
    to: "rgba(255,255,255,1)",
  },
  primary: {
    "accent-0.5": "#fcfcfc",
    "accent-1": "#eaeaea",
    "accent-2": "#646464",
    "accent-3": "#333333",
    "accent-4": "#1F1F1F",
  },
  background: "#FFFFFF",
  foreground: "#000000",
  secondary: "#e00079",
  success: "#0070e0",
  danger: "#e22b2b",
  highlight: "#402be2",
  bg: {
    default: "#FFF",
    notion: "#FFF",
    light: "#FCFCFC",
  },
}

const space = {
  xxs: "0.25rem",
  xs: "0.5rem",
  sm: "1rem",
  md: "2rem",
  lg: "4rem",
  xl: "8rem",
  xxl: "16rem",
}

const fontSizes = {
  xxs: "0.579rem",
  xs: "0.694rem",
  sm: "0.833rem",
  md: "1rem",
  lg: "1.44rem",
  xl: "2.074rem",
  xxl: "2.986rem",
}

const fonts = {
  header: "Pacifico, cursive",
  body: "Karla, 'Helvetica', sans-serif",
}

const radii = {
  xs: "2px",
  sm: "5px",
  md: "10px",
  lg: "15px",
}

const breakpoints = ["320px", "415px", "768px", "992px", "1200px"]

const shadows = {
  default: `
    rgba(50, 50, 50, 0.08) 0px 2px 10px,
    rgba(50, 50, 50, 0.05) 0px 5px 20px,
    rgba(0, 0, 0, 0.03) 0px 10px 30px
  `,
  widgetLayout: `
    rgba(50, 50, 50, 0.08) 0px 2px 10px,
    rgba(50, 50, 50, 0.05) 0px 5px 20px,
    rgba(0, 0, 0, 0.03) 0px 10px 30px
  `,
  md: `
  rgba(70, 70, 70, 0.05) 0px 4px 10px,
  rgba(70, 70, 70, 0.02) 0px 8px 16px
  `,
  lg: `
    rgba(50, 50, 50, 0.1) 0px 5px 12px,
    rgba(50, 50, 50, 0.07) 0px 7px 25px,
    rgba(0, 0, 0, 0.05) 0px 12px 35px
  `,
}

const letterSpacings = {
  sm: "1px",
  md: "2px",
  lg: "4px",
}

const lineHeights = {
  li: "3rem",
}

const buttons = {
  default: {
    bg: "red",
    color: colors.primary["accent-4"],
  },
  defaultRound: {
    bg: colors.primary["accent-4"],
    color: colors.primary["accent-1"],
    borderRadius: "50%",
    pd: "xs",
  },
}

const zIndices = {
  nav: 1000000,
  modal: 1000001,
  notification: 10000001,
}

const theme = {
  colors,
  space,
  fontSizes,
  radii,
  breakpoints,
  shadows,
  fonts,
  lineHeights,
  letterSpacings,
  buttons,
  zIndices,
}

export const darkModeColors = {
  ...theme,
  colors: {
    ...colors,
    primary: {
      "accent-0.5": "#fcfcfc",
      "accent-4": "#f1f1f1",
      "accent-3": "#d1d1d1",
      "accent-2": "#999",
      "accent-1": "#333",
    },
    highlight: "",
    success: "#eaeaea",
    danger: "#F29191",
    secondary: "#eaeaea",
    foreground: "#FFFFFF",
    background: "#333333",
    bg: {
      notion: "rgb(25,25,25)",
      default: "#1f1f1f",
      dark: "#1f1f1f",
    },
  },
  shadows: {
    default: `
    rgba(0, 0, 0, 0.25) -5px -5px 10px 2px,
    rgba(200, 200, 200, 0.06) 5px 5px 10px
    `,
    widgetLayout: `-7px -7px 14px #101010,
    7px 7px 14px #141414;`,
    md: `none
    `,
    lg: `
    rgba(10, 10, 10, 0.5) -2px -2px 5px,
    rgba(255, 255, 255, 0.04) 2px 2px 5px
    `,
  },
}

export const nightSky = {
  ...theme,
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
}

export default theme
