import { useRouter } from "next/router"
import { useContext, useEffect, useMemo, useState } from "react"
import { ERROR, LOADING, SUCCESS } from "../constants/fetchStates"
import {
  setAccessToken,
  setAuthState,
  setAuthValid,
  setAvatarLink,
} from "../contexts/GlobalContextProvider/globalActions"
import globalContext from "../contexts/GlobalContextProvider/globalContext"
import { USER_PATH } from "../utils/paths"
import useAuth from "./useAuth"
import useFetch from "./useFetch"
import useLogout from "./useLogout"

const useUser = (options = {}) => {
  const router = useRouter()
  const { shouldFetch = true } = options
  const { code, error: notionError, state } = router.query
  const preregisteredForPremium = state === "pre-register-for-premium"
  const body = useMemo(
    () => ({ code, preregisteredForPremium }),
    [code, preregisteredForPremium]
  )
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
    shouldFetch: !!code && !notionError && shouldFetch,
    onSuccess: (res = {}) => {
      dispatch(setAuthValid(true))
      dispatch(setAuthState(SUCCESS))
      dispatch(setAccessToken(res.access_token))
      dispatch(setAvatarLink(res.data?.avatar_url))
      router.push("/dashboard")
    },
    onError: () => {
      console.log("handling err")
      dispatch(setAuthState(ERROR))
      router.push("/dashboard")
    },
  })

  useEffect(() => {
    if (loading) dispatch(setAuthState(LOADING))
    if (!loading && !data) {
      dispatch(setAuthState(ERROR))
    }

    return () => {
      dispatch(setLoggingOut(false))
    }
  }, [loading, dispatch, data])

  useEffect(() => {
    if (notionError && authState !== ERROR) {
      dispatch(setAuthState(ERROR))
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
