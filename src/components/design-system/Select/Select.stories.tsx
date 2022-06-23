import { useEffect } from 'react'
import Select, { useSelect } from '.'
import { ISelectOption } from './types'
import SelectDropdown from './SelectDropdown'

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
  // const [selected, setSelected] = useState(options[0])

  const [selected, selectProps] = useSelect(options[0], options)

  useEffect(() => {
    ;(() => {})()
    // some action on select
  }, [selected])

  return (
    <Select {...selectProps}>
      <SelectDropdown {...selectProps} />
    </Select>
  )
}
