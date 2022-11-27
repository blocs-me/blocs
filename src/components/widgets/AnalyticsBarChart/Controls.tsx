import Button from '@/design-system/Button'
import CaretButton from '@/design-system/CaretButton'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import Stack from '@/helpers/Stack'
import Caret from 'src/icons/caret-left'
import { ButtonProps } from '../../design-system/Button/types'

const Controls = ({ onClickLeft = () => {}, onClickRight = () => {} }) => {
  return (
    <Stack ml="sm" display="flex">
      <CaretButton onClick={() => onClickLeft()} />
      <CaretButton orientation="right" onClick={() => onClickRight()} />
    </Stack>
  )
}

export default Controls
