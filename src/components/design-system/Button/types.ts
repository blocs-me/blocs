import { IBox } from '../../helpers/Box/Box.types'
import { TypographyProps } from 'styled-system'

export type ButtonProps = IBox &
  TypographyProps & {
    variant?: 'default' | 'outlined' | 'lightBg' | 'primary' | 'round'
  } & JSX.IntrinsicElements['button']
