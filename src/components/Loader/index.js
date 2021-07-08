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
  border-color: ${themeGet("colors.primary.accent-2")};
  border-left-color: ${themeGet("colors.primary.accent-1")};
  animation: ${rotate} 2s linear infinite;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const Loader = (props) => <Container>{props.children}</Container>

export default Loader
