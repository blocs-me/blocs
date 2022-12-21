import Ajv from 'ajv'

import pomodoroPresetSchema from './schemas/pomdoro/pomodoroPresetSchema'
import waterTrackerSettingsSchema from './schemas/water-tracker/waterTrackerSettingsSchema'
import createWidgetTokenSchema from './schemas/shared-widget-schemas/createWidgetTokenSchema'
import waterTrackerAnalyticsSchema from './schemas/water-tracker/waterTrackerAnalyticsSchema'
import waterTrackerQueryParamsSchema from './schemas/water-tracker/waterTrackerQueryParamsSchema'
import saveHabitTrackerAnalyticsSchema from './schemas/habit-tracker/saveHabitTrackerAnalyticsSchema'
import habitTrackerQueryParams from './schemas/habit-tracker/habitTrackerQueryParams'
import habitSchema from './schemas/habit-tracker/habitSchema'
import pomodoroAnalyticsSchema from './schemas/pomdoro/pomodoroAnalyticsSchema'
import waterTrackerAnalyticsByRangeSchema from './schemas/water-tracker/waterTrackerAnalyticsByRangeSchema'

const ajv = new Ajv()

export const validatePomodoroPreset = ajv.compile(pomodoroPresetSchema)
export const validatePomodoroAnalytics = ajv.compile(pomodoroAnalyticsSchema)
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
export const validateHabitTrackerQueryParams = ajv.compile(
  habitTrackerQueryParams
)
export const validateHabitTrackerAnalytics = ajv.compile(
  saveHabitTrackerAnalyticsSchema
)
export const validateHabitSchema = ajv.compile(habitSchema)
export const validateWaterAnalyticsByRange = ajv.compile(
  waterTrackerAnalyticsByRangeSchema
)
