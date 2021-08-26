import {
  WIDGET_LOGIN_PATH,
  WIDGET_LOGIN_VALIDATION_PATH,
} from "@/utils/endpoints"
import storage from "@/utils/storage"
import { useRouter } from "next/router"
import { useEffect, useLayoutEffect, useState } from "react"
import useDidMount from "./useDidMount"
import useFetch from "./useFetch"
import useFetchCache from "./useFetchCache"

const { default: makeStore } = require("src/lib/makeStore")

const initalState = {
  isLoggedIn: false, // after logging in / validation
  isLoggingIn: true, // first time load with params, we can show the skeleton / during validation
}

export const SET_IS_LOGGING_IN = "SET_IS_LOGGING_IN"
export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN"
export const SET_TOKEN = "SET_TOKEN"
export const SET_USER = "SET_USER"

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
    case SET_TOKEN:
      const { token } = action
      return {
        ...state,
        token,
      }
    case SET_USER:
      const { user } = action
      return {
        ...state,
        user,
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

  const setToken = (token) =>
    dispatch({
      token,
      type: SET_TOKEN,
    })

  const setUser = (user) =>
    dispatch({
      user,
      type: SET_USER,
    })

  const { isLoggedIn } = useWidgetAuthStore() || initalState

  const { error: validationError, data: validated } = useFetch(
    WIDGET_LOGIN_VALIDATION_PATH,
    {
      method: "POST",
      shouldCache: false,
      shouldFetch: !!token && !isLoggedIn,
      headers: {
        credentials: "same-origin",
        Authorization: `Bearer ${token}`,
      },
      onSuccess: (res) => {
        // if (res.token && user) {
        //   storage.setItem(
        //     WIDGET_LOGIN_PATH,
        //     JSON.stringify({
        //       token: res.token,
        //       data: user,
        //     })
        //   )
        // }
        setUser(res?.data?.user)
        setToken(token)
        setIsLoggedIn(true)
        setIsLoggingIn(false)
      },
      onError: (e) => {
        setIsLoggingIn(false)
        onError(e)
      },
    }
  )

  // useEffect(() => {
  //   if (accessToken) {
  //     setToken(accessToken)
  //   }
  // }, [accessToken]) // eslint-disable-line

  return {
    ...store,
    // user: user?.data,
  }
}

export default useWidgetAuth
