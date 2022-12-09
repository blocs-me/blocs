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
  required: ['habit']
}

export default saveHabitTrackerAnalyticsSchema
