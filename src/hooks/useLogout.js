import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import {
  setAccessToken,
  setUserLoggingOut,
} from "../contexts/GlobalContextProvider/globalActions"
import globalContext from "../contexts/GlobalContextProvider/globalContext"

const useLogout = () => {
  const [, dispatch] = useContext(globalContext)
  const router = useRouter()
  const { pathname } = router

  const logout = () => {
    global.window?.localStorage.clear()
    dispatch(setUserLoggingOut(true))
    dispatch(setAccessToken(false))
    if (router.pathname.includes("dashboard")) router.push("/")
  }

  return logout
}

export default useLogout
