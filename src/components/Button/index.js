import styled from "@emotion/styled"
import {
  color,
  compose,
  layout,
  padding,
  space,
  typography,
  variant,
} from "styled-system"
import shouldForwardProp from "@styled-system/should-forward-prop"

const buttonStyles = compose(layout, color, space, padding, typography)

const variants = variant({
  variants: {
    round: {
      borderRadius: "lg",
      bg: "primary.dark",
      color: "background",
    },
  },
})

const Button = styled("button")(
  {
    border: "none",
    outline: "none",
    bg: "primary.dark",
    color: "primary.lightest",
    fontWeight: "300",
    fontSize: "sm",
    cursor: "pointer",
  },
  buttonStyles,
  variants
)

export default Button
