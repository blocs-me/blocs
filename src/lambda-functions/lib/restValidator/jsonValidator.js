import Ajv from 'ajv'

import pomodoroPresetSchema from './schemas/pomdoro/pomodoroPresetSchema'
import waterTrackerSettingsSchema from './schemas/water-tracker/waterTrackerSettingsSchema'
import createWidgetTokenSchema from './schemas/shared-widget-schemas/createWidgetTokenSchema'

const ajv = new Ajv()

export const validatePomodoroPreset = ajv.compile(pomodoroPresetSchema)
export const validateWidgetTokenReq = ajv.compile(createWidgetTokenSchema)
export const validateWaterTrackerSettings = ajv.compile(
  waterTrackerSettingsSchema
)
