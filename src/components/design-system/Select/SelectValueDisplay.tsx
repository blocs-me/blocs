import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import Text from '@/design-system/Text'
import { MouseEvent } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { ISelectOption } from './types'

export type SelectValueDisplayProps = {
  toggleDropdown: () => void
  selected: ISelectOption
  isOpen: boolean
  fontSize?: string
}

const SelectValueDisplay = ({
  toggleDropdown,
  selected,
  isOpen
}: SelectValueDisplayProps) => {
  return (
    <Text as="div" fontSize="sm" textAlign="left" fontWeight={200}>
      <Flex
        alignItems="center"
        color="primary.accent-4"
        css={{ cursor: 'pointer' }}
        onClick={(e: MouseEvent<HTMLDivElement>) => {
          e.preventDefault()
          e.stopPropagation()
          toggleDropdown()
        }}
      >
        {selected.value || 'select an an option'}
        <Icon fill="primary.accent-4" width="22px" mb="-5px">
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </Icon>
      </Flex>
    </Text>
  )
}

export default SelectValueDisplay
