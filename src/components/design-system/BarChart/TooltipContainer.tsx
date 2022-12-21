import Box from '@/helpers/Box'
import { MouseEvent, ReactNode, useMemo, useRef, useState } from 'react'
import { BarChartProps } from './types'
import { useDebouncedCallback } from 'beautiful-react-hooks'
import { UseBarChartReturn } from './useBarChart/useBarChart'
import BarChartTooltip from './BarChartTooltip'

type Props = Pick<BarChartProps, 'width' | 'renderTooltip' | 'timePeriod'> &
  Pick<UseBarChartReturn, 'data' | 'stepX'> & {
    children?: ReactNode
  }

type Orientation = 'left' | 'right'

const TooltipContainer = ({
  children,
  data,
  stepX,
  renderTooltip,
  timePeriod
}: Props) => {
  const [pos, setPos] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const container = useRef<HTMLDivElement>()
  const tooltip = useRef<HTMLDivElement>(null)

  const posData = data[pos]
  const handleMouseMove = useDebouncedCallback(
    (e: MouseEvent) => {
      const el = e.target as HTMLDivElement
      const { left, width: w } = el.getBoundingClientRect()

      const relativePos = Math.round(
        (data.length - 1) * ((e.clientX - left) / w)
      )
      setPos(relativePos)
    },
    [],
    10
  )

  const [xPos, orientation] = useMemo((): [number, Orientation] => {
    const containerWidth = container.current?.getBoundingClientRect().width
    const tooltipWidth = Math.max(
      tooltip.current?.getBoundingClientRect().width,
      100
    )
    const xPos = stepX(pos)

    if (xPos + tooltipWidth > containerWidth) {
      return [xPos - (tooltipWidth + 35) / 2, 'right']
    }

    return [xPos + (tooltipWidth + 35) / 2, 'left']
  }, [pos]) // eslint-disable-line

  return (
    <Box
      ref={container}
      zIndex={10}
      width="100%"
      height="100%"
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
            translateX(var(--x))
          `}
          style={{
            '--x': `${xPos}px`,
            '--y':
              timePeriod === 'weekly'
                ? `calc(${posData?.height} + 50px)`
                : `calc(${posData?.height} + 30px)`,
            transition: 'bottom ease 0.3s, transform ease 0.3s'
          }}
          css={{ pointerEvents: 'none' }}
        >
          <BarChartTooltip
            ref={tooltip}
            notch={orientation}
            total={data.length}
            pos={pos}
          >
            {renderTooltip(posData)}
          </BarChartTooltip>
        </Box>
      )}
    </Box>
  )
}

export default TooltipContainer
