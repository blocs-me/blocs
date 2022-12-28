import { IBox } from '@/helpers/Box/Box.types'
import Flex from '@/helpers/Flex'
import { ReactNode } from 'react'

const BorderedBox = ({
  children,
  ...rest
}: { children?: ReactNode } & IBox) => {
  return (
    <Flex
      width="100%"
      maxWidth="200px"
      minWidth="150px"
      borderRadius="5px"
      border="solid 1px"
      borderColor="primary.accent-3"
      css={{ textAlign: 'center' }}
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      {children}
    </Flex>
  )
}

export default BorderedBox
