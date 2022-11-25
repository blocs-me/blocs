import Box from '@/helpers/Box'
import Notch from '@/helpers/Notch'
import { WithChildren } from '@/utils/tsUtils'
import { forwardRef } from 'react'

type Props = WithChildren<{ pos: number; total: number }>

const BarChartTooltip = forwardRef(({ children }: Props, ref) => {
  return (
    <Box
      zIndex={10}
      borderRadius="md"
      p="xs"
      bg="primary.accent-1"
      boxShadow="default"
      ref={ref}
      css={{
        pointerEvents: 'none',
        transform: 'translate(100%, -25%)'
      }}
      position="relative"
    >
      <Box
        css={{
          pointerEvents: 'none'
        }}
      >
        {children}
      </Box>
      <Notch place="left" vtlPos="middle" color="primary.accent-1" />
    </Box>
  )
})

export default BarChartTooltip
