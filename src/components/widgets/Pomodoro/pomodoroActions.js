export const SET_STARTED_AT = "SET_STARTED_AT"
export const SET_ENDED_AT = "SET_ENDED_AT"
export const SET_DOCUMENT_TIMELINE_START = "SET_DOCUMENT_TIMELINE_START"

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
