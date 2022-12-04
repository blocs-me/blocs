const waterTrackerQueryParamsSchema = {
  type: 'object',
  properties: {
    date: {
      type: 'string'
    },
    widgetToken: {
      type: 'string'
    },
    isoDateString: {
      type: 'string'
    },
    role: {
      type: 'string',
      enum: ['friend', 'blocs-user']
    }
  },
  required: ['role', 'widgetToken']
}

export default waterTrackerQueryParamsSchema
