import Flex from '@/helpers/Flex'
import useWaterTrackerSettings from './hooks/useWaterTrackerSettings'
import NumberInput from '@/design-system/NumberInput'
import usePatchWaterTrackerSettings from './hooks/usePatchSettings'
import { useForm } from 'react-hook-form'
import Button from '@/design-system/Button'
import WidgetModal from '../WidgetModal/WidgetModal'

const UpdateGoalForm = () => {
  const { data: settings } = useWaterTrackerSettings()
  const { patchGoal, loadingGoal } = usePatchWaterTrackerSettings()
  const units = settings?.data?.units
  const goal = settings?.data?.goal
  const max = units === 'liter' ? 10 : 350
  const min = units === 'liter' ? 1 : 34

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      goal
    },
    reValidateMode: 'onChange'
  })

  const onSubmit = handleSubmit((formData) => {
    patchGoal(formData.goal)
  })

  return (
    <Flex
      flexDirection="column"
      p="md"
      width="100%"
      justfyContent="center"
      alignItems="center"
      as="form"
      onSubmit={(e) => onSubmit(e)}
    >
      <NumberInput
        type="number"
        ariaLabel="Set Daily Goal"
        label="Goal"
        {...register('goal', {
          required: true,
          valueAsNumber: true,
          min: min,
          max: max
        })}
        min={min}
        max={max}
        error={errors.goal ? 'Goal must be between {min} & {max}' : false}
      />
      <Button
        mt="sm"
        px="sm"
        py="xs"
        width="100%"
        fontSize="sm"
        borderRadius="md"
        type="submit"
        color="neutral.white"
        bg="success.medium"
        fontWeight={200}
        disabled={loadingGoal}
      >
        Update
      </Button>
    </Flex>
  )
}

const UpdateGoalModal = ({ open, closeModal }) => {
  return (
    <WidgetModal
      open={open}
      closeModal={closeModal}
      appendTo="#wt-widget-wrapper"
    >
      <UpdateGoalForm />
    </WidgetModal>
  )
}

export default UpdateGoalModal
