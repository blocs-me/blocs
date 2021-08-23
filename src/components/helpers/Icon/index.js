import styled from "@emotion/styled"
import shouldForwardProp from "@styled-system/should-forward-prop"
import { system, compose, color, layout, display, space } from "styled-system"
import themeGet from "@styled-system/theme-get"

const iconStyles = compose(color, layout, display, space)

const Icon = styled("div", {
  shouldForwardProp,
})(
  (props) => ({
    svg: {
      width: "100%",
      maxWidth: "100%",
      maxHeight: "100%",
      "& path, circle, rect": {
        fill: props.fill ? themeGet(`colors.${props.fill}`)(props) : " none",
        stroke: props.stroke
          ? themeGet(`colors.${props.stroke}`)(props)
          : "none",
      },
    },
  }),
  iconStyles
)

export default Icon
