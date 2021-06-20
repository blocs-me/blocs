import { useRouter } from "next/router"
import { useContext, useReducer } from "react"
import { DEFAULT } from "../constants/fetchStates"
import {
  setAccessToken,
  setAuthState,
  setAuthValid,
} from "../contexts/GlobalContextProvider/globalActions"
import globalContext from "../contexts/GlobalContextProvider/globalContext"

// when useAuth use access_token to validate
// and right after user logs out
// and right before if redirects
// access_token is undefined, so user prompt is set

// if we use a loggin flag, then when a user comes back to the page
// it won't validate

// so what's the solution here

const useLogout = () => {
  const [, dispatch] = useContext(globalContext)
  const router = useRouter()

  const logout = () => {
    global.window?.localStorage.clear()
    dispatch(setAuthValid(false))
    dispatch(setAuthState(DEFAULT))
    dispatch(setAccessToken(null))
    if (router.pathname.includes("dashboard")) router.push("/")
  }

  return logout
}

export default useLogout
