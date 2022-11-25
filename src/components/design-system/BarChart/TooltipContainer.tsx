import Box from '@/helpers/Box'
import { MouseEvent, ReactNode, useRef, useState } from 'react'
import { WithChildren } from '@/utils/tsUtils'
import { BarChartProps } from './types'
import { useDebouncedFn } from 'beautiful-react-hooks'
import { UseBarChartReturn } from './useBarChart/useBarChart'
import BarChartTooltip from './BarChartTooltip'

type Props = Pick<BarChartProps, 'width' | 'renderTooltip' | 'timePeriod'> &
  Pick<UseBarChartReturn, 'data' | 'stepX'> & {
    children?: ReactNode
  }

const TooltipContainer = ({ children, data, stepX, renderTooltip }: Props) => {
  const [pos, setPos] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const posData = data[pos]

  const handleMouseMove = useDebouncedFn((e: MouseEvent) => {
    const el = e.target as HTMLDivElement
    const { left, width: w } = el.getBoundingClientRect()
    const relativePos = Math.round((data.length - 1) * ((e.clientX - left) / w))
    setPos(relativePos)
  }, 5)

  return (
    <Box
      width="100%"
      height="100%"
      zIndex={10}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMoveCapture={(e: MouseEvent) => handleMouseMove(e)}
    >
      {children}
      {isHovering && (
        <Box
          boxShadow="sm"
          position="absolute"
          bottom="var(--y)"
          transform={`
            translate(var(--x), var(--y))
          `}
          style={{
            '--x': `${stepX(pos)}px`,
            '--y': posData?.height,
            transition: 'bottom ease 0.3s, transform ease 0.3s'
          }}
          css={{ pointerEvents: 'none' }}
        >
          <BarChartTooltip total={data.length} pos={pos}>
            {renderTooltip(posData)}
          </BarChartTooltip>
        </Box>
      )}
    </Box>
  )
}

export default TooltipContainer
