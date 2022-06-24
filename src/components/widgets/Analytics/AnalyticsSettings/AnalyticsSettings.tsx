import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import Stack from '@/helpers/Stack'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

type Props = {
  onClickNext: () => void
  onClickPrev: () => void
  ariaLabelPrev: string
  ariaLabelNext: string
  size: string
  gap: number
}

const AnalyticsSettings = ({ onClickNext, onClickPrev, gap = 2 }: Props) => {
  return (
    <Stack ml={gap}>
      <button onClick={() => onClickPrev()}>
        <Icon width="25px" stroke="primary.accent-0.5">
          <FiArrowLeft />
        </Icon>
      </button>
      <button onClick={() => onClickNext()}>
        <Icon width="25px" stroke="primary.accent-0.5">
          <FiArrowRight />
        </Icon>
      </button>
    </Stack>
  )
}

export default AnalyticsSettings
