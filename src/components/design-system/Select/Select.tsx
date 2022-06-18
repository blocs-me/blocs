import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import Stack from '@/helpers/Stack'
import Flex from '../../helpers/Flex'
import Icon from '../../helpers/Icon'
import { Dispatch, SetStateAction, useState, useRef } from 'react'
import Box from '../../helpers/Box'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { ISelectOption } from './types'
import SelectOption from './SelectOption'

type SelectProps = {
  options: ISelectOption[]
  selected: ISelectOption
  setSelected: Dispatch<SetStateAction<ISelectOption>>
}

const Select = ({ options, selected, setSelected }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => setIsOpen(!isOpen)
  const container = useRef()

  const handleSelect = (option) => {
    setSelected(option)
    setIsOpen(false)
  }

  useClickOutside({
    element: container,
    onClickOutside: () => setIsOpen(false)
  })

  return (
    <Flex
      ref={container}
      role="select"
      flexDirection="column"
      position="relative"
      width="fit-content"
      css={{ userSelect: 'none' }}
    >
      <Flex
        alignItems="center"
        color="primary.accent-4"
        css={{ textAlign: 'left', cursor: 'pointer', fontWeight: 400 }}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleDropdown()
        }}
      >
        {selected.value || 'select an an option'}
        <Icon fill="primary.accent-4" width="30px">
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </Icon>
      </Flex>

      {isOpen && (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          css={{
            textAlign: 'center',
            fontWeight: 200,
            transform: 'translateY(100%)'
          }}
          pt="xs"
          zIndex={2}
        >
          <Box
            bg="bg.default"
            boxShadow="default"
            borderRadius="md"
            p="xs"
            width="fit-content"
            color="primary.accent-4"
          >
            <Stack pt="xs">
              {options.map((optionData) => (
                <SelectOption
                  isSelected={selected.id === optionData.id}
                  setSelected={handleSelect}
                  key={optionData.id}
                  {...optionData}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      )}
    </Flex>
  )
}

export default Select
