// json validator

const Ajv = require("ajv")
const {
  default: pomodoroPresetSchema
} = require("../schemas/pomdoro/pomodoroPresetSchema")

const ajv = new Ajv()

export const validatePomodoroPreset = ajv.compile(pomodoroPresetSchema)
