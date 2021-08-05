import {
  SET_STARTED_AT,
  SET_DOCUMENT_TIMELINE_START,
  SET_ENDED_AT,
  SET_SESSION_SETTINGS,
  SET_PREFERENCES,
  SET_SESSION_LABEL,
} from "./pomodoroActions"
import { initialState } from "./usePomodoroStore"

const pomodoroReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STARTED_AT:
      const { startedAt } = action
      return { ...state, session: { ...state.session, startedAt } }
    case SET_ENDED_AT:
      const { endedAt } = action
      return { ...state, session: { ...state.session, endedAt } }
    case SET_DOCUMENT_TIMELINE_START:
      const { documentTimelineStart } = action
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
        sessionSettings: { ...state.sessionSettings, ...label },
      }
    default:
      return state
  }
}

export default pomodoroReducer
