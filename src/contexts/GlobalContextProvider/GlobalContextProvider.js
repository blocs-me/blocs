import { useReducer } from 'react'
import GlobalContext from './globalContext'
import {
  SET_ACCESS_TOKEN,
  SET_AUTH_STATE,
  SET_AUTH_VALID,
  SET_AVATAR_LINK,
  SET_USER_LOGGING_OUT
} from './globalActions'
import { DEFAULT } from '../../constants/fetchStates'

const initalState = {
  authValid: false,
  accessToken: null,
  authState: DEFAULT,
  avatarLink: '',
  loggingOut: false
}

const reducer = (state = initalState, action = {}) => {
  const { authValid, accessToken, authState, avatarLink, loggingOut } = action

  switch (action.type) {
    case SET_AUTH_VALID:
      return { ...state, authValid }
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken }
    case SET_AUTH_STATE:
      return { ...state, authState }
    case SET_AVATAR_LINK:
      return { ...state, avatarLink }
    case SET_USER_LOGGING_OUT:
      return { ...state, loggingOut }
    default:
      return state
  }
}

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState)

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  )
}

GlobalContext.displayName = 'GlobalContextProvider'

export default GlobalProvider
