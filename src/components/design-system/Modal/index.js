/** @jsxImportSource @emotion/react */
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import BackArrow from '../../../icons/back-arrow-dark.svg'
import fadeIn from 'src/styles/keyframes/fadeIn'
import Icon from '@/helpers/Icon'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useMemo } from 'react'
import PageGutters from '@/helpers/PageGutters'

const Modal = ({
  children,
  visible = false,
  hideModal = () => {},
  backButton = false,
  redirectTo = '/'
}) => {
  const ref = useRef(null)
  const container = useMemo(
    () => (global.window ? document.createElement('div') : false),
    []
  )
  const router = useRouter()

  const handleExit = () => {
    hideModal()
    router.push(redirectTo)
  }

  useClickOutside({
    element: ref,
    onClickOutside: hideModal
  })

  useEffect(() => {
    const root = global.window ? document.querySelector('body') : null
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
        backdropFilter: 'blur(5px) saturate(50%)',
        animation: `${fadeIn} 0.6s ease forwards`
      }}
    >
      <PageGutters width="100%" height="100%">
        <Flex width="100%" height="100%">
          <div ref={ref} css={{ margin: 'auto' }}>
            <Box
              borderRadius="lg"
              boxShadow="lg"
              p="md"
              minWidth={['100%', '100%', '300px', '400px']}
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
                  onClick={() => handleExit()}
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
