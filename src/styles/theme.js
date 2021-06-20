const colors = {
  primary: {
    lightest: "#eaeaea",
    light: "#646464",
    default: "#333333",
    dark: "#1F1F1F",
  },
  background: "#FFFFFF",
  foreground: "#333333",
  secondary: "#e00079",
  success: "#0070e0",
  danger: "#e22b2b",
  highlight: "#402be2",
  bg: {
    default: "#FFF",
    dark: "#FCFCFC",
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
  xxs: "0.6rem",
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
    color: colors.primary.dark,
  },
  defaultRound: {
    bg: colors.primary.dark,
    color: colors.primary.lightest,
    borderRadius: "50%",
    pd: "xs",
  },
}

const zIndices = {
  nav: 1000000,
  modal: 1000001,
}

export const darkModeColors = {
  colors: {
    ...colors,
    primary: {
      default: "#fcfcfc",
      dark: "##eaeaea",
      light: "#646464",
      lightest: "#1F1F1F",
    },
    foreground: "#FFFFFF",
    background: "#333333",
    bg: {
      default: "#333333",
      dark: "#1f1f1f",
    },
  },
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

export default theme
