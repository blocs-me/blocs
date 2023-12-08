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
  shadow,
  space,
  typography,
  variant
} from 'styled-system'
import { CheckoutButtonProps } from './types'
import { flexbox } from 'styled-system'
import { useTheme } from '@emotion/react'
import { Theme } from 'src/styles/theme'
import { forwardRef, Ref, useState } from 'react'
import Skeleton from '@/helpers/Skeleton'
import Box from '@/helpers/Box'
import themeGet from '@styled-system/theme-get'
import Loader from '../Loader'
import Flex from '@/helpers/Flex'

const hoverColor = (props) =>
  props.hoverColor
    ? {
        '&:hover': {
          'svg *': {
            fill: props.hoverColor
              ? themeGet(`colors.${props.hoverColor}`)(props)
              : 'inherit'
          },
          color: props.hoverColor
            ? themeGet(`colors.${props.hoverColor}`)(props)
            : 'inherit'
        }
      }
    : {}

const hoverBg = (props) =>
  props.hoverBg
    ? {
        '&:hover': {
          background: props.hoverBg
            ? themeGet(`colors.${props.hoverBg}`)(props)
            : 'inherit'
        }
      }
    : {}

const buttonStyles = compose(
  layout,
  color,
  space,
  padding,
  typography,
  border,
  flexbox,
  shadow
)

const variants = variant({
  variants: {
    default: {
      border: 'none',
      outline: 'none',
      color: 'background',
      fontWeight: '300',
      fontSize: 'sm',
      cursor: 'pointer',
      px: 'sm',
      py: 'xs'
    },
    outlined: {
      border: 'solid 1px',
      outline: 'none',
      color: 'foreground',
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
      bg: 'foreground',
      py: 'xs',
      px: 'sm',
      color: 'background',
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
    },
    success: {
      fontSize: 'sm',
      borderRadius: 'md',
      color: 'neutral.white',
      bg: 'success.medium',
      fontWeight: 200,
      px: 'sm',
      py: 'xs'
    },
    danger: {
      fontSize: 'sm',
      borderRadius: 'md',
      color: 'neutral.white',
      bg: 'danger.medium',
      fontWeight: 200,
      px: 'sm',
      py: 'xs'
    }
  }
})

const Btn = styled('button', {
  shouldForwardProp
})<CheckoutButtonProps>(
  {
    position: 'relative',
    overflow: 'hidden',

    transition:
      'transform 0.5s ease, color 0.2s ease,  background 0.2s ease, opacity 0.2s ease',
    '& *': {
      transition:
        'transform 0.5s ease, color 0.2s ease,  background 0.2s ease, opacity 0.2s ease'
    },

    '&:active': {
      transform: 'scale(0.96)'
    },
    '&:disabled': {
      opacity: 0.6
    }
  },
  hoverColor,
  hoverBg,
  buttonStyles,
  variants
)

const CheckoutButton = forwardRef(
  (
    {
      children,
      as: btnType,
      loading = false,
      gap,
      className,
      ...props
    }: WithChildren<CheckoutButtonProps>,
    ref?: Ref<HTMLButtonElement>
  ) => {
    return (
      <Btn
        as={btnType as any}
        ref={ref}
        {...props}
        className={className}
      >
        <Flex flexDirection="row" center>
        <Box
          as="span"
          css={{
            opacity: 'var(--opacity)',
            paddingRight: '5px',
          }}
        >
          {children}
        </Box>
        {loading && <Loader width="20px" height="20px" speed='1s'/>}
        </Flex>
      </Btn>
    )
  }
)

export default CheckoutButton
