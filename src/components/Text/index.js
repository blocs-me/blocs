import styled from "@emotion/styled"
import shouldForwardProp from "@styled-system/should-forward-prop"
import { color, space, system, typography, variant } from "styled-system"

const p = {
  fontSize: ["sm", "sm", , "md"],
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
  color
)

export default Text
