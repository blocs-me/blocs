import widgetTypes from 'src/constants/widgetTypes'

const createWidgetTokenSchema = {
  type: 'object',
  properties: {
    widgetType: {
      type: 'string',
      enum: Object.values(widgetTypes)
    }
  },
  required: ['widgetType'],
  additionalProperties: false
}

export default createWidgetTokenSchema
