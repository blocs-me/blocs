import widgetTypes from 'src/constants/widgetTypes'

const createWidgetTokenSchema = {
  type: 'object',
  properties: {
    widgetType: {
      type: 'string',
      enum: Object.values(widgetTypes)
    },
    access_token: {
      type: 'string'
    }
  },
  additionalProperties: {
    role: {
      type: 'string',
      enum: ['friend', 'blocs-user']
    }
  },
  required: ['widgetType', 'access_token']
}

export default createWidgetTokenSchema
