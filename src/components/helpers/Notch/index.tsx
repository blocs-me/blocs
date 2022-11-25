import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'
import { forwardRef, LegacyRef } from 'react'
import Box from '../Box'
import { IBox } from '../Box/Box.types'

const getTransform = ({ place }: { place?: string }) => {
  if (place === 'right') return `translate(0%, 50%) rotate(90deg)`
  if (place === 'left') return `translate(-100%, 50%) rotate(-90deg)`
  if (place === 'bottom') return `rotate(180deg) translate(0, -50%)`
  return 'none'
}

const getBottom = ({ vtlPos = 'middle' }) => {
  if (vtlPos === 'middle') return '50%'
  if (vtlPos === 'top') return '100%'
  return 0
}

const getHorizontalPos = ({ place }: ITriangle) => {
  if (place === 'left') return '0%'
  if (place === 'right') return '100%'
}

type ITriangle = {
  place?: 'left' | 'right' | string
  vtlPos?: 'middle' | 'top' | 'bottom'
}

const Triangle = styled.div<ITriangle>`
  position: absolute;
  left: ${getHorizontalPos};
  bottom: ${getBottom};
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid transparent;
  border-bottom: 10px solid ${themeGet('colors.bg.default')};
  transform: ${getTransform};
`

type Props = IBox & { className?: string } & ITriangle

const Notch = forwardRef(
  (
    { place, className, vtlPos, ...props }: Props,
    ref: LegacyRef<HTMLDivElement>
  ) => (
    <Box {...props} className={className}>
      <Triangle ref={ref} place={place} vtlPos={vtlPos} />
    </Box>
  )
)

export default Notch
