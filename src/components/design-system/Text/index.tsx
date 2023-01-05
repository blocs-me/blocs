import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { LayoutProps } from 'styled-system'
import {
  ColorProps,
  FontSizeProps,
  FontWeightProps,
  SpaceProps,
  TypographyProps,
  color,
  layout,
  space,
  system,
  typography,
  variant
} from 'styled-system'

const p = {
  fontSize: ['sm', 'sm', , 'md'],
  color: 'foreground',
  fontWeight: '300'
}

const pSmall = {
  fontSize: 'xs',
  mb: 0,
  lineHeight: 1.25,
  color: 'foreground'
}

const mediumBold = {
  fontSize: 'md',
  fontWeight: '600',
  mb: 0,
  color: 'foreground'
}

const smallLight = {
  fontSize: 'sm',
  fontWeight: 200,
  mb: 0,
  color: 'primary.accent-4'
}

const li = {
  fontSize: p.fontSize
}

const h4 = {
  fontSize: p.fontSize,
  fontWeight: 'bold',
  fontFamily: 'body'
}

const textTransform = system({
  textTransform: true
})
const whiteSpace = system({
  whiteSpace: true
})

const variants = variant({
  variants: {
    pSmall,
    p,
    h4,
    li,
    mediumBold,
    smallLight
  }
})

type Variants = 'pSmall' | 'p' | 'h4' | 'li' | 'mediumBold' | 'smallLight'
type TextProps = TypographyProps &
  ColorProps &
  SpaceProps &
  LayoutProps & {
    datetime?: string
    textTransform?: string
    css?: any
    whiteSpace?: string
    as?: string
  }

const Text = styled('p', { shouldForwardProp })<
  {
    variant?: Variants
    css?: any
  } & TextProps
>(space, typography, textTransform, whiteSpace, color, variants, layout)

export default Text
