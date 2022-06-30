import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'

export const Rect = styled.rect`
  fill: ${themeGet('colors.primary.accent-4')};
`

export const Svg = styled.svg`
  width: 100%;
`

export const Text = styled.text`
  @media (min-width: 300px) {
    font-size: 6px;
  }

  @media (min-width: 415px) {
    font-size: 5px;
  }

  @media (min-width: 550px) {
    font-size: 4px;
  }

  font-size: 4px;
  font-family: ${themeGet('fonts.body')};
  fill: ${themeGet('colors.primary.accent-2')};

  text-anchor: middle;
`
