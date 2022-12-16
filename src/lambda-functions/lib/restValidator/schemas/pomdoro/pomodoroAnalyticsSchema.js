const pomodoroAnalyticsSchema = {
  type: 'object',
  properties: {
    presetId: { type: 'string' },
    isoDateString: { type: 'string' },
    startedAt: { type: 'number' },
    endedAt: { type: 'number' },
    timeSpent: { type: 'number' }
  },
  additionalProperties: false
}

export default pomodoroAnalyticsSchema
