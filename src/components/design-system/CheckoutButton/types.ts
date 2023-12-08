import { IBox } from '../../helpers/Box/Box.types'
import { TypographyProps, FlexboxProps, LayoutProps } from 'styled-system'

export type CheckoutButtonProps = IBox &
  TypographyProps & {
    variant?:
      | 'default'
      | 'outlined'
      | 'lightBg'
      | 'primary'
      | 'round'
      | 'success'
      | 'danger'
    hoverColor?: string
    hoverBg?: string
    as?: string
    loading?: boolean
    gap?: string
  } & JSX.IntrinsicElements['button'] &
  FlexboxProps &
  LayoutProps
