/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled"

import { color } from "styled-system"
import tg from "@styled-system/theme-get"
import theme from "../../styles/theme"
import Box from "../Box"

const Text = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  padding: 3px 4px;
  background: ${tg("colors.secondary")};
  color: ${tg("colors.primary.lightest")};
  font-weight: 400;
  font-size: 0.5rem;
  line-height: 1;
  border-radius: 10px;
  letter-spacing: ${tg("letterSpacings.sm")};

  @media (max-width: ${theme.breakpoints[3]}) {
    font-size: 0.4rem;
    padding: 3px;
    border-radius: 5px;
  }

  @media (max-width: ${theme.breakpoints[2]}) {
    font-size: 0.3rem;
    padding: 2px;
    border-radius: 5px;
  }
`

const BetaWrapper = ({ children, color = "primary.default" }) => {
  return (
    <Box position="relative" color={color} width="fit-content">
      {children}
      <Box
        as="a"
        href="https://en.wikipedia.org/wiki/Software_release_life_cycle#Alpha"
        target="_blank"
        position="absolute"
        top="0"
        right="0"
        css={{ transform: "translateX(100%)" }}
      >
        <Text>alpha</Text>
      </Box>
    </Box>
  )
}

export default BetaWrapper
