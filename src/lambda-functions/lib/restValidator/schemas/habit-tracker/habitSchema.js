const habitSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    id: {
      type: 'string'
    }
  },
  additionalProperties: false
}

export default habitSchema
