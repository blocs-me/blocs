/** @jsxImportSource @emotion/react */
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  border: solid 5px;
  border-color: ${themeGet('colors.brand.accent-4')};
  border-left-color: ${themeGet('colors.brand.accent-1')};
  animation: ${rotate} 2s linear infinite;
  width: ${({ width }) => width || '40px'};
  height: ${({ height }) => height || '40px'};
  border-radius: 50%;
`

const Loader = ({ width, height }) => (
  <Container width={width} height={height} />
)

export default Loader
