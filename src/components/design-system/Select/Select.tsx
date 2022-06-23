import { Dispatch, SetStateAction, useState, useRef, ReactNode } from 'react'
import Flex from '@/helpers/Flex'
import { useClickOutside } from '@/hooks/useClickOutside'
import { ISelectOption, SelectProps } from './types'
import SelectValueDisplay from './SelectValueDisplay'
import SelectDropdown from './SelectDropdown'

const Select = ({
  children,
  isOpen,
  setIsOpen,
  selected,
  className
}: SelectProps & { children: ReactNode; className?: string }) => {
  const container = useRef()

  useClickOutside({
    element: container,
    onClickOutside: () => setIsOpen(false)
  })

  const toggleDropdown = () => setIsOpen(!isOpen)

  return (
    <Flex
      ref={container}
      role="select"
      flexDirection="column"
      position="relative"
      width="fit-content"
      css={{ userSelect: 'none' }}
      className={className}
    >
      <SelectValueDisplay
        isOpen={isOpen}
        toggleDropdown={toggleDropdown}
        selected={selected}
      />
      {isOpen && children}
    </Flex>
  )
}

Select.Dropdown = SelectDropdown

export default Select
