import { keyframes } from "@emotion/react"

const slideOut = keyframes`
  0% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  100% {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  
`

export default slideOut
