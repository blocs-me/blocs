const habitTrackerQueryParams = {
  type: 'object',
  properties: {
    widgetToken: {
      type: 'string'
    },
    role: {
      type: 'string',
      enum: ['friend', 'blocs-user']
    },
    isoDateString: {
      type: 'string'
    }
  },
  required: ['widgetToken']
}
