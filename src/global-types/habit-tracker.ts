export type HabitItem = {
  id: string
  title: string
  createdAt?: string
}

export type IHabitTrackerAnalytics = {
  ref: any
  data: {}
}

export type IHabitTrackerWidget = {
  ref: any
  data: {
    widgetRef: any
    token: string
    userId: string
    type: 'HABIT_TRACKER'
    shareableToken: string
    currentStreak: number
    bestStreak: number
    habits: HabitItem[]
    bestStreakUpdatedAt: string
    currentStreakUpdatedAt: string
  }
}
