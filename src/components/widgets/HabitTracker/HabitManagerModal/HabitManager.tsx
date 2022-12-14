import { useState } from 'react'
import Flex from '@/helpers/Flex'
import { useFetchHabits } from '../hooks/useFetchHabits'
import ScrollProvider from '@/design-system/ScrollProvider'
import Button from '@/design-system/Button'
import Box from '@/helpers/Box'
import FadeProvider from '@/design-system/FadeProvider'
import HabitRow from './HabitRow'
import { HabitFormModal } from './HabitFormModal'
import { HabitItem } from '../../../../global-types/habit-tracker'

const HabitManager = () => {
  const { data: habits } = useFetchHabits()
  const [showFormModal, setShowFormModal] = useState<
    | {
        habit?: HabitItem
        mode: 'edit' | 'create' | 'delete'
      }
    | false
  >(false)

  return (
    <Flex
      flexDirection="column"
      justfyContent="flex-start"
      alignItems="start"
      p="sm"
      minWidth="250px"
      minHeight="300px"
      maxWidth="350px"
    >
      <Box position="relative" width="100%">
        <Button
          p="xs"
          width="100%"
          borderRadius="sm"
          bg="success.medium"
          color="neutral.white"
          fontWeight={200}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setShowFormModal({
              mode: 'create'
            })
          }}
        >
          Create New Habit
        </Button>

        <Box height="20px" />
        <ScrollProvider maxHeight="250px" height="100%" pr="sm" width="100%">
          {habits?.data?.map((habit) => (
            <HabitRow
              key={habit.id}
              title={habit.title}
              id={habit.id}
              setAction={setShowFormModal}
            />
          ))}
        <Box height="100px" />
        </ScrollProvider>
        <FadeProvider position="bottom" css={{ zIndex: 20 }} />
      </Box>
      <HabitFormModal
        isOpen={!!showFormModal}
        closeModal={() => setShowFormModal(false)}
        {...showFormModal}
      />
      <Box id="habit-manager-modal" />
    </Flex>
  )
}

export default HabitManager
