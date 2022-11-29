import { IBox } from '../../helpers/Box/Box.types'
import { TypographyProps, FlexboxProps, LayoutProps } from 'styled-system'

export type ButtonProps = IBox &
  TypographyProps & {
    variant?: 'default' | 'outlined' | 'lightBg' | 'primary' | 'round'
    icon?: JSX.Element
    as?: string
  } & JSX.IntrinsicElements['button'] &
  FlexboxProps &
  LayoutProps
