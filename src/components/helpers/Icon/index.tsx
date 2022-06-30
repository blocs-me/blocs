import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import {
  system,
  compose,
  color,
  layout,
  display,
  space,
  DisplayProps,
  ColorProps,
  LayoutProps,
  SpaceProps
} from 'styled-system'
import themeGet from '@styled-system/theme-get'

const iconStyles = compose(color, layout, display, space)

type Props = {
  fill?: string
  stroke?: string
  strokeWidth?: string
  selector?: 'path' | 'rect' | 'circle' | 'polyline'
} & DisplayProps &
  ColorProps &
  LayoutProps &
  SpaceProps

const Icon = styled('div', {
  shouldForwardProp
})<Props>(
  (props) => ({
    svg: {
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      [props.selector ?? '& path, circle, rect, polyline']: {
        fill: props.fill ? themeGet(`colors.${props.fill}`)(props) : 'none', 
        stroke: props.stroke ? themeGet(`colors.${props.stroke}`)(props) : 'none',
        strokeWidth: props.strokeWidth
      }
    }
  }),
  iconStyles,
)

export default Icon
