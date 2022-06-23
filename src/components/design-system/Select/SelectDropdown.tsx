import Box from '@/helpers/Box'
import Stack from '@/helpers/Stack'
import SelectOption from './SelectOption'
import { SelectProps } from './types'

const SelectDropdown = ({
  options,
  selected,
  handleSelect,
  className
}: SelectProps & { className?: string }) => {
  return (
    <Box
      position="absolute"
      bottom={0}
      left="50%"
      css={{
        fontWeight: 200,
        transform: 'translate(-50%, 100%)',
        textAlign: 'center'
      }}
      pt="xs"
      zIndex={2}
      width="100px"
      className={className}
    >
      <Box
        bg="bg.dark"
        boxShadow="default"
        borderRadius="md"
        p="sm"
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
  )
}

export default SelectDropdown
