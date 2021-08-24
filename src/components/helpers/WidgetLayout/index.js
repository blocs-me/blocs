/** @jsxImportSource @emotion/react */
import Box from "../Box"
import MenuIcon from "./MenuIcon"
import { useRouter } from "next/router"
import FadeIn from "../FadeIn"
import fadeIn from "@/keyframes/fadeIn"

const WidgetLayout = ({
  children,
  onMenuClick,
  menuAria,
  iconType,
  hideMenuIcon,
}) => {
  const { pathname } = useRouter()

  const getAriaLabel = () => {
    if (menuAria) return menuAria()

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
      {!hideMenuIcon && (
        <Box
          top={0}
          right={0}
          position="absolute"
          zIndex="nav"
          css={{
            transform: "translate(25%, -25%)",
            transition: "opacity 0.5s ease",
            animation: `${fadeIn} 1s ease`,
          }}
        >
          <button aria-label={getAriaLabel()} onClick={() => onMenuClick()}>
            <MenuIcon iconType={iconType} />
          </button>
        </Box>
      )}
      {children}
    </Box>
  )
}

export default WidgetLayout
