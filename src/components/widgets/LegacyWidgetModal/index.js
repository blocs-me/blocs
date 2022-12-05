import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useRef } from 'react'
import CrossIcon from '../../../icons/cross.svg'

const { useTheme } = require('@emotion/react')
const {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m
} = require('framer-motion')
const { default: Card } = require('@/design-system/Card')

const WidgetModal = ({
  open,
  children,
  framerKey = '',
  hideModal,
  onAnimationComplete,
  readonly,
  p = 'sm'
}) => {
  const theme = useTheme()

  const containerStyle = {
    position: 'absolute',
    width: '100%',
    height: 'fit-content',
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    padding: theme.space.sm,
    zIndex: theme.zIndices.modal,
    background: 'none'
  }

  const containerRef = useRef()

  useClickOutside({
    element: containerRef,
    onClickOutside: hideModal
  })

  return (
    <AnimatePresence>
      {open && (
        <LazyMotion features={domAnimation}>
          <m.div
            onAnimationComplete={onAnimationComplete?.()}
            key={framerKey}
            css={containerStyle}
            style={{ position: 'absolute' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
          >
            <Card
              width="100%"
              height="100%"
              p={p}
              position="relative"
              ref={containerRef}
            >
              {children}
              {!readonly && (
                <Flex
                  onClick={(e) => hideModal(e)}
                  as="button"
                  position="absolute"
                  top={0}
                  left={0}
                  css={{ transform: 'translate(-25%, -25%)' }}
                  bg="danger.medium"
                  size="25px"
                  borderRadius="50%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon fill="primary.accent-1" p="1px">
                    <CrossIcon />
                  </Icon>
                </Flex>
              )}
            </Card>
          </m.div>
        </LazyMotion>
      )}
    </AnimatePresence>
  )
}

export default WidgetModal
