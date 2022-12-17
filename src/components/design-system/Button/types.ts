import { IBox } from '../../helpers/Box/Box.types'
import { TypographyProps, FlexboxProps, LayoutProps } from 'styled-system'

export type ButtonProps = IBox &
  TypographyProps & {
    variant?:
      | 'default'
      | 'outlined'
      | 'lightBg'
      | 'primary'
      | 'round'
      | 'success'
      | 'danger'

    icon?: JSX.Element
    as?: string
    loading?: boolean
    gap?: string
    iconProps?: any
  } & JSX.IntrinsicElements['button'] &
  FlexboxProps &
  LayoutProps
