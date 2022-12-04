const waterTrackerAnalyticsSchema = {
  type: 'object',
  properties: {
    date: {
      type: 'integer'
    },
    isoDateString: {
      type: 'string'
    },
    waterConsumed: {
      type: 'number',
      minimum: 0,
      maximum: 11,
      anyOf: [
        {
          type: 'integer'
        }
      ]
    }
  },
  required: ['date', 'isoDateString', 'waterConsumed'],
  additionalProperties: false
}

export default waterTrackerAnalyticsSchema
