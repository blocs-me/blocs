import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { display, flexbox, layout, space } from 'styled-system'

const StackStyle = styled.div`
  & > * + * {
    ${space}
  }
`

const Stack = styled(StackStyle, {
  shouldForwardProp
})(display, flexbox, layout)

export default Stack
