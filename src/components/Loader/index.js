/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { themeGet } from "@styled-system/theme-get"

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  border: solid 5px;
  border-color: ${themeGet("colors.primary.light")};
  border-left-color: ${themeGet("colors.primary.lightest")};
  animation: ${rotate} 2s linear infinite;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const Loader = (props) => <Container>{props.children}</Container>

export default Loader
