/** @jsxImportSource @emotion/react */
import Box from "../Box"
import NavIcon from "../NavIcon"
import MainMenuIcon from "../../../icons/menu.svg"

const WidgetLayout = ({ children, icon = <MainMenuIcon /> }) => (
  <Box
    width="280px"
    height="350px"
    boxShadow="default"
    borderRadius="lg"
    bg="bg.default"
    overflow="hidden"
    position="relative"
  >
    {children}
    <Box
      position="absolute"
      top="0"
      right="0"
      css={{ transform: "translate(25%, -25%)" }}
    >
      <NavIcon>{icon}</NavIcon>
    </Box>
  </Box>
)

export default WidgetLayout
