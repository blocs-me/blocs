const pomodoroAnalyticsByRangeSchema = {
  type: 'object',
  properties: {
    widgetToken: {
      type: 'string'
    },
    from: {
      type: 'string'
    },
    to: {
      type: 'string'
    },
    role: {
      enum: ['friend', 'blocs-user']
    }
  },
  required: ['widgetToken', 'from', 'to'],
  additionalProperties: false
}

export default pomodoroAnalyticsByRangeSchema
