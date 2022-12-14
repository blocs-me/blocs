import WidgetModal from '../../WidgetModal/WidgetModal'
import HabitManager from './HabitManager'

const HabitManagerModal = ({ isOpen = false, handleClose = () => {} }) => {
  return (
    <WidgetModal
      open={isOpen}
      closeModal={handleClose}
      appendTo="#ht-modal-wrapper"
    >
      <HabitManager />
    </WidgetModal>
  )
}

export default HabitManagerModal
