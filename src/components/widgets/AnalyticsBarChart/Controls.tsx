import CaretButton from '@/design-system/CaretButton'
import Stack from '@/helpers/Stack'

const Controls = ({ onClickLeft = () => {}, onClickRight = () => {} }) => {
  return (
    <Stack ml="sm" display="flex">
      <CaretButton onClick={() => onClickLeft()} />
      <CaretButton orientation="right" onClick={() => onClickRight()} />
    </Stack>
  )
}

export default Controls
