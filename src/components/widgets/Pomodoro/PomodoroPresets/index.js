import { useEffect, useState } from "react"
import Flex from "@/helpers/Flex"
import MenuHeader from "../Typography/MenuHeader"
import Clock from "../../../../icons/clock.svg"
import ScrollProvider from "@/design-system/ScrollProvider"
import useSWR, { mutate } from "swr"
import { POMODORO_PRESETS_PATH } from "@/utils/endpoints"
import fetcher from "@/utils/fetcher"
import Stack from "@/helpers/Stack"
import Skeleton from "@/helpers/Skeleton"
import Box from "@/helpers/Box"
import PresetItem from "./PresetItem"
import { usePomodoroDispatch, usePomodoroStore } from "../usePomodoroStore"
import Text from "@/design-system/Text"
import Icon from "@/helpers/Icon"
import Plus from "../../../../icons/plus.svg"
import Button from "@/design-system/Button"
import PresetForm from "./PresetForm"
import useNotifications from "@/design-system/Notifications/useNotifications"
import DeletePresetModal from "./DeletePresetModal"
import { AnimatePresence, AnimateSharedLayout } from "framer-motion"
import { setCurrentPomodoroPreset } from "../pomodoroActions"

const PomodoroLabels = () => {
  const { data: presets, error } = useSWR(POMODORO_PRESETS_PATH, fetcher, {
    revalidateOnFocus: false,
  })
  const { currentPreset } = usePomodoroStore()
  const [showForm, setShowForm] = useState(false)
  const [formAction, setFormAction] = useState(null)
  const [formId, setFormId] = useState(0)
  const deletePossible = presets?.data?.length > 1
  const notifs = useNotifications()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const dispatch = usePomodoroDispatch()

  const initCreateForm = () => {
    setFormId(formId + 1)
    setFormAction("CREATE")
  }
  const initEditForm = () => {
    setFormId(formId + 1)
    setFormAction("EDIT")
    setShowForm(true)
  }
  const initDeleteForm = () => {
    if (!deletePossible) {
      return notifs.createError(
        `Cannot delete "${currentPreset?.label}". You must have at least one pomodoro session`
      )
    }

    setFormAction("DELETE")
    setShowDeleteModal(true)
  }

  const handleCreateNewSession = (e) => {
    initCreateForm()
    setShowForm(true)
    e.stopPropagation()
  }

  const hideForm = () => setShowForm(false)
  const hideDeleteModal = () => setShowDeleteModal(false)

  useEffect(() => {
    presets && mutate(POMODORO_PRESETS_PATH)
  }, [presets])

  useEffect(() => {
    const currentPresetExists = presets?.data?.find(
      (preset) => preset?.id === currentPreset?.id
    )

    if (!currentPresetExists && !showDeleteModal) {
      const newPreset = presets?.data?.find(
        (preset) => preset?.id !== currentPreset?.id
      )
      dispatch(setCurrentPomodoroPreset(newPreset))
    }
  }, [currentPreset?.id, dispatch, presets?.data, showDeleteModal])

  if (!presets) {
    return (
      <Flex
        flexDirection="column"
        width="100%"
        height="100%"
        position="relative"
      >
        <MenuHeader icon={<Clock />} title="pomodoro" />

        <ScrollProvider height="100%">
          <Box px="sm" height="100%">
            <Stack mt="sm">
              {Array(6)
                .fill("")
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    width="100%"
                    height="40px"
                    borderRadius="md"
                  />
                ))}
            </Stack>
          </Box>
        </ScrollProvider>
      </Flex>
    )
  }

  // preset form needs to reset every time it opens

  const defaultPresets = [
    {
      id: "0",
      longBreakInterval: 600000,
      shortBreakInterval: 300000,
      pomodoroInterval: 1500000,
      label: "work",
      labelColor: "#00d1e0",
    },
  ]

  return (
    <>
      <DeletePresetModal
        open={showDeleteModal}
        hideModal={hideDeleteModal}
        presets={presets}
        formAction={formAction}
        key={`delete-${currentPreset?.id}}`}
      />

      <PresetForm
        key={`preset-${formAction}-${currentPreset?.id || ""}-${formId}`}
        open={showForm}
        formAction={formAction}
        hideForm={hideForm}
        presets={presets}
      />

      <Flex
        flexDirection="column"
        width="100%"
        height="100%"
        position="relative"
      >
        <MenuHeader icon={<Clock />} title="pomodoro" />
        <ScrollProvider px="sm" height="100%">
          <Stack mt="sm" flex="1">
            <Button
              onClick={(e) => handleCreateNewSession(e)}
              as="button"
              alignItems="center"
              borderRadius="md"
              height="62px"
              bg="primary.accent-1"
              width="calc(100% - 40px)"
              p="xs"
              css={{ display: "flex", alignItems: "center" }}
              variant="lightBg"
            >
              <Flex bg="primary.accent-4" borderRadius="sm" p="xxs" mr="xs">
                <Icon stroke="bg.default" width="20px" m="auto" display="flex">
                  <Plus />
                </Icon>
              </Flex>
              <Text fontSize="xs" fontWeight="400" m={0}>
                new session
              </Text>
            </Button>

            {(presets?.data?.length === 0
              ? defaultPresets
              : presets?.data
            )?.map((preset) => (
              <PresetItem
                showForm={showForm}
                initEditForm={initEditForm}
                initDeleteForm={initDeleteForm}
                preset={preset}
                key={preset.id}
                selected={currentPreset?.id === preset?.id}
              />
            ))}
          </Stack>
          <Box height="50px" />
        </ScrollProvider>
      </Flex>
    </>
  )
}

export default PomodoroLabels
