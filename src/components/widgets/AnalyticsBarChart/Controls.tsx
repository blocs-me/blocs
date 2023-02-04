import CaretButton from '@/design-system/CaretButton'
import Stack from '@/helpers/Stack'

const Controls = ({ onClickLeft = () => {}, onClickRight = () => {} }) => {
  return (
    <Stack ml="sm" display="flex">
      <CaretButton
        size={['25px', , '30px']}
        onClick={() => onClickLeft()}
        aria-label="Next date range"
      />
      <CaretButton
        size={['25px', , '30px']}
        orientation="right"
        onClick={() => onClickRight()}
        aria-label="Previous date range"
      />
    </Stack>
  )
}

export default Controls
