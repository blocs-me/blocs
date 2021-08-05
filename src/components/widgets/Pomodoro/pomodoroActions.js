export const SET_STARTED_AT = "SET_STARTED_AT"
export const SET_ENDED_AT = "SET_ENDED_AT"
export const SET_DOCUMENT_TIMELINE_START = "SET_DOCUMENT_TIMELINE_START"
export const SET_SESSION_SETTINGS = "SET_SESSION_SETTINGS"
export const SET_PREFERENCES = "SET_PREFERENCES"
export const SET_SESSION_LABEL = "SET_SESSION_LABEL"

export const setStartedAt = (startedAt) => ({
  startedAt,
  type: SET_STARTED_AT,
})

export const setDocumentTimelineStart = (documentTimelineStart) => ({
  type: SET_DOCUMENT_TIMELINE_START,
  documentTimelineStart,
})

export const setEndedAt = (endedAt) => ({
  type: SET_ENDED_AT,
  endedAt,
})

export const setPomodoroSessionSettings = (sessionSettings) => ({
  type: SET_SESSION_SETTINGS,
  sessionSettings,
})

export const setPomodoroPreferences = (preferences) => ({
  type: SET_PREFERENCES,
  preferences,
})

export const setPomodoroSessionLabel = (label) => ({
  type: SET_SESSION_LABEL,
  label,
})
