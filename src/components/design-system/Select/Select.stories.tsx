import Select from './Select'
import { useState } from 'react'
import { ISelectOption } from './types'

export default {
  title: 'Design System/Select',
  component: Select
}

const options: ISelectOption[] = [
  {
    id: 1,
    label: 'option 1',
    value: 'option 1'
  },
  {
    id: 2,
    label: 'option 2',
    value: 'option 2'
  }
]

export const Default = () => {
  const [selected, setSelected] = useState(options[0])

  return (
    <Select options={options} selected={selected} setSelected={setSelected} />
  )
}
