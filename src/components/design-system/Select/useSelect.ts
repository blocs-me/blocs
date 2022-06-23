import { useState } from 'react'
import { ISelectOption, SelectProps } from './types'

export const useSelect = (
  defaultValue: ISelectOption,
  options: ISelectOption[]
) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<ISelectOption>(defaultValue)

  const handleSelect = (option: ISelectOption) => {
    setSelected(option)
    setIsOpen(false)
  }

  const toggleDropdown = () => setIsOpen(!open)

  const selectProps: SelectProps = {
    handleSelect,
    isOpen,
    setIsOpen,
    toggleDropdown,
    selected,
    setSelected,
    options
  }

  return [selected, selectProps] as [
    selected: ISelectOption,
    props: SelectProps
  ]
}
