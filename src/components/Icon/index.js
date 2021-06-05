import styled from "@emotion/styled"
import { compose, color, layout, display, space } from "styled-system"

const iconStyles = compose(color, layout, display, space)

const Icon = styled.div`
  ${iconStyles}
  svg {
    width: 100%;
    max-width: 100%;
  }
`

export default Icon
