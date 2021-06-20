/** @jsxImportSource @emotion/react */
import { useRouter } from "next/router"
import { memo, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useClickOutside } from "../../hooks/useClickOutside"
import Box from "../Box"
import Flex from "../Flex"
import { PageGutters } from "../PageLayout"
import BackArrow from "../../icons/back-arrow-dark.svg"
import Icon from "../Icon"
import fadeIn from "../../keyframes/fadeIn"

const Modal = ({
  children,
  visible = false,
  hideModal = () => {},
  backButton = false,
  redirectTo = "/",
}) => {
  const ref = useRef(null)
  const container = global.window ? document.createElement("div") : false
  const router = useRouter()

  useClickOutside({
    element: ref,
    onClickOutside: hideModal,
  })

  useEffect(() => {
    const root = global.window ? document.querySelector("body") : null
    root.appendChild(container)

    return () => {
      root?.removeChild(container)
    }
  }, [container])

  if (!container) return null
  if (!visible) return null

  return createPortal(
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      zIndex="modal"
      bg="rgba(0,0,0,0.2)"
      css={{
        backdropFilter: "blur(5px) saturate(50%)",
        animation: `${fadeIn} 1.5s ease forwards`,
      }}
    >
      <PageGutters width="100%" height="100%">
        <Flex width="100%" height="100%">
          <div ref={ref} css={{ margin: "auto" }}>
            <Box
              borderRadius="lg"
              boxShadow="lg"
              p="md"
              minWidth={["100%", "100%", "300px", "400px"]}
              bg="background"
              position="relative"
            >
              {children}
              {backButton && (
                <Flex
                  position="absolute"
                  as="button"
                  top="xs"
                  left="xs"
                  onClick={() => router.push(redirectTo)}
                >
                  <Icon size="15px">
                    <BackArrow />
                  </Icon>
                </Flex>
              )}
            </Box>
          </div>
        </Flex>
      </PageGutters>
    </Box>,

    container
  )
}

export default Modal
