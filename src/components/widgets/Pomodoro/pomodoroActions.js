export const SET_STARTED_AT = "SET_STARTED_AT"
export const SET_ENDED_AT = "SET_ENDED_AT"
export const SET_DOCUMENT_TIMELINE_START = "SET_DOCUMENT_TIMELINE_START"
export const SET_SESSION_SETTINGS = "SET_SESSION_SETTINGS"
export const SET_PREFERENCES = "SET_PREFERENCES"
export const SET_SESSION_LABEL = "SET_SESSION_LAB"
export const SET_CURRENT_POMODORO_PRESET = "SET_CURRENT_POMODORO_PRESET"
export const SET_POMODORO_PRESET_MODE = "SET_POMODORO_PRESET_MODE"
export const SET_POMODORO_SESSION_COUNT = "SET_POMODORO_SESSION_COUNT"
export const RESET_POMODORO_SESSION = "RESET_POMODORO_SESSION"
export const SHOW_POMODORO_ACTIVE_SESSION_MENU =
  "SHOW_POMODORO_ACTIVE_SESSION_MENU"
export const SET_DOCUMENT_TIMELINE_OFFSET = "SET_DOCUMENT_TIMELINE_OFFSET"

export const setDocumentTimelineOffset = (documentTimelineOffset) => ({
  type: SET_DOCUMENT_TIMELINE_OFFSET,
  documentTimelineOffset,
})

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

export const setCurrentPomodoroPreset = (preset) => ({
  preset,
  type: SET_CURRENT_POMODORO_PRESET,
})

export const setPomodoroPresetMode = (presetMode) => ({
  presetMode,
  type: SET_POMODORO_PRESET_MODE,
})

export const setPomodoroSessionCount = (sessionCount) => ({
  sessionCount,
  type: SET_POMODORO_SESSION_COUNT,
})

export const resetPomodoroSession = () => ({
  type: RESET_POMODORO_SESSION,
})

export const showPomodoroActiveSessionMenu = (activeSessionMenu) => ({
  activeSessionMenu,
  type: SHOW_POMODORO_ACTIVE_SESSION_MENU,
})
