import styled from "@emotion/styled"
import { themeGet } from "@styled-system/theme-get"

const Input = styled.input`
  border-radius: ${themeGet("radii.md")};
  border: solid 1px ${themeGet("colors.primary.accent-4")};
  border-bottom-width: 3px;
  padding: ${themeGet("space.sm")};
  font-size: ${themeGet("fontSizes.sm")};
  font-weight: 400;
  color: ${themeGet("colors.primary.accent-4")};
  height: 45px;
  width: 100%;
  outline: none;

  &:focus,
  &:active {
    outline: none;
    border-color: ${themeGet("colors.highlight")};
    & ~ div > span {
      color: ${themeGet("colors.highlight")};
    }
  }

  &::placeholder {
    color: ${themeGet("colors.primary.accent-2")};
    font-weight: 300;
  }
`

export default Input
