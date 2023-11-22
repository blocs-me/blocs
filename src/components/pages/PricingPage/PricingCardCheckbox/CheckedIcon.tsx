import styled from '@emotion/styled'
import themeGet from '@styled-system/theme-get'
import Flex from '@/helpers/Flex'
import { IBox } from '../../../helpers/Box/Box.types'
const Path = styled.path`
  stroke: ${themeGet('colors.brand.accent-1')};
`

const CheckIcon = (props: IBox) => (
  <Flex
    bg="brand.accent-5"
    borderRadius="3px"
    size="20px"
    minWidth="20px"
    p="5px"
    {...props}
  >
    <svg
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        as="path"
        d="M2 6.28571L7.81818 12L18 2"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="22.4263"
      />
    </svg>
  </Flex>
)

export default CheckIcon
