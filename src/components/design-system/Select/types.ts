import { Dispatch, SetStateAction } from 'react'

export type ISelectOption = {
  label: string
  value: any
  id: number | string
}

export type SelectProps = {
  isOpen?: boolean
  selected?: ISelectOption
  setSelected?: Dispatch<SetStateAction<ISelectOption>>
  setIsOpen?: Dispatch<SetStateAction<boolean>>
  options?: ISelectOption[]
  handleSelect?: (ISelectOption) => void
  toggleDropdown?: (boolean) => void
}
