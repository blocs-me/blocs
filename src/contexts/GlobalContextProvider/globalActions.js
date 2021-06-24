export const SET_AUTH_VALID = "SET_AUTH_VALID"
export const SET_AUTH_STATE = "SET_AUTH_STATE"
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN"
export const SET_AVATAR_LINK = "SET_AVATAR_LINK"
export const SET_USER_LOGGING_OUT = "SET_USER_LOGGGING_OUT"

export const setAuthValid = (authValid) => ({
  type: SET_AUTH_VALID,
  authValid,
})

export const setAuthState = (authState) => ({
  type: SET_AUTH_STATE,
  authState,
})

export const setAccessToken = (accessToken) => ({
  type: SET_ACCESS_TOKEN,
  accessToken,
})

export const setAvatarLink = (avatarLink) => ({
  type: SET_AVATAR_LINK,
  avatarLink,
})

export const setUserLoggingOut = (loggingOut) => ({
  type: SET_USER_LOGGING_OUT,
  loggingOut,
})
