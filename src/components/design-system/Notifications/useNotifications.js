import makeStore from "src/lib/makeStore"

export const ERROR_NOTIF = "ERROR_NOTIF"
export const SUCCESS_NOTIF = "SUCCESS_NOTIF"
export const INFO_NOTIF = "INFO_NOTIF"
export const DELETE_NOTIF = "DELETE_NOTIF"

const initialState = []

const reducer = (state, action) => {
  switch (action.type) {
    case ERROR_NOTIF:
      return [
        ...state,
        { content: action.content, type: ERROR_NOTIF, id: action.id },
      ]
    case SUCCESS_NOTIF:
      return [
        ...state,
        { content: action.content, type: SUCCESS_NOTIF, id: action.id },
      ]
    case INFO_NOTIF:
      return [
        ...state,
        { content: action.content, type: INFO_NOTIF, id: action.id },
      ]
    case DELETE_NOTIF:
      const notifIndex = state.findIndex((notif) => notif.id === action.notifId)
      return [...state.slice(0, notifIndex), ...state.slice(notifIndex + 1)]
    default:
      return state
  }
}

const [Provider, useStore, useDispatch] = makeStore({
  initialState,
  reducer,
})

const useNotifications = () => {
  const notifs = useStore()
  const dispatch = useDispatch()

  const DELETE_NOTIF_AFTER = 3000 // ms

  const deleteNotifAction = (notifId) =>
    dispatch({
      notifId,
      type: DELETE_NOTIF,
    })

  const createNotifAction = (content, type) => {
    const id = Math.random()
    dispatch({
      id,
      content,
      type,
    })

    setTimeout(() => {
      deleteNotifAction(id)
    }, DELETE_NOTIF_AFTER)
  }

  const createError = (content) => createNotifAction(content, ERROR_NOTIF)
  const createSuccess = (content) => createNotifAction(content, SUCCESS_NOTIF)
  const createInfo = (content) => createNotifAction(content, INFO_NOTIF)

  return {
    NotifProvider: Provider,
    notifs,
    createError,
    createInfo,
    createSuccess,
    useNotifs: useStore,
  }
}

export const NotifProvider = Provider
export default useNotifications
