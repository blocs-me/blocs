import {
  SET_STARTED_AT,
  SET_DOCUMENT_TIMELINE_START,
  SET_ENDED_AT,
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
    default:
      return state
  }
}

export default pomodoroReducer
