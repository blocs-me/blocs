import { ReactNode } from 'react'
import makeStore, { Action } from '@/utils/makeStore'

export const ERROR_NOTIF = 'ERROR_NOTIF'
export const SUCCESS_NOTIF = 'SUCCESS_NOTIF'
export const INFO_NOTIF = 'INFO_NOTIF'
export const DELETE_NOTIF = 'DELETE_NOTIF'

type NotifAction = {
  notifId?: string | number
  type: 'ERROR_NOTIF' | 'SUCCESS_NOTIF' | 'INFO_NOTIF' | 'DELETE_NOTIF'
  content?: string
  id?: string | number
}

const initialState: NotifAction[] = []

const reducer = (state: typeof initialState, action: NotifAction) => {
  switch (action.type) {
    case ERROR_NOTIF:
      return [
        ...state,
        { content: action.content, type: ERROR_NOTIF, id: action.id }
      ]
    case SUCCESS_NOTIF:
      return [
        ...state,
        { content: action.content, type: SUCCESS_NOTIF, id: action.id }
      ]
    case INFO_NOTIF:
      return [
        ...state,
        { content: action.content, type: INFO_NOTIF, id: action.id }
      ]
    case DELETE_NOTIF:
      const notifIndex = state.findIndex((notif) => notif.id === action.notifId)
      return [...state.slice(0, notifIndex), ...state.slice(notifIndex + 1)]
    default:
      return state
  }
}

const [Provider, useStore, useDispatch] = makeStore<NotifAction[], NotifAction>(
  {
    initialState,
    reducer
  }
)

const useNotifications = () => {
  const notifs = useStore()
  const dispatch = useDispatch()

  const DELETE_NOTIF_AFTER = 3000 // ms

  const deleteNotifAction = (notifId) =>
    dispatch({
      notifId,
      type: DELETE_NOTIF
    })

  const createNotifAction = (content, type, timeout = DELETE_NOTIF_AFTER) => {
    const id = Math.random()
    dispatch({
      id,
      content,
      type
    })

    setTimeout(() => {
      deleteNotifAction(id)
    }, timeout)
  }

  const createError = (content, timeout = DELETE_NOTIF_AFTER) =>
    createNotifAction(content, ERROR_NOTIF, timeout)
  const createSuccess = (content, timeout = DELETE_NOTIF_AFTER) =>
    createNotifAction(content, SUCCESS_NOTIF, timeout)
  const createInfo = (content, timeout = DELETE_NOTIF_AFTER) =>
    createNotifAction(content, INFO_NOTIF, timeout)

  const NotifProvider = Provider as ({
    children
  }: {
    children?: ReactNode
  }) => JSX.Element

  return {
    NotifProvider,
    notifs,
    createError,
    createInfo,
    createSuccess,
    useNotifs: useStore
  }
}

export default useNotifications
