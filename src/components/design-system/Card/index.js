import { forwardRef } from "react"
import Box from "@/helpers/Box"

/* eslint-disable react/display-name */

const Card = forwardRef((props, ref) => (
  <Box
    boxShadow="default"
    ref={ref}
    borderRadius="lg"
    bg="bg.default"
    {...props}
  >
    {props.children}
  </Box>
))

export default Card
