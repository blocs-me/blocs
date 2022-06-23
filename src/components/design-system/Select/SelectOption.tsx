import { Dispatch, SetStateAction } from 'react'
import themeGet from '@styled-system/theme-get'
import styled from '@emotion/styled'
import { ISelectOption } from './types'

const Option = styled.div<{ isSelected: boolean }>`
  font-size: ${themeGet('fontSizes.xs')};
  cursor: pointer;
  transition: 0.2s ease color;
  color: ${({ isSelected }) =>
    isSelected
      ? themeGet('colors.highlight')
      : themeGet('colors.primary.accent-3')};

  &:hover {
    color: ${themeGet('colors.highlight')};
  }
`

export type SelectOptionProps = ISelectOption & {
  setSelected: Dispatch<SetStateAction<ISelectOption>>
  isSelected: boolean
}

const SelectOption = (props: SelectOptionProps) => {
  const { setSelected, label, isSelected } = props
  return (
    <Option isSelected={isSelected} onClick={() => setSelected(props)}>
      {label}
    </Option>
  )
}

export default SelectOption
