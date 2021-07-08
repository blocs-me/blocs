import styled from "@emotion/styled"
import shouldForwardProp from "@styled-system/should-forward-prop"
import { color, space, system, typography, variant } from "styled-system"

const p = {
  fontSize: ["sm", "sm", , "md"],
  color: "primary.accent-2",
  fontWeight: "300",
}

const li = {
  fontSize: p.fontSize,
}

const h4 = {
  fontSize: p.fontSize,
  fontWeight: "bold",
  fontFamily: "body",
}

const textTransform = system({
  textTransform: true,
})

const variants = variant({
  variants: {
    p,
    h4,
    li,
  },
})

const Text = styled("p", { shouldForwardProp })(
  space,
  typography,
  textTransform,
  color,
  variants
)

export default Text
