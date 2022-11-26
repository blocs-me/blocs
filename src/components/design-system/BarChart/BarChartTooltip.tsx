import Box from '@/helpers/Box'
import Notch from '@/helpers/Notch'
import { WithChildren } from '@/utils/tsUtils'
import { forwardRef, LegacyRef } from 'react'

type Props = WithChildren<{
  pos: number
  total: number
  notch: 'left' | 'right'
}>

const BarChartTooltip = forwardRef(
  ({ children, notch }: Props, ref: LegacyRef<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <Box
          zIndex={10}
          borderRadius="md"
          p="xs"
          bg="primary.accent-1"
          boxShadow="default"
          width="fit-content"
          css={{
            pointerEvents: 'none'
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
          <Notch place={notch} vtlPos="middle" color="primary.accent-1" />
        </Box>
      </div>
    )
  }
)

export default BarChartTooltip
