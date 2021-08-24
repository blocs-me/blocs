import {
  WIDGET_LOGIN_PATH,
  WIDGET_LOGIN_VALIDATION_PATH,
} from "@/utils/endpoints"
import storage from "@/utils/storage"
import { useRouter } from "next/router"
import { useEffect, useLayoutEffect } from "react"
import useDidMount from "./useDidMount"
import useFetch from "./useFetch"

const { default: makeStore } = require("src/lib/makeStore")

const initalState = {
  isLoggedIn: false, // after logging in / validation
  isLoggingIn: true, // first time load with params, we can show the skeleton / during validation
}

export const SET_IS_LOGGING_IN = "SET_IS_LOGGING_IN"
export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN"

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      const { isLoggedIn } = action
      return {
        ...state,
        isLoggedIn,
      }
    case SET_IS_LOGGING_IN:
      const { isLoggingIn } = action
      return {
        ...state,
        isLoggingIn,
      }
    default:
      return state
  }
}

const [WidgetAuthProvider, useWidgetAuthStore, useWidgetAuthDispatch] =
  makeStore({
    initalState,
    reducer,
  })

export { WidgetAuthProvider, useWidgetAuthStore, useWidgetAuthDispatch }

const useWidgetAuth = ({ onError = () => {} }) => {
  const dispatch = useWidgetAuthDispatch()
  const store = useWidgetAuthStore() || initalState
  const router = useRouter()
  const { token } = router.query

  const setIsLoggedIn = (isLoggedIn) =>
    dispatch({
      isLoggedIn,
      type: SET_IS_LOGGED_IN,
    })

  const setIsLoggingIn = (isLoggingIn) =>
    dispatch({
      isLoggingIn,
      type: SET_IS_LOGGING_IN,
    })

  const hasPrevLoggedIn = Boolean(storage.getItem("hasPrevLoggedIn"))

  const { error: loginError, data: user } = useFetch(WIDGET_LOGIN_PATH, {
    method: "POST",
    shouldFetch: !!token && !hasPrevLoggedIn,
    body: {
      token,
    },
    onSuccess: () => {
      storage.setItem("hasPrevLoggedIn", true)
      setIsLoggedIn(true)
      setIsLoggingIn(false)
    },
    onError: (error) => {
      setIsLoggingIn(false)
      onError(error)
    },
  })

  const { error: validationError, data: validated } = useFetch(
    WIDGET_LOGIN_VALIDATION_PATH,
    {
      method: "POST",
      shouldCache: false,
      shouldFetch: !!hasPrevLoggedIn && !store?.isLoggedIn,
      headers: {
        credentials: "same-origin",
      },
      onSuccess: () => {
        setIsLoggedIn(true)
        setIsLoggingIn(false)
      },
      onError: (e) => {
        setIsLoggingIn(false)
        onError(e)
      },
    }
  )

  return {
    ...store,
    user: user?.data,
  }
}

export default useWidgetAuth
