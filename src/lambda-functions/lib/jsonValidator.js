import Ajv from "ajv"

import createWidgetTokenSchema from "../schemas/shared-widget-schemas/createWidgetTokenSchema"
import pomodoroPresetSchema from "../schemas/pomdoro/pomodoroPresetSchema"

const ajv = new Ajv()

export const validatePomodoroPreset = ajv.compile(pomodoroPresetSchema)
export const validateWidgetTokenReq = ajv.compile(createWidgetTokenSchema)
