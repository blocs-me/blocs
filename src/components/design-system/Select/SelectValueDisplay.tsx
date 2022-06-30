import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import Text from '@/design-system/Text'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { ISelectOption } from './types'

export type SelectValueDisplayProps = {
  isOpen: boolean
  selected: ISelectOption
  fontSize?: string
}

const SelectValueDisplay = ({
  selected,
  isOpen
}: SelectValueDisplayProps) => {
  return (
    <Text as="div" fontSize="sm" textAlign="left" fontWeight={200}>
      <Flex
        alignItems="center"
        color="primary.accent-4"
        css={{ cursor: 'pointer' }}
      >
        {selected.value || 'select an an option'}
        <Icon stroke="primary.accent-4" strokeWidth='3px' size="22px" mb="-5px">
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </Icon>
      </Flex>
    </Text>
  )
}

export default SelectValueDisplay
