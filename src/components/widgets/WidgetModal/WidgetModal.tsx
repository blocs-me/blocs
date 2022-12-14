import { useEffect, useState, useRef, useMemo } from 'react'
import Flex from '@/helpers/Flex'
import useDarkMode from '@/hooks/useDarkMode'
import useColorMode from '../../../hooks/useColorMode/index'
import { WithChildren } from '../../../utils/tsUtils/WithChildren'
import { animate } from 'motion'
import Box from '@/helpers/Box'
import { createPortal } from 'react-dom'
import { useClickOutside } from '@/hooks/useClickOutside'

type Props = WithChildren<{
  open?: boolean
  closeModal: () => void
  appendTo: string
}>

const ModalBody = ({ closeModal, children }: Omit<Props, 'appendTo'>) => {
  const isDarkMode = useDarkMode()
  const { colorMode } = useColorMode()
  const container = useRef<HTMLElement>()
  const childrenWrapper = useRef<HTMLDivElement>()

  const bgColor = (() => {
    if (colorMode === 'dark' || (isDarkMode && colorMode === 'auto'))
      return 'rgba(0,0,0,0.5)'
    return 'rgba(255,255,255,0.5)'
  })()

  const handleClose = (event: MouseEvent) => {
    animate(
      container.current,
      {
        opacity: 0
      },
      {
        duration: 1
      }
    ).finished.then(() => closeModal())
  }

  useClickOutside({
    element: childrenWrapper,
    onClickOutside: handleClose
  })

  useEffect(() => {
    if (container.current) {
      animate(
        container.current,
        {
          opacity: 1
        },
        {
          duration: 1
        }
      )
    }
  }, [])

  return (
    <Flex
      ref={container}
      position="absolute"
      borderRadius="lg"
      top="0"
      left="0"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
      zIndex="1000"
      px="md"
      css={{
        opacity: 0,
        backdropFilter: 'blur(10px) saturate(10%)'
      }}
    >
      <Box
        height="fit-content"
        minWidth="250px"
        borderRadius="lg"
        bg="background"
        boxShadow="default"
        ref={childrenWrapper}
      >
        {children}
      </Box>
    </Flex>
  )
}

const WidgetModal = ({ children, open, closeModal, appendTo }: Props) => {
  const div = useMemo(() => {
    return global.window ? document?.createElement('div') : null
  }, [])

  useEffect(() => {
    const divToAppendTo = document?.querySelector(appendTo)

    divToAppendTo?.appendChild(div as Element)

    return () => {
      divToAppendTo?.removeChild(div as Element)
    }
  }, [appendTo, div])

  if (!open || !div) return null

  return createPortal(
    <ModalBody closeModal={closeModal}>{children}</ModalBody>,
    div
  )
}

export default WidgetModal
