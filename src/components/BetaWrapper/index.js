import styled from "@emotion/styled"
import { color } from "styled-system"
import tg from "@styled-system/theme-get"

const BetaWrapper = styled.div`
  display: inline-block;
  position: relative;
  ${color}
  width: fit-content;
  &::after {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.5rem;
    content: "beta";
    padding: 1px 2px;
    border-radius: 6px;
    background: ${tg("colors.secondary")};
    color: ${tg("colors.primary.lightest")};
    font-weight: 400;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(calc(100%));
  }
`

export default BetaWrapper
