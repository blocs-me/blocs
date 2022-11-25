import Box from '@/helpers/Box'
import Notch from '@/helpers/Notch'
import { WithChildren } from '@/utils/tsUtils'
import { forwardRef } from 'react'

type Props = WithChildren<{ pos: number; total: number }>

const BarChartTooltip = forwardRef(({ children, pos, total }: Props, ref) => {
  const place = pos > total / 2 ? 'right' : 'left'

  return (
    <Box
      zIndex={10}
      borderRadius="md"
      p="xs"
      bg="background"
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
      <Notch place="left" vtlPos="middle" />
    </Box>
  )
})

export default BarChartTooltip
