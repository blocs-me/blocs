import { forwardRef, MouseEvent, Ref, useRef } from 'react'
import Button from '../Button/Button'
import { ButtonProps } from '../Button/types'
import ButtonHighlighter from './ButtonHightlighter'

const ButtonGroupButton = forwardRef(
  (
    { children, as = 'button', ...props }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <Button
        width="100%"
        display="flex"
        css={{ zIndex: 10 }}
        px="sm"
        py="xs"
        borderRadius="lg"
        alignItems="center"
        color="foreground"
        position="relative"
        fontWeight="200"
        fontSize="sm"
        as={as}
        {...props}
        ref={ref}
      >
        {children}
      </Button>
    )
  }
)
export default ButtonGroupButton
