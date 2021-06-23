/** @jsxImportSource @emotion/react */
import fadeIn from "../../keyframes/fadeIn"

const FadeIn = (props) => (
  <div
    css={{
      animation: `${fadeIn} ${props.duration || "1s"} ease-in-out ${
        (props.index * 7) / 10
      }s forwards`,
      opacity: 0,
    }}
  >
    {props.children}
  </div>
)

export default FadeIn
