export type IWidgetAccessToken = {
  id: string
  oldId: string
  userId: string
  token: string
  shareableToken?: string
  widgetType: string
  currentStreak?: number
  currentStreakUpdatedAt?: string
  bestStreak?: number
  bestStreakUpdatedAt?: string
  habits: string[]
  settings: { goal: number } | {}
}
