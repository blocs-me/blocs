import styled from "@emotion/styled"
import shouldForwardProp from "@styled-system/should-forward-prop"
import {
  border,
  color,
  compose,
  layout,
  padding,
  space,
  typography,
  variant,
} from "styled-system"

const buttonStyles = compose(layout, color, space, padding, typography, border)

const variants = variant({
  variants: {
    round: {
      borderRadius: "lg",
      bg: "primary.dark",
      color: "background",
    },
    primary: {
      border: "none",
      outline: "none",
      background: "primary.dark",
      color: "primary.lightest",
      fontWeight: "300",
      fontSize: "sm",
      cursor: "pointer",
    },
  },
})

const Button = styled("button", {
  shouldForwardProp,
})(
  {
    transition: "transform 0.5s ease",
    "&:active": {
      transform: "scale(0.96)",
    },
  },
  buttonStyles,
  variants
)

export default Button
