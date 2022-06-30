import { useState, useRef, ReactNode, MouseEvent } from 'react'
import Flex from '@/helpers/Flex'
import { useClickOutside } from '@/hooks/useClickOutside'
import { SelectProps } from './types'
import SelectValueDisplay from './SelectValueDisplay'
import SelectDropdown from './SelectDropdown'

const Select = ({
  children,
  selected,
  className
}: SelectProps & { children: ReactNode; className?: string }) => {
  const container = useRef()
  const [isOpen, setIsOpen] = useState(false)

  useClickOutside({
    element: container,
    onClickOutside: () => setIsOpen(false)
  })

  const toggleDropdown = () => setIsOpen(!isOpen)
  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleDropdown()
  }

  return (
    <Flex
      ref={container}
      role="select"
      flexDirection="column"
      position="relative"
      width="fit-content"
      css={{ userSelect: 'none' }}
      className={className}
      onClick={(e: MouseEvent) => handleClick(e)}
    >
      <SelectValueDisplay
        selected={selected}
        isOpen={isOpen}
      />
      {isOpen && children}
    </Flex>
  )
}

Select.Dropdown = SelectDropdown

export default Select
