import { BlocsUserServer } from '@/gtypes/blocs-user'
import { IHabitTrackerAnalytics } from '@/gtypes/habit-tracker'
import { IPomodoroPreset } from '@/gtypes/pomodoro-preset'
import { IWidgetAccessToken } from '@/gtypes/widget-access-token'

export function mapUserToBlocUserServer(dbRow: any): BlocsUserServer {
  if (!dbRow) return null
  return {
    id: dbRow.id,
    name: dbRow.name,
    email: dbRow.email,
    avatar_url: dbRow.avatar_url,
    supabaseUserId: dbRow.supabase_user_id,
    purchaseHistory: dbRow.purchase_history,
    purchasedProducts: dbRow.purchased_products,
    stripeCustomerId: dbRow.stripe_customer_id,
    freeTrialStartedAt: dbRow.free_trial_started_at,
    isSubscribed: dbRow.is_subscribed
  }
}

export function mapBlocUserServerToUser(dbRow: BlocsUserServer): any {
  return {
    id: dbRow.id,
    name: dbRow.name,
    email: dbRow.email,
    avatar_url: dbRow.avatar_url,
    supabase_user_id: dbRow.supabaseUserId,
    purchase_history: dbRow.purchaseHistory,
    purchased_products: dbRow.purchasedProducts,
    stripe_customer_id: dbRow.stripeCustomerId,
    free_trial_started_at: dbRow.freeTrialStartedAt,
    is_subscribed: dbRow.isSubscribed
  }
}

export function mapWidgetAccessTokenToType(dbRow: any): IWidgetAccessToken {
  if (!dbRow) return null
  return {
    id: dbRow.id,
    oldId: dbRow.old_id,
    userId: dbRow.user_id,
    token: dbRow.token,
    shareableToken: dbRow.shareable_token,
    widgetType: dbRow.widget_type,
    currentStreak: dbRow.current_streak,
    currentStreakUpdatedAt: dbRow.current_streak_updated_at,
    bestStreak: dbRow.best_streak,
    bestStreakUpdatedAt: dbRow.best_streak_updated_at,
    habits: dbRow.habits,
    settings: dbRow.settings || {}
  }
}

export function mapPomodoroPresetToType(dbRow: any): IPomodoroPreset {
  if (!dbRow) return null
  return {
    id: dbRow.id,
    longBreakInterval: dbRow.long_break_interval,
    shortBreakInterval: dbRow.short_break_interval,
    pomodoroInterval: dbRow.pomodoro_interval,
    label: dbRow.label,
    labelColor: dbRow.label_color,
    defaultPreset: dbRow.default_preset,
    userId: dbRow.user_id
  }
}

export function mapTypeToPomodoroPreset(dbRow: IPomodoroPreset): any {
  if (!dbRow) return null
  return {
    id: dbRow.id,
    long_break_interval: dbRow.longBreakInterval,
    short_break_interval: dbRow.shortBreakInterval,
    pomodoro_interval: dbRow.pomodoroInterval,
    label: dbRow.label,
    label_color: dbRow.labelColor,
    default_preset: dbRow.defaultPreset,
    user_id: dbRow.userId,
    is_deleted: false
  }
}

export function mapHabitAnalyticsToType(dbRow: any): any {
  if (!dbRow) return null

  return {
    id: dbRow.id,
    oldId: dbRow.old_id,
    habitsDone: dbRow.habits_done,
    percentDone: dbRow.percent_done,
    isoDateString: dbRow.iso_date_string,
    widgetId: dbRow.widget_id,
    createdAt: dbRow.created_at
  }
}

export function mapPomodoroAnalyticsToType(dbRow: any): any {
  if (!dbRow) return null

  return {
    presetId: dbRow.preset_id,
    startedAt: dbRow.started_at,
    endedAt: dbRow.ended_at,
    timeSpent: dbRow.time_spent,
    isoDateString: dbRow.iso_date_string
  }
}
