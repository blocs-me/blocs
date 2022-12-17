import storage from '@/utils/storage'
import { ToDate } from 'faunadb'
import {
  SET_STARTED_AT,
  SET_DOCUMENT_TIMELINE_START,
  SET_ENDED_AT,
  SET_SESSION_SETTINGS,
  SET_PREFERENCES,
  SET_SESSION_LABEL,
  SET_CURRENT_POMODORO_PRESET,
  SET_POMODORO_SESSION_COUNT,
  SET_POMODORO_PRESET_MODE,
  RESET_POMODORO_SESSION,
  SHOW_POMODORO_ACTIVE_SESSION_MENU,
  SET_DOCUMENT_TIMELINE_OFFSET,
  SET_PAUSED_AT
} from './pomodoroActions'
import { POMODORO_INTERVAL_MODE } from './pomodoroPresetModes'
import { initialState } from './usePomodoroStore'

const pomodoroReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STARTED_AT:
      const { startedAt } = action
      storage.setItem(SET_STARTED_AT, startedAt)
      return { ...state, session: { ...state.session, startedAt } }
    case SET_PAUSED_AT:
      const { pausedAt } = action
      storage.setItem(SET_PAUSED_AT, JSON.stringify(pausedAt))
      return {
        ...state,
        session: {
          ...state.session,
          pausedAt
        }
      }
    case SET_ENDED_AT:
      const { endedAt } = action
      return { ...state, session: { ...state.session, endedAt } }
    case SET_DOCUMENT_TIMELINE_START:
      const { documentTimelineStart } = action
      storage.setItem(SET_DOCUMENT_TIMELINE_START, documentTimelineStart)
      return { ...state, documentTimelineStart }
    case SET_SESSION_SETTINGS:
      const { sessionSettings } = action
      return { ...state, sessionSettings }
    case SET_PREFERENCES:
      const { preferences } = action
      return { ...state, preferences }
    case SET_SESSION_LABEL:
      const { label } = action
      return {
        ...state,
        sessionSettings: { ...state.sessionSettings, ...label }
      }
    case SET_CURRENT_POMODORO_PRESET:
      const { preset } = action
      storage.setItem(SET_CURRENT_POMODORO_PRESET, JSON.stringify(preset))
      return {
        ...state,
        currentPreset: preset
      }
    case SET_POMODORO_SESSION_COUNT:
      const { sessionCount } = action
      storage.setItem(SET_POMODORO_SESSION_COUNT, JSON.stringify(sessionCount))
      return {
        ...state,
        sessionCount
      }
    case SET_POMODORO_PRESET_MODE:
      const { presetMode } = action
      storage.setItem(SET_POMODORO_PRESET_MODE, presetMode)
      return {
        ...state,
        presetMode
      }
    case SHOW_POMODORO_ACTIVE_SESSION_MENU:
      const { activeSessionMenu } = action
      return {
        ...state,
        activeSessionMenu
      }
    case RESET_POMODORO_SESSION:
      storage.setItem(SET_POMODORO_SESSION_COUNT, JSON.stringify(0))
      return {
        ...state,
        sessionCount: 0,
        presetMode: POMODORO_INTERVAL_MODE
      }
    default:
      return state
  }
}

export default pomodoroReducer
