/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled"
import tg from "@styled-system/theme-get"
import Box from "@/helpers/Box"
import theme from "src/styles/theme"

const Text = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  padding: 3px 4px;
  background: ${tg("colors.secondary")};
  color: ${tg("colors.primary.accent-1")};
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

const BetaWrapper = ({ children, color = "primary.accent-3" }) => {
  return (
    <Box position="relative" color={color} width="fit-content" as="span">
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
