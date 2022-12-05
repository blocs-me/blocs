import Ajv from 'ajv'

import pomodoroPresetSchema from './schemas/pomdoro/pomodoroPresetSchema'
import waterTrackerSettingsSchema from './schemas/water-tracker/waterTrackerSettingsSchema'
import createWidgetTokenSchema from './schemas/shared-widget-schemas/createWidgetTokenSchema'
import waterTrackerAnalyticsSchema from './schemas/water-tracker/waterTrackerAnalyticsSchema'
import waterTrackerQueryParamsSchema from './schemas/water-tracker/waterTrackerQueryParamsSchema'

const ajv = new Ajv()

export const validatePomodoroPreset = ajv.compile(pomodoroPresetSchema)
export const validateWidgetTokenReq = ajv.compile(createWidgetTokenSchema)
export const validateWaterTrackerSettings = ajv.compile(
  waterTrackerSettingsSchema
)
export const validateWaterTrackerAnalytics = ajv.compile(
  waterTrackerAnalyticsSchema
)
export const validateWaterTrackerQueryParams = ajv.compile(
  waterTrackerQueryParamsSchema
)
