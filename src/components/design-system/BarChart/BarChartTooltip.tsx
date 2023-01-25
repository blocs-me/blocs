import Box from '@/helpers/Box'
import Notch from '@/helpers/Notch'
import { WithChildren } from '@/utils/tsUtils'
import { forwardRef, LegacyRef, ReactNode } from 'react'

type Props = {
  pos?: number
  total?: number
  notch: 'left' | 'right'
  children?: ReactNode
}

const BarChartTooltip = forwardRef(
  ({ children, notch }: Props, ref: LegacyRef<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <Box
          zIndex={10}
          borderRadius="md"
          p="xs"
          bg="primary.accent-1"
          boxShadow="lg"
          width="fit-content"
          transform="translateY(50%)"
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
