import { useContext, useEffect } from "react"
import { DEFAULT, ERROR, LOADING, SUCCESS } from "@/constants/fetchStates"
import {
  setAccessToken,
  setAuthState,
  setAuthValid,
  setAvatarLink,
  setUserLoggingOut,
} from "../contexts/GlobalContextProvider/globalActions"
import globalContext from "@/contexts/GlobalContextProvider/globalContext"
import getAccessToken from "@/utils/getAccessToken"
import { VALIDATE_USER_AUTH_PATH } from "@/utils/endpoints"
import useFetch from "./useFetch"

const useAuth = (options = {}) => {
  const [{ authValid, authState, loggingOut }, dispatch] =
    useContext(globalContext)
  const { access_token, data: user } = getAccessToken() || {}

  const { loading, error, fetcher } = useFetch(VALIDATE_USER_AUTH_PATH, {
    method: "POST",
    body: { access_token },
    shouldFetch: access_token && !authValid && !loggingOut,
    shouldCache: false,
    onSuccess: (data) => {
      if (data?.authValid) {
        dispatch(setAuthValid(true))
        dispatch(setAuthState(SUCCESS))
        dispatch(setAccessToken(access_token))
        dispatch(setAvatarLink(user?.avatar_url))
      } else {
        dispatch(setAuthValid(false))
        dispatch(setAuthState(ERROR))
      }
    },
    onError: () => {
      dispatch(setAuthValid(false))
      dispatch(setAuthState(ERROR))
    },
  })

  useEffect(() => {
    if (loading && access_token && !authValid) {
      dispatch(setAuthState(LOADING))
    } else if (authState === LOADING) {
      dispatch(setAuthState(DEFAULT))
    } else if (!access_token && !loggingOut) {
      dispatch(setAuthState(ERROR))
      dispatch(setAuthValid(false))
    }

    return () => {
      if (loggingOut) {
        dispatch(setUserLoggingOut(false))
      }
    }
  }, [loading, access_token, authValid, loggingOut, authState, dispatch])

  return {
    loading,
    error,
    fetcher,
  }
}

export default useAuth
