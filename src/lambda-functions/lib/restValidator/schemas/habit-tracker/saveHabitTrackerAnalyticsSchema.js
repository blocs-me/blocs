const saveHabitTrackerAnalyticsSchema = {
  type: 'object',
  properties: {
    isoDateString: {
      type: 'string'
    },
    habitIds: {
      type: 'array',
      items: { type: 'string' }
    }
  },
  required: ['habitIds', 'isoDateString'],
  additionalProperties: false
}

export default saveHabitTrackerAnalyticsSchema
