import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import styled from '@emotion/styled'
import themeGet from '@styled-system/theme-get'
import { ReactNode } from 'react'
import Cross from '../../../icons/cross.svg'

const Path = styled.path`
  stroke: ${themeGet('colors.brand.accent-1')};
`

const Check = () => (
  <Flex bg="brand.accent-5" borderRadius="3px" size="20px" minWidth="20px">
    <svg
      viewBox="0 0 20 14"
      width="10px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={{ margin: 'auto' }}
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

const Crossed = () => {
  return (
    <Flex bg="primary.accent-1" borderRadius="3px" size="20px" minWidth="20px">
      <Icon fill="primary.accent-3" width="15px" m="auto" display="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Outline"
          viewBox="0 0 24 24"
        >
          <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
        </svg>
      </Icon>
    </Flex>
  )
}

const PricingCardCheckbox = ({
  text,
  isChecked = true
}: {
  text: string
  isChecked?: boolean
}) => {
  return (
    <Flex data-type="checkbox" alignItems="center">
      {isChecked ? <Check /> : <Crossed />}
      <Text ml="xs" variant="pSmall" as="span">
        {text}
      </Text>
    </Flex>
  )
}

export default PricingCardCheckbox
