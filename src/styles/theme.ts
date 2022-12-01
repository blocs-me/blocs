const colors = {
  fade: {
    from: 'rgba(255,255,255,0)',
    to: 'rgba(255,255,255,1)'
  },
  neutral: {
    white: '#ffff'
  },
  primary: {
    'accent-05': '#fcfcfc',
    'accent-1': '#f5f5f5',
    'accent-2': '#F9F9F9',
    'accent-3': '#999999',
    'accent-35': '#8b8b8b',
    'accent-4': '#777777'
  },
  background: '#FFFFFF',
  foreground: '#222222',
  secondary: {
    dark: '#682CE7',
    light: '#8660D9'
  },
  success: {
    dark: '#224DE5',
    medium: '#3F64E9'
  },
  danger: {
    light: '#E07387',
    medium: '#E9173D'
  },
  highlight: '#402be2',
  bg: {
    default: '#FFF',
    notion: '#FFF',
    light: '#FCFCFC',
    dark: '',
    mute: ''
  }
}

const space = {
  xxs: '0.25rem',
  xs: '0.5rem',
  sm: '1rem',
  md: '2rem',
  lg: '4rem',
  xl: '8rem',
  xxl: '16rem'
}

const fontSizes = {
  xxs: '0.579rem',
  xs: '0.694rem',
  sm: '0.833rem',
  md: '1rem',
  lg: '1.44rem',
  xl: '2.074rem',
  xxl: '2.986rem'
}

const fonts = {
  header: 'Pacifico, cursive',
  body: "Karla, 'Helvetica', sans-serif"
}

const radii = {
  xs: '2px',
  sm: '5px',
  md: '10px',
  lg: '15px'
}

const breakpoints = ['320px', '415px', '768px', '992px', '1200px']

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
  `
}

const letterSpacings = {
  sm: '1px',
  md: '2px',
  lg: '4px'
}

const lineHeights = {
  li: '3rem'
}

const buttons = {
  default: {
    bg: 'red',
    color: colors.primary['accent-4']
  },
  defaultRound: {
    bg: colors.primary['accent-4'],
    color: colors.primary['accent-1'],
    borderRadius: '50%',
    pd: 'xs'
  }
}

const zIndices = {
  nav: 1000000,
  modal: 1000001,
  notification: 10000001
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
  zIndices
}

export const darkModeColors: Theme = {
  ...theme,
  colors: {
    ...colors,
    primary: {
      'accent-05': '#eeeeee',
      'accent-1': '#151515',
      'accent-2': '#2b2b2b',
      'accent-3': '#464646',
      'accent-35': '#4d4d4d',
      'accent-4': '#B4b4b4'
    },
    highlight: '#FC7CD5',
    success: {
      dark: '#0038FF',
      medium: '#3A5DD7'
    },
    danger: {
      medium: '#DB4862',
      light: '#D76E81'
    },
    secondary: {
      dark: '#550CEF',
      light: '#8A53FF'
    },
    foreground: '#f5f5f5',
    background: '#222222',
    bg: {
      notion: 'rgb(25,25,25)',
      default: '#1f1f1f',
      dark: '#151515',
      mute: '#2b2b2b',
      light: ''
    }
  },
  shadows: {
    ...shadows,
    default: `
    0px 0px 2px #00000040,
    0px 4px 40px #00000047,
    0px 4px 4px #00000040
    `,
    widgetLayout: `
      rgba(0, 0, 0, 0.1) 5px 5px 10px,
      rgba(50, 50, 50, 0.05) 10px 10px 20px
    `,
    md: `none
    `,
    lg: `
    rgba(10, 10, 10, 0.5) -2px -2px 5px,
    rgba(255, 255, 255, 0.04) 2px 2px 5px
    `
  }
}

export const nightSky = {
  ...theme,
  colors: {
    ...darkModeColors.colors,
    secondary: {
      dark: '',
      light: ''
    },
    danger: '#FA7A7A',
    success: '#FFF',
    primary: {
      ...darkModeColors.colors.primary,
      'accent-1': '#003FA5',
      'accent-2': 'rgba(255,255,255,0.8)',
      'accent-3': 'rgba(255,255,255,0.7)',
      'accent-4': '#FFF'
    },
    bg: {
      notion: 'rgb(25,25,25)',
      dark: '#151515',
      mute: '#2b2b2b',
      default: '#003180',
      light: '#013486'
    }
  },
  shadows: {
    widgetLayout: shadows.default,
    default: `0px 0px 10px #002560`,
    lg: `5px 5px 10px #002560,
    -5px -5px 10px #003da0`
  }
}

export default theme

export type Theme = typeof theme
