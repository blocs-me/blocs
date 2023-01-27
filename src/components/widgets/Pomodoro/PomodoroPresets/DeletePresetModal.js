import Button from '@/design-system/Button'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import Skeleton from '@/helpers/Skeleton'
import Stack from '@/helpers/Stack'
import { useEffect, useState } from 'react'

const { default: Text } = require('@/design-system/Text')
const { default: WidgetModal } = require('@/widgets/WidgetModal')
const { usePomodoroStore, usePomodoroDispatch } = require('../usePomodoroStore')
const { default: usePresetApi } = require('./usePresetApi')
import Check from '../../../../icons/check-circle.svg'

const ModalContent = ({ formAction, hideModal, presets, currentPreset }) => {
  const { deletePreset } = usePresetApi(currentPreset, presets)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)

  const isDelete = formAction === 'DELETE'

  const handleDelete = (e) => {
    e.stopPropagation()
    setLoading(true)

    if (isDelete) {
      deletePreset()
        .then((d) => {
          setApiResponse(d?.data)
        })
        .catch((err) => {
          console.error(err)
          setError(true)
        })
        .finally(() => setLoading(false))
    }
  }

  const handleClose = (e) => {
    e?.stopPropagation()
    hideModal()
  }

  useEffect(() => {
    setLoading(false)
    setApiResponse(null)
  }, [])

  return (
    <Flex flexDirection="column" size="100%" center alignItems="center" p="sm">
      {apiResponse && (
        <>
          <Icon size="40px" stroke="success.medium" mb="sm">
            <Check />
          </Icon>
          <Text
            textAlign="center"
            fontSize="sm"
            lineHeight={1.5}
            mb="xxs"
            fontWeight="400"
            color="foreground"
          >
            Awesome, <b>{`"${apiResponse?.label}"`}</b> was successfully deleted
          </Text>
          <Button
            mt="sm"
            variant="outlined"
            borderRadius="50px"
            color="foreground"
            onClick={(e) => handleClose(e)}
          >
            close
          </Button>
        </>
      )}
      {error && !loading && !apiResponse && (
        <Flex
          flex="1"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontSize="sm"
            lineHeight={1}
            mb="xxs"
            fontWeight="400"
            color="primary.accent-3"
          >
            Uh oh ! 😞
          </Text>
          <Text
            fontSize="xs"
            fontWeight="300"
            color="primary.accent-2"
            lineHeight={1.25}
            textAlign="center"
            mb="sm"
          >
            Looks like something went wrong. Try again :
          </Text>
          <Button
            bg="danger.medium"
            borderRadius="50px"
            onClick={(e) => handleDelete(e)}
            width="150px"
          >
            delete
          </Button>
          <Text
            fontSize="xxs"
            color="secondary"
            textAlign="center"
            mt="1.5rem"
            mb="-1.5rem"
          >
            If this error persists, contact us at moniet@blocs.me
          </Text>
        </Flex>
      )}
      {loading && (
        <Stack mt="xs">
          <Skeleton width="100%" height="10px" borderRadius="lg" />
          <Skeleton width="100%" height="10px" borderRadius="lg" />
          <Skeleton width="100%" height="10px" borderRadius="lg" />
          <Skeleton width="100%" height="10px" borderRadius="lg" />
          <Skeleton width="100%" height="10px" borderRadius="lg" />
          <Skeleton width="100%" height="10px" borderRadius="lg" />
          <Skeleton width="150px" height="30px" borderRadius="50px" mt="sm" />
          <Skeleton width="150px" height="30px" borderRadius="50px" />
        </Stack>
      )}
      {!loading && !error && !apiResponse && (
        <>
          <Text
            fontSize="sm"
            color="foreground"
            fontWeight={300}
            lineHeight={1.5}
            textAlign="center"
            mb="md"
          >
            are you sure you want to delete{' '}
            <Text as="b" variant="b">{`"${currentPreset?.label}"`}</Text>
          </Text>

          <Button
            bg="danger.medium"
            p="xs"
            color="neutral.white"
            fontWeight="200"
            borderRadius="50px"
            onClick={(e) => handleDelete(e)}
            width="150px"
          >
            delete
          </Button>
          <Button
            mt="sm"
            width="150px"
            variant="outlined"
            borderColor="primary.accent-4"
            borderRadius="50px"
            onClick={(e) => hideModal(e)}
          >
            cancel
          </Button>
        </>
      )}
    </Flex>
  )
}

const DeletePresetModal = (props) => {
  return (
    <WidgetModal
      open={props.open}
      closeModal={props.handleClose}
      appendTo="#pomo-modal-wrapper"
    >
      <ModalContent {...props} />
    </WidgetModal>
  )
}

export default DeletePresetModal
