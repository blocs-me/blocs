import Box from '@/helpers/Box'
import { forwardRef, Ref } from 'react'

const ButtonHighlighter = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  return (
    <Box position="absolute" top="0" left="0">
      <Box
        bg="primary.accent-2"
        borderRadius="lg"
        ref={ref}
        zIndex="1"
        css={{
          opacity: 'var(--active-btn-opacity, 0)',
          pointerEvents: 'none',
          transition: 'opacity ease 0.3s'
        }}
      />
    </Box>
  )
})

export default ButtonHighlighter
