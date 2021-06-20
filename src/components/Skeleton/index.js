/** @jsxImportSource @emotion/react */
import { css, keyframes, useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import Box from "../Box"

const animation = (theme) => keyframes`
  0% {
    opacity: 0.2;
  } 100% {
    opacity: 1;
  }
`

const Skeleton = (props) => {
  const theme = useTheme()

  return (
    <Box
      {...props}
      bg="primary.lightest"
      css={css`
        animation: ${animation(theme)} 1s ease-in-out alternate infinite;
      `}
    />
  )
}

export default Skeleton
