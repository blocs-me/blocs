import Icon from '@/helpers/Icon'
import CaretLeft from 'src/icons/caret-left'
import CaretRight from 'src/icons/caret-right'
import Button, { ButtonProps } from '../Button'

type CaretButtonProps = {
  orientation?: 'left' | 'right'
}

const CaretButton = ({
  orientation = 'left',
  ...props
}: ButtonProps & CaretButtonProps) => {
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
        {orientation === 'left' ? <CaretLeft /> : <CaretRight />}
      </Icon>
    </Button>
  )
}

export default CaretButton
