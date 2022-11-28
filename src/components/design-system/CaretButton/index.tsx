import Icon from '@/helpers/Icon'
import CaretBottom from 'src/icons/caret-bottom'
import CaretLeft from 'src/icons/caret-left'
import CaretRight from 'src/icons/caret-right'
import CaretTop from 'src/icons/caret-top'
import Button, { ButtonProps } from '../Button'

type CaretButtonProps = {
  orientation?: 'left' | 'right' | 'top' | 'bottom'
}

const buttons = {
  left: CaretLeft,
  right: CaretRight,
  top: CaretTop,
  bottom: CaretBottom
}

const CaretButton = ({
  orientation = 'left',
  ...props
}: ButtonProps & CaretButtonProps) => {
  const Caret = buttons[orientation]

  return (
    <Button
      width="30px"
      bg="success.dark"
      borderRadius="md"
      {...props}
      p={0}
      display="flex"
      css={{
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease',
        ':hover': {
          opacity: 0.9
        }
      }}
    >
      <Icon
        width="20px"
        height="30px"
        fill="#fff"
        css={{ verticalAlign: 'middle' }}
      >
        <Caret />
      </Icon>
    </Button>
  )
}

export default CaretButton
