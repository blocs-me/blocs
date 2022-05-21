import notionOAuthData from './notionOAuthData'

const BASE_URL =
  process.env.NEXT_PUBLIC_ENV?.toLowerCase() === 'local'
    ? 'http://localhost:3000/api'
    : '/api'

const getPath = (path) => `${BASE_URL}${path}`

const { CLIENT_ID, REDIRECT_URL } = notionOAuthData

export const USER_PATH = getPath('/users')
export const VALIDATE_USER_AUTH_PATH = getPath('/auth/validate')
export const SETTINGS_PATH = getPath('/pomodoro/settings')
export const POMODORO_PRESETS_PATH = getPath('/pomodoro/presets')
export const TEMP_ACCESS_TOKEN_PATH = getPath('/widget/access-token')
export const WIDGET_LOGIN_PATH = getPath('/auth/widget')
export const WIDGET_LOGIN_VALIDATION_PATH = getPath('/auth/widget/validate')
export const NOTION_OAUTH_URL_REDIRECT_URL = `https://api.notion.com/v1/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&owner=user`
