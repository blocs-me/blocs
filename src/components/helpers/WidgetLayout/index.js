/** @jsxImportSource @emotion/react */
import Box from "../Box"
import MenuIcon from "./MenuIcon"
import { useRouter } from "next/router"
import fadeIn from "@/keyframes/fadeIn"
import { useRef } from "react"
import { useState } from "react"

const WidgetLayout = ({
  children,
  onMenuClick,
  menuAria,
  iconType,
  hideMenuIcon,
}) => {
  const { pathname } = useRouter()
  const container = useRef()

  const getAriaLabel = () => {
    if (menuAria) return menuAria()

    if (pathname === "/") {
      return "Main Navigation Menu"
    }

    return "Go back"
  }

  const [hovering, setHovering] = useState(false)

  const handleMouseOver = (e) => {
    if (container.current?.contains(e.target)) {
      setHovering(true)
    }
  }

  const handleMouseLeave = (e) => {
    setHovering(false)
  }

  const showMenuIcon = hovering ? true : !hideMenuIcon

  return (
    <Box
      width="100%"
      height="100%"
      boxShadow="widgetLayout"
      borderRadius="lg"
      bg="bg.default"
      overflow="hidden"
      position="relative"
      id="widget-layout"
      ref={container}
      onMouseOver={(e) => handleMouseOver(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
    >
      {showMenuIcon && (
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
