import styled from "@emotion/styled"
import shouldForwardProp from "@styled-system/should-forward-prop"
import {
  border,
  color,
  compose,
  flexbox,
  grid,
  layout,
  space,
  system,
} from "styled-system"
import Box from "../Box"

const placeItems = system({
  placeItems: true,
  cssProperty: "place-items",
})

const gridStyles = compose(
  grid,
  layout,
  color,
  space,
  flexbox,
  border,
  placeItems
)

const Grid = styled(Box, {
  shouldForwardProp,
})({ display: 'grid' }, gridStyles)

export default Grid
