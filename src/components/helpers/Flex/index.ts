import styled from '@emotion/styled'
import { flexbox, FlexboxProps } from 'styled-system'
import Box from '../Box'

const Flex = styled(Box)<{ center?: boolean } & FlexboxProps>`
  display: flex;
  ${flexbox}
  ${({ center }) => {
    if (center) {
      return `
      justify-content: center;
      alignItems: center;
      `
    }

    return ''
  }}
`

export default Flex
