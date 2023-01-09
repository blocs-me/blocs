import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'

const Input = styled.input`
  border-radius: ${themeGet('radii.md')};
  border: solid 1px ${themeGet('colors.primary.accent-4')};
  padding: ${themeGet('space.sm')};
  font-size: ${themeGet('fontSizes.sm')};
  font-weight: 400;
  color: ${themeGet('colors.primary.accent-4')};
  height: 45px;
  width: 100%;
  outline: none;
  background: transparent;
  transition: box-shadow 0.2s ease;

  &:focus,
  &:active {
    outline: none;
    box-shadow: 0 0 0 3px ${themeGet('colors.brand.accent-5')};
    border-color: ${themeGet('colors.brand.accent-1')};
    & ~ div > span {
      color: ${themeGet('colors.brand.accent-1')};
    }
  }

  &::placeholder {
    color: ${themeGet('colors.primary.accent-3')};
    font-weight: 300;
  }
`

export default Input
