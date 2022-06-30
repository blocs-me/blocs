import styled from "@emotion/styled"
import { flexbox, system } from "styled-system"
import Box from "../Box"

const gap = system({ 
  gap: {
    property: 'gap',
    scale: 'space'
  }
})

const Flex = styled(Box)`
  display: flex;
  ${gap}
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
