import styled from "@emotion/styled"
import { border, color, flexbox, grid, layout, space } from "styled-system"
import Box from "../Box"

const Grid = styled(Box)`
  display: grid;
  ${grid}
  ${layout}
  ${color}
  ${space}
  ${flexbox}
  ${border}
`

export default Grid
