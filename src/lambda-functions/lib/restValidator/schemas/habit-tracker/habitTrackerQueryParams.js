const habitTrackerQueryParams = {
  type: 'object',
  properties: {
    widgetToken: {
      type: 'string'
    },
    role: {
      enum: ['friend', 'blocs-user']
    },
    isoDateString: {
      type: 'string'
    }
  },
  required: ['widgetToken', 'role'],
  additionalProperties: false
}
