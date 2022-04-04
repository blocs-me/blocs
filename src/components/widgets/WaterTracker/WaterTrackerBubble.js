import Box from "@/helpers/Box"
import styled from "@emotion/styled"
import { themeGet } from "@styled-system/theme-get"

const theme = {
  light: {},
  dark: {},
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${themeGet("radii.md")};
`

const WaterTrackerBubble = () => {
  return <Container></Container>
}

export default WaterTrackerBubble
