/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled"
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
} from "styled-system"
import shouldForwardProp from "@styled-system/should-forward-prop"
import { css } from "@emotion/react"

const boxStylesProps = compose(
  space,
  layout,
  border,
  color,
  position,
  opacity,
  shadow,
  zIndex,
  borderRadius
)

const Box = styled("div", {
  shouldForwardProp,
})(boxStylesProps)

export default Box
