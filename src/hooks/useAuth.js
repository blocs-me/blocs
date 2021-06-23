import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { DEFAULT, ERROR, LOADING, SUCCESS } from "../constants/fetchStates"
import {
  setAccessToken,
  setAuthState,
  setAuthValid,
  setAvatarLink,
} from "../contexts/GlobalContextProvider/globalActions"
import globalContext from "../contexts/GlobalContextProvider/globalContext"
import getAccessToken from "../utils/getAccessToken"
import { USER_PATH, VALIDATE_USER_AUTH_PATH } from "../utils/paths"
import useFetch from "./useFetch"

const useAuth = (options = {}) => {
  const [{ authValid, authState }, dispatch] = useContext(globalContext)
  const { access_token, data: user } = getAccessToken() || {}

  const { loading, error, fetcher } = useFetch(VALIDATE_USER_AUTH_PATH, {
    method: "POST",
    body: { access_token },
    shouldFetch: access_token && !authValid,
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
    } else if (!access_token) {
      dispatch(setAuthState(ERROR))
    }
  }, [loading, dispatch, access_token, authValid])

  return {
    loading,
    error,
    fetcher,
  }
}

export default useAuth
