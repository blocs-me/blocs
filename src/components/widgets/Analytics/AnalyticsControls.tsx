import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

type Props = {
  onClickNext: () => void
  onClickPrev: () => void
  ariaLabelPrev?: string
  ariaLabelNext?: string
  size?: string
  gap?: String
}

const IconWrapper = ({ children, size }) => (
  <Icon
    as="span"
    size={size}
    stroke="primary.accent-4"
    strokeWidth="5px"
    selector="polyline"
  >
    {children}
  </Icon>
)

const AnalyticsControls = ({
  onClickNext,
  onClickPrev,
  gap = 'sm',
  size = '25px',
  ariaLabelNext = 'next data',
  ariaLabelPrev = 'previous data'
}: Props) => {
  return (
    <Flex gap={gap}>
      <button
        onClick={() => onClickPrev()}
        aria-label={ariaLabelPrev}
        css={{ display: 'flex' }}
      >
        <IconWrapper size={size}>
          <FiChevronLeft css={{ height: '100%' }} />
        </IconWrapper>
      </button>
      <button
        onClick={() => onClickNext()}
        aria-label={ariaLabelNext}
        css={{ display: 'flex' }}
      >
        <IconWrapper size={size}>
          <FiChevronRight css={{ height: '100%' }} />
        </IconWrapper>
      </button>
    </Flex>
  )
}

export default AnalyticsControls
