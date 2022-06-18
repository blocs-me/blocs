import { ThemeProvider } from '@emotion/react'
import GlobalStyle from '../src/styles/GlobalStyle'
import Reset from '../src/styles/Reset'
import theme from '../src/styles/theme'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [
  (Story) => {
    return (
      <ThemeProvider theme={theme}>
        <Reset />
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    )
  }
]
