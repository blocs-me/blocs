import Icon from '@/helpers/Icon'
import { WithChildren } from '@/utils/tsUtils'
import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import {
  border,
  color,
  compose,
  layout,
  padding,
  space,
  typography,
  variant
} from 'styled-system'
import { ButtonProps } from './types'
import { flexbox } from 'styled-system'
import { useTheme } from '@emotion/react'
import { Theme } from 'src/styles/theme'
import { forwardRef, Ref } from 'react'

const buttonStyles = compose(
  layout,
  color,
  space,
  padding,
  typography,
  border,
  flexbox
)

const variants = variant({
  variants: {
    default: {
      border: 'none',
      outline: 'none',
      color: 'primary.accent-1',
      fontWeight: '300',
      fontSize: 'sm',
      cursor: 'pointer',
      px: 'sm',
      py: 'xs'
    },
    outlined: {
      border: 'solid 1px',
      outline: 'none',
      color: 'primary.accent-4',
      fontWeight: '300',
      fontSize: 'sm',
      cursor: 'pointer',
      px: 'sm',
      py: 'xs'
    },
    round: {
      borderRadius: 'lg',
      bg: 'primary.accent-4',
      color: 'background'
    },
    primary: {
      border: 'none',
      outline: 'none',
      background: 'primary.accent-4',
      color: 'primary.accent-1',
      fontWeight: '300',
      fontSize: 'sm',
      cursor: 'pointer'
    },
    lightBg: {
      border: 'none',
      outline: 'none',
      background: 'primary.accent-1',
      color: 'primary.accent-4',
      fontWeight: '300',
      fontSize: 'sm',
      cursor: 'pointer',
      '&:hover': {
        bg: 'primary.accent-4',
        color: 'primary.accent-1'
      }
    }
  }
})

const Btn = styled('button', {
  shouldForwardProp
})<ButtonProps>(
  {
    transition: 'transform 0.5s ease, color 0.2s ease,  background 0.2s ease',
    '&:active': {
      transform: 'scale(0.96)'
    },
    '&:disabled': {
      opacity: 0.8
    }
  },
  buttonStyles,
  variants
)

const Button = forwardRef(
  (
    { children, as: btnType, icon, ...props }: WithChildren<ButtonProps>,
    ref: Ref<HTMLButtonElement>
  ) => {
    const theme = useTheme() as Theme
    return (
      <Btn as={btnType as any} ref={ref} {...props}>
        {icon && (
          <Icon
            as="span"
            display="inline-flex"
            fill={props.color}
            width="20px"
            mr="sm"
            style={{ '--accent-1': theme.colors.primary['accent-35'] }}
            css={{ verticalAlign: 'middle' }}
          >
            {icon}
          </Icon>
        )}
        {children}
      </Btn>
    )
  }
)

export default Button
