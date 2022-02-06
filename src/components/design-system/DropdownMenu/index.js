import Box from "@/helpers/Box"
import FadeIn from "@/helpers/FadeIn"
import { default as Flex } from "@/helpers/Flex"

const DropdownMenu = ({ open, menuIcon = Ellipsed, children }) => (
  <Flex flexDirection="column" alignItems="center">
    {menuIcon}
    {open && (
      <Box
        position="absolute"
        bottom="0"
        left="50%"
        css={{ transform: "translateX(-50%)" }}
      >
        {children}
      </Box>
    )}
  </Flex>
)

export default DropdownMenu
