/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled'
import {
  border,
  borderRadius,
  color,
  compose,
  layout,
  opacity,
  position,
  shadow,
  space,
  zIndex,
  system
} from 'styled-system'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { themeGet } from '@styled-system/theme-get'
import { IBox } from './Box.types'

const transform = system({
  transform: true
})

const hoverColor = (props) =>
  props.hoverColor
    ? {
        'p:hover, span:hover': {
          color: props.hoverColor
            ? themeGet(`colors.${props.hoverColor}`)(props)
            : 'inherit'
        }
      }
    : {}

const boxStylesProps = compose(
  space,
  layout,
  border,
  color,
  position,
  opacity,
  shadow,
  zIndex,
  borderRadius,
  transform
)

const Box = styled('div', {
  shouldForwardProp
})(hoverColor, boxStylesProps)

export default Box
