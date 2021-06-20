import { useReducer } from "react"
import GlobalContext from "./globalContext"
import {
  SET_ACCESS_TOKEN,
  SET_AUTH_STATE,
  SET_AUTH_VALID,
} from "./globalActions"
import { DEFAULT } from "../../constants/fetchStates"

const initalState = {
  authValid: false,
  accessToken: null,
  authState: DEFAULT,
}

const reducer = (state, action) => {
  const { authValid, accessToken, authState } = action

  switch (action.type) {
    case SET_AUTH_VALID:
      return { ...state, authValid }
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken }
    case SET_AUTH_STATE:
      return { ...state, authState }
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

export default GlobalProvider
