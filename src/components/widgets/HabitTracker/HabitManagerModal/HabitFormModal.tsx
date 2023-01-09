import Button from '@/design-system/Button'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import WidgetModal from '@/widgets/WidgetModal/WidgetModal'
import TextInput from '@/design-system/TextInput'
import { useForm, useFormState } from 'react-hook-form'
import useNotifications from '../../../design-system/Notifications/useNotifications'
import { postReq, patchReq, deleteReq } from '../../../../utils/fetchingUtils'
import { HABITS_PATH } from '@/utils/endpoints'
import useUrlHash from '@/hooks/useUrlHash'
import Text from '@/design-system/Text'
import { useState } from 'react'
import { useFetchHabits } from '../hooks/useFetchHabits'
import { getCurrentISOString } from '@/utils/dateUtils/getCurrentISOString'

type Props = {
  isOpen: boolean
  closeModal: () => void
  habit?: { id: string; title: string }
  mode?: 'edit' | 'create' | 'delete'
}

const modeText = {
  edit: 'Edit Habit',
  delete: 'Delete Habit',
  create: 'Save New Habit'
}

const Form = ({
  mode,
  habit,
  closeModal
}: Pick<Props, 'habit' | 'mode' | 'closeModal'>) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      habit: mode === 'edit' ? habit.title : ''
    }
  })

  const notifs = useNotifications()
  const [disableBtn, setDisableBtn] = useState(false)
  const { mutate, data: habits } = useFetchHabits()

  const { token } = useUrlHash<{ token: string }>()
  const onSubmit = handleSubmit((formData) => {
    const path = `${HABITS_PATH}?widgetToken=${token}&isoDateString=${getCurrentISOString()}`
    const body = {
      title: formData.habit,
      ...(['edit', 'delete'].includes(mode) ? { id: habit.id } : {})
    }
    setDisableBtn(true)

    if (mode === 'create') {
      return mutate(
        postReq(path, {
          body
        }),
        {
          revalidate: true
        }
      )
        .then((res) => {
          if (res?.status >= 400) {
            notifs.createError(
              "Uh oh ! we weren't able to create your new habit "
            )
            setDisableBtn(false)
            return null
          }

          notifs.createSuccess('Successfully created a new habit!')
          reset()
          setDisableBtn(false)
        })
        .catch((err) => {
          console.error(err)
          notifs.createError(
            "Uh oh ! we weren't able to create your new habit "
          )
          setDisableBtn(false)
        })
    }

    if (mode === 'edit') {
      return mutate(
        patchReq(path, {
          body: {
            id: habit.id,
            title: formData.habit
          }
        }),
        {
          revalidate: true,
          rollbackOnError: true,
          optimisticData(currentData) {
            return {
              data: [
                ...currentData.data.filter((d) => d.id === habit.id),
                {
                  id: habit.id,
                  title: formData.habit
                }
              ]
            }
          }
        }
      )
        .then(() => {
          notifs.createSuccess('Successfully edited your habit!')
          setDisableBtn(false)
        })
        .catch((err) => {
          setDisableBtn(false)
          console.error(err)
          notifs.createError(
            "Uh oh ! we weren't able to edit your habit, try again"
          )
        })
    }

    if (mode === 'delete') {
      return mutate(
        deleteReq(path, {
          body: {
            id: habit.id
          }
        }),
        {
          revalidate: true
        }
      )
        .then(() => {
          closeModal()
          notifs.createSuccess('Successfully deleted your habit!')
        })
        .catch((err) => {
          console.error(err)
          notifs.createError(
            "Uh oh ! we weren't able to delete your habit, try again"
          )
        })
    }
  })

  return (
    <Flex
      flexDirection="column"
      as="form"
      onSubmit={(e) => onSubmit(e)}
      alignItems="center"
      justifyContent="center"
      width="100%"
      p="md"
    >
      {mode !== 'delete' && (
        <TextInput
          htmlFor="habit"
          name="habit"
          ariaLabel={'Habit Title'}
          label={'Habit Title'}
          {...register('habit', {
            required: true
          })}
          error={errors.habit ? 'Please enter a habit title' : ''}
        />
      )}
      {mode === 'delete' && (
        <Text
          fontSize="xs"
          color="foreground"
          letterSpacing="sm"
          textAlign="center"
          lineHeight={2}
        >
          Are you sure you want to delete your habit : <br />
          <Box as="span" p="5px" borderRadius="5px" bg="primary.accent-2">
            &quot;
            {habit.title}&quot;
          </Box>
        </Text>
      )}
      <Button
        mt="sm"
        px="sm"
        py="xs"
        width="100%"
        type="submit"
        variant={mode === 'delete' ? 'danger' : 'success'}
        disabled={disableBtn}
        loading={disableBtn}
      >
        {modeText[mode]}
      </Button>
    </Flex>
  )
}

export const HabitFormModal = ({ isOpen, closeModal, habit, mode }: Props) => {
  return (
    <WidgetModal
      closeModal={closeModal}
      appendTo="#habit-manager-modal"
      open={isOpen}
    >
      <Form habit={habit} mode={mode} closeModal={closeModal} />
    </WidgetModal>
  )
}
