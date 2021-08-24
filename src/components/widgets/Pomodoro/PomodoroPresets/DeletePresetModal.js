import Flex from "@/helpers/Flex"
import Icon from "@/helpers/Icon"
import Skeleton from "@/helpers/Skeleton"
import Stack from "@/helpers/Stack"
import { useEffect } from "react/cjs/react.development"

const { default: Button } = require("@/design-system/Button")
const { default: Text } = require("@/design-system/Text")
const { default: WidgetModal } = require("@/widgets/WidgetModal/index.js")
const { usePomodoroStore, usePomodoroDispatch } = require("../usePomodoroStore")
const { default: usePresetApi } = require("./usePresetApi")
import Check from "../../../../icons/check-circle.svg"

const DeletePresetModal = ({ formAction, open, hideModal, presets }) => {
  const { currentPreset } = usePomodoroStore()
  const dispatch = usePomodoroDispatch()
  const {
    deletePreset,
    error,
    loading,
    data: apiResponse,
  } = usePresetApi(currentPreset, presets)

  const isDelete = formAction === "DELETE"

  const handleDelete = (e) => {
    e.stopPropagation()
    isDelete && deletePreset()
  }

  const handleClose = (e) => {
    e?.stopPropagation()
    hideModal()
  }

  return (
    <WidgetModal
      open={open}
      hideModal={handleClose}
      framerKey={`delete-preset`}
    >
      <Flex flexDirection="column" size="100%" center alignItems="center">
        {apiResponse && (
          <>
            <Icon size="40px" stroke="success" mb="sm">
              <Check />
            </Icon>
            <Text
              textAlign="center"
              fontSize="sm"
              lineHeight={1.5}
              mb="xxs"
              fontWeight="400"
              color="primary.accent-3"
            >
              Awesome, <b>{`"${apiResponse?.label}"`}</b> was successfully
              deleted
            </Text>
            <Button
              mt="sm"
              variant="default"
              bg="success"
              borderRadius="50px"
              color="primary.accent-1"
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
              variant="default"
              bg="danger"
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
              color="primary.accent-2"
              fontWeight={300}
              lineHeight={1.5}
              textAlign="center"
              mb="md"
            >
              are you sure you want to delete{" "}
              <Text as="b" variant="b">{`"${currentPreset?.label}"`}</Text>
            </Text>

            <Button
              variant="default"
              bg="danger"
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
    </WidgetModal>
  )
}

export default DeletePresetModal
