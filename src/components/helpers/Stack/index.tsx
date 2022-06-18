import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import {
  display,
  DisplayProps,
  flexbox,
  FlexboxProps,
  space,
  SpaceProps
} from 'styled-system'

type StackProps = DisplayProps & FlexboxProps & SpaceProps

const StackStyle = styled.div<StackProps>`
  ${display}
  ${flexbox}
  & > * + * {
    ${space}
  }
`

const Stack = styled(StackStyle, {
  shouldForwardProp
})<StackProps>``

export default Stack
