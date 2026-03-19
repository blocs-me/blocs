/** @jsxImportSource @emotion/react */
import Box from '@/helpers/Box'
import { IBox } from '@/helpers/Box/Box.types'
import L from 'next/link'
import { ReactNode } from 'react'
import Text from '../Text'

type Props = Partial<{
  children: ReactNode
  href: string
  passHref: boolean
  underline: boolean
  fontWeight: string
  inline: boolean
  color: string
  className: string
  target: string
  rel?: string
}> &
  IBox

const Link = ({
  children,
  href,
  passHref = false,
  underline,
  fontWeight = '400',
  inline = false,
  color = 'brand.accent-1',
  className,
  target,
  ...rest
}: Props) => (
  <Box
    className={className}
    borderBottomColor={color || 'brand.accent-1'}
    borderBottomStyle="solid"
    borderBottomWidth={underline ? '1px' : 0}
    width="fit-content"
    css={{
      lineHeight: 1,
      cursor: 'pointer',
      '&:hover': { opacity: 0.7, borderBottomWidth: '1px' }
    }}
    display={inline ? 'inline-block' : 'block'}
    as="span"
    {...rest}
  >
    <L href={href}>
      <Text
        as="a"
        color={color}
        fontWeight={fontWeight}
        {...(target ? { target } : {})}
      >
        {children}
      </Text>
    </L>
  </Box>
)

export default Link
