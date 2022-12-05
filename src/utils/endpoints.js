import { BASE_URL } from '@/constants/baseUrl'
import notionOAuthData from './notionOAuthData'

const BE_BASE_URL = `${BASE_URL || ''}/api`
const { CLIENT_ID, REDIRECT_URL } = notionOAuthData
export const getPath = (path = '') => `${BE_BASE_URL}${path}`

export const USER_PATH = getPath('/users')
export const VALIDATE_USER_AUTH_PATH = getPath('/auth/validate')
export const SETTINGS_PATH = getPath('/pomodoro/settings')
export const POMODORO_PRESETS_PATH = getPath('/pomodoro/presets')
export const TEMP_ACCESS_TOKEN_PATH = getPath('/widget/access-token')
export const WIDGET_LOGIN_PATH = getPath('/auth/widget')
export const WIDGET_LOGIN_VALIDATION_PATH = getPath('/auth/widget/validate')
export const NOTION_OAUTH_URL_REDIRECT_URL = `https://api.notion.com/v1/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&owner=user`
export const SHAREABLE_TOKEN_PATH = getPath('/widget/shareable-token')
export const WATER_TRACKER_SETTINGS_PATH = getPath(
  '/widget/water-tracker/settings'
)
export const WATER_TRACKER_ANALYTICS_PATH = getPath(
  '/widget/water-tracker/analytics'
)
