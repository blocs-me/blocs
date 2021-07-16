/** @jsxImportSource @emotion/react */
import Box from "../Box"
import MenuIcon from "./MenuIcon"
import { useRouter } from "next/router"

const WidgetLayout = ({ children }) => {
  const { pathname } = useRouter()

  const getAriaLabel = () => {
    if (pathname === "/") {
      return "Main Navigation Menu"
    }

    return "Go back"
  }

  return (
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
        top={0}
        right={0}
        position="absolute"
        zIndex="nav"
        css={{ transform: "translate(25%, -25%)" }}
      >
        <button aria-label={getAriaLabel()}>
          <MenuIcon />
        </button>
      </Box>
    </Box>
  )
}

export default WidgetLayout
