import styled from "@emotion/styled"
import { themeGet } from "@styled-system/theme-get"
import { forwardRef } from "react"
import Box from "@/helpers/Box"

const Triangle = styled.div`
  position: relative;
  bottom: ${({ place }) => (place === "top" ? "100%" : "0%")};
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid transparent;
  border-bottom: 15px solid ${themeGet("colors.bg.default")};
  transform: ${({ place }) =>
    place === "top" ? "none" : "rotate(180deg) translate(0, -100%)"};
`

// top or bottom options

/* eslint-disable react/display-name */

const Notch = forwardRef((props, ref) => (
  <Box {...props}>
    <Triangle ref={ref} place={props.place} />
  </Box>
))

export default Notch
