import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { themeGet } from "@styled-system/theme-get"
import { variant } from "styled-system"
import Box from "../Box"
import Skeleton from "../Skeleton"

const fadeIn = keyframes`
  100% {
    opacity: 1;
  }
`

const Image = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: ${themeGet("colors.primary.lightest")};
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
`

const variants = variant({
  variants: {
    md: {
      size: "75px",
      p: "0.4rem",
    },
    sm: {
      size: "40px",
      p: "0.21rem",
    },
  },
})

const Container = styled(Box)(variants)

const Avatar = ({ src = false, variant = "md", loading = false }) => (
  <Container
    variant={variant}
    borderRadius="50%"
    boxShadow="lg"
    bg="background"
    position="relative"
  >
    {loading && <Skeleton width="100%" height="100%" borderRadius="50%" />}
    {src && !loading && <Image src={src} alt="users avatar" />}
    <Box position="absolute" size="100%" top="0" left="0" borderRadius="50%" />
  </Container>
)

export default Avatar
