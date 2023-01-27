import styled from '@emotion/styled'
import { flexbox, FlexboxProps } from 'styled-system'
import Box from '../Box'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { system } from 'styled-system'

const gap = system({
  gap: {
    property: 'gap',
    scale: 'space'
  }
})

const Flex = styled(Box, {
  shouldForwardProp
})<{ center?: boolean } & FlexboxProps>(
  flexbox,
  gap,
  { display: 'flex' },
  ({ center }) => {
    if (center) {
      return {
        justifyContent: 'center',
        alignItems: 'center'
      }
    }
  }
)

export default Flex
