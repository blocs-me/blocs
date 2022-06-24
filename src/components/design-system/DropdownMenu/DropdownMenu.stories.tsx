import Dropdown from '.'

export default {
  title: 'Design System/Dropdown Menu',
  component: Dropdown
}

export const Default = () => {
  return (
    <Dropdown open={true}>
      <div>item 1</div>
      <div>item 2</div>
      <div>item 3</div>
    </Dropdown>
  )
}
