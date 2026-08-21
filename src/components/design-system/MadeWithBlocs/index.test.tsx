import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../styles/theme'
import MadeWithBlocs from './index'

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('MadeWithBlocs', () => {
  it('renders a clickable CTA linking to blocs.me by default', () => {
    renderWithTheme(<MadeWithBlocs />)
    const link = screen.getByRole('link', { name: /make your own → blocs\.me/i })
    expect(link).toHaveAttribute('href', 'https://blocs.me')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('links to a widget-specific URL when href is provided', () => {
    renderWithTheme(<MadeWithBlocs href="https://blocs.me/pomodoro-timer" />)
    const link = screen.getByRole('link', { name: /make your own/i })
    expect(link).toHaveAttribute('href', 'https://blocs.me/pomodoro-timer')
  })

  it('still renders the CTA link in floating mode', () => {
    renderWithTheme(<MadeWithBlocs floating href="https://blocs.me/clock-widget" />)
    const link = screen.getByRole('link', { name: /make your own → blocs\.me/i })
    expect(link).toHaveAttribute('href', 'https://blocs.me/clock-widget')
  })
})
