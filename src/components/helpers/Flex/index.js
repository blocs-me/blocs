import styled from "@emotion/styled"
import { flexbox } from "styled-system"
import Box from "../Box"

const Flex = styled(Box)`
  display: flex;
  ${flexbox}
  ${({ center }) => {
    if (center) {
      return `
      justify-content: center;
      alignItems: center;
      `
    }

    return ""
  }}
`

export default Flex
