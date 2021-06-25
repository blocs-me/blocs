import styled from "@emotion/styled"
import { color } from "styled-system"
import tg from "@styled-system/theme-get"
import theme from "../../styles/theme"

const BetaWrapper = styled.div`
  display: inline-block;
  position: relative;
  ${color}
  width: fit-content;
  &::after {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    content: "beta";
    padding: 3px 4px;
    background: ${tg("colors.secondary")};
    color: ${tg("colors.primary.lightest")};
    font-weight: 400;
    position: absolute;
    font-size: 0.5rem;
    line-height: 1;
    border-radius: 10px;
    letter-spacing: ${tg("letterSpacings.sm")};
    top: 0;
    right: 0;
    transform: translateX(calc(100%));
  }

  @media (max-width: ${theme.breakpoints[3]}) {
    &::after {
      font-size: 0.4rem;
      padding: 3px;
      border-radius: 5px;
    }
  }

  @media (max-width: ${theme.breakpoints[2]}) {
    &::after {
      font-size: 0.3rem;
      padding: 2px;
      border-radius: 5px;
    }
  }
`

export default BetaWrapper
