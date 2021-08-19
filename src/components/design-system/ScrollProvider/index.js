import Box from "@/helpers/Box"
import styled from "@emotion/styled"
import themeGet from "@styled-system/theme-get"

const ScrollProvider = styled(Box)`
  overflow: auto;

  &::-webkit-scrollbar {
    background: ${themeGet("colors.primary.accent-1")};
    width: 4px;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${themeGet("colors.primary.accent-4")};
    border-radius: 50px;
  }
`
export default ScrollProvider
