/** @jsxImportSource @emotion/react */
import fadeIn from "../../keyframes/fadeIn"

const FadeIn = (props) => (
  <div
    css={{
      animation: `${fadeIn} ${props.duration || "0.5s"} ease-in-out ${
        props.delay || ""
      } forwards`,
      opacity: 0,
    }}
  >
    {props.children}
  </div>
)

export default FadeIn
