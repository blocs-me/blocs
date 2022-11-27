import Box from '@/helpers/Box'
import {
  MouseEvent,
  ReactNode,
  useMemo,
  useRef,
  useState,
  useCallback
} from 'react'
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
  const container = useRef<HTMLDivElement>()
  const tooltip = useRef<HTMLDivElement>(null)
  const tooltipWidth = useMemo(
    () => tooltip.current?.getBoundingClientRect().width || 0,
    [tooltip.current] // eslint-disable-line
  )

  const posData = data[pos]
  const [orientation, setOrientation] = useState<'left' | 'right'>('left')

  const handleMouseMove = useDebouncedFn((e: MouseEvent) => {
    const el = e.target as HTMLDivElement
    const { left, width: w } = el.getBoundingClientRect()

    const relativePos = Math.round((data.length - 1) * ((e.clientX - left) / w))
    setPos(relativePos)
  }, 5)

  const xPos = useMemo(() => {
    const xPos = stepX(pos) + tooltipWidth

    const containerWidth = container.current?.getBoundingClientRect().width

    if (xPos > containerWidth) {
      setOrientation('right')
      return stepX(pos) - tooltipWidth
    }

    if (orientation !== 'left') setOrientation('left')

    return xPos
  }, [pos]) // eslint-disable-line

  return (
    <Box
      ref={container}
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
            translateX(var(--x))
          `}
          style={{
            '--x': `${xPos}px`,
            '--y': posData?.height,
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
