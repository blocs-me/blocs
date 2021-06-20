import { useRouter } from "next/router"
import { useContext, useEffect, useMemo, useState } from "react"
import { ERROR, LOADING, SUCCESS } from "../constants/fetchStates"
import {
  setAccessToken,
  setAuthState,
  setAuthValid,
} from "../contexts/GlobalContextProvider/globalActions"
import globalContext from "../contexts/GlobalContextProvider/globalContext"
import { USER_PATH } from "../utils/paths"
import useAuth from "./useAuth"
import useFetch from "./useFetch"
import useLogout from "./useLogout"

const useUser = () => {
  const router = useRouter()
  const { code, error: notionError } = router.query
  const body = useMemo(() => ({ code }), [code])
  const [{ authState }, dispatch] = useContext(globalContext)
  const [loggingOut, setLoggingOut] = useState(false)
  const logout = useLogout()

  const handleLogout = () => {
    setLoggingOut(true)
    logout()
  }

  const { data, loading, error } = useFetch(USER_PATH, {
    method: "POST",
    body,
    shouldFetch: !!code && !notionError,
    onSuccess: () => {
      dispatch(setAuthValid(true))
      dispatch(setAuthState(SUCCESS))
      router.push("/dashboard")
    },
    onError: () => {
      dispatch(setAuthState(ERROR))
      router.push("/dashboard")
    },
  })

  useEffect(() => {
    if (loading) dispatch(setAuthState(LOADING))
    if (!loading && !data && !loggingOut) {
      dispatch(setAuthState(ERROR))
    }
  }, [loading, dispatch, loggingOut, data])

  useEffect(() => {
    if (notionError && authState !== ERROR) {
      setAuthState(ERROR)
      router.push("/dashboard")
    }
  }, [notionError, authState, router])

  return {
    user: data || {},
    loading,
    error,
    logout: handleLogout,
  }
}

export default useUser
