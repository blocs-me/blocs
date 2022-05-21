const createWidgetTokenSchema = {
  type: 'object',
  properties: {
    widgetType: {
      type: 'string',
      enum: ['POMODORO', 'water-tracker', 'streaks-calendar']
    },
    access_token: {
      type: 'string'
    }
  },
  required: ['widgetType']
}

export default createWidgetTokenSchema
