import Button from '@/design-system/Button'
import Modal from '@/design-system/Modal'
import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import Grid from '@/helpers/Grid'
import Skeleton from '@/helpers/Skeleton'
import { POMODORO_PRESETS_PATH } from '@/utils/endpoints'
import PresetItem from '@/widgets/Pomodoro/PomodoroPresets/PresetItem'
import { useState } from 'react'
import fetchWithToken from 'src/services/fetchWithToken'
import useSWR from 'swr'

import PresetForm from './PresetForm'
import DeletePresetModal from './DeletePresetForm'

const CreatePresetModal = ({ isOpen, hideModal, presets }) => {
  return (
    <Modal visible={isOpen} hideModal={hideModal}>
      <PresetForm
        open={isOpen}
        formAction="CREATE"
        presets={presets}
        hideForm={hideModal}
      />
    </Modal>
  )
}

const PresetsSection = ({ token }) => {
  const { data: presets } = useSWR(
    token ? [POMODORO_PRESETS_PATH, token] : null,
    fetchWithToken,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true
    }
  )

  const [showPresetForm, setshowPresetForm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [formAction, setFormAction] = useState('CREATE')
  const [currentPresetId, setCurrentPresetId] = useState('')

  const initEditForm = (presetId) => {
    setFormAction('EDIT')
    setCurrentPresetId(presetId)
    setshowPresetForm(true)
  }

  const initCreateForm = () => {
    setFormAction('CREATE')
    setshowPresetForm(true)
  }

  const initDeletePreset = (id) => {
    setShowDeleteModal(true)
    setCurrentPresetId(id)
  }

  return (
    <Flex
      p={['sm', , , , 'md']}
      width="100%"
      m="0 auto"
      borderTop="solid 1px"
      borderColor="primary.accent-2"
      gap="md"
      flexDirection={['column', , , , , 'row']}
      alignItems={['center', , , , , 'start']}
    >
      <Flex
        flexDirection="column"
        alignItems={['center', , , , , 'start']}
        width={['100%', , , , '400px']}
      >
        <Button
          px="sm"
          py="xs"
          mb="sm"
          width="100%"
          boxShadow="default"
          borderRadius={'sm'}
          fontWeight={200}
          color="foreground"
          hoverColor="primary.accent-4"
          border="solid 1px"
          borderColor="foreground"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            initCreateForm()
          }}
        >
          Create Preset
        </Button>
        <Text variant="pSmall" width="100%">
          Create Pomodoro presets to track how you spend time on different
          tasks.
          <br />
          <br />
          Once created, you can select them inside the pomodoro widget and we’ll
          log how much time is spent on each preset.
          <br />
          <br />
          The analytics widget will show real time updates on your daily
          progress.
        </Text>
      </Flex>
      <Grid
        gridTemplateColumns="repeat(auto-fit, 180px)"
        gridAutoRows="110px"
        css={{ gap: '1rem' }}
        flexWrap="wrap"
        width="min(100%, 500px)"
        justifyContent="center"
        height={['auto', , , , , '500px']}
        mb={['md', , , , , '0']}
        overflow="auto"
      >
        {!presets &&
          Array(5)
            .fill('')
            .map((_, id) => (
              <Skeleton key={id} borderRadius="md" width="100%" height="100%" />
            ))}
        {presets?.data?.map((d) => (
          <PresetItem
            selected={true}
            key={d.id}
            preset={d}
            initDeleteForm={() => initDeletePreset(d.id)}
            initEditForm={() => initEditForm(d.id)}
          />
        ))}
      </Grid>
      <Modal
        visible={showPresetForm}
        hideModal={() => setshowPresetForm(false)}
      >
        <PresetForm
          formAction={formAction}
          open={showPresetForm}
          presets={presets?.data}
          hideForm={() => setshowPresetForm(false)}
        />
      </Modal>

      <DeletePresetModal
        open={showDeleteModal}
        presets={presets?.data}
        currentPreset={presets?.data?.find(
          (preset) => preset?.id === currentPresetId
        )}
        hideModal={() => setShowDeleteModal(false)}
      />
    </Flex>
  )
}

export default PresetsSection
