const waterTrackerSettingsSchema = {
  type: 'object',
  properties: {
    goal: {
      type: 'number'
    },
    units: {
      type: 'string'
    }
  }
}

export default waterTrackerSettingsSchema
