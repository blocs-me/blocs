import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { DEFAULT, ERROR, LOADING, SUCCESS } from "../constants/fetchStates"
import { setAuthValid } from "../contexts/GlobalContextProvider/globalActions"
import globalContext from "../contexts/GlobalContextProvider/globalContext"
import getAccessToken from "../utils/getAccessToken"
import { USER_PATH, VALIDATE_USER_AUTH_PATH } from "../utils/paths"
import useFetch from "./useFetch"

const useAuth = (options = {}) => {
  const router = useRouter()
  const [{ authValid, authState }, dispatch] = useContext(globalContext)
  const { access_token } = getAccessToken() || {}

  const { loading, error, fetcher } = useFetch(VALIDATE_USER_AUTH_PATH, {
    method: "POST",
    body: { access_token },
    shouldFetch: false,
    shouldCache: access_token && !authValid,
    onSuccess: (data) => {
      if (data?.authValid) {
        dispatch(setAuthValid(true))
      } else {
        dispatch(setAuthValid(false))
        // TO DO
        // promt user sign in
        console.log("prompt user sign in after validating")
      }
    },
    onError: () => {
      dispatch(setAuthValid(false))

      console.log("prompt user re-try")
    },
  })

  return {
    loading,
    error,
    fetcher,
  }
}

export default useAuth
