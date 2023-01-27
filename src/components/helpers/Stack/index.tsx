import { WithChildren } from '@/utils/tsUtils'
import styled from '@emotion/styled'
import { Theme } from 'src/styles/theme'
import shouldForwardProp from '@styled-system/should-forward-prop'
import {
  DisplayProps,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  display,
  flexbox,
  layout,
  space
} from 'styled-system'

type StackProps = LayoutProps &
  DisplayProps &
  FlexboxProps &
  SpaceProps & { theme?: Theme } & WithChildren<{}>

const StackStyle = styled.div`
  & > * + * {
    ${space}
  }
`

const Stack = styled(StackStyle, {
  shouldForwardProp
})(display, flexbox, layout)

export default Stack
