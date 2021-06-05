/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled"
import Box from "../Box"
import Flex from "../Flex"

const NavButton = styled.button`
  &:active {
    filter: grayscale(10%);
  }

  &:hover {
    opacity: 0.9;
  }

  transition: opacity 0.2s ease, trransform 0.2s ease;
`

const NavIcon = ({ children, props }) => (
  <NavButton {...props}>
    <Flex
      borderRadius="50%"
      size="50px"
      bg="secondary"
      justifyContent="flex-start"
      alignItems="flex-end"
      position="relative"
    >
      <Box css={{ transform: "translate(75%)" }}>{children}</Box>
    </Flex>
  </NavButton>
)

export default NavIcon
