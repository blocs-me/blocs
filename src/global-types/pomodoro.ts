export type IPomdoroWidget = {
  ref: any
  data: {
    token: string
    widgetType: string
    userId: string
    createdAt: string
  }
}

export type PomodoroAnalayticsBody = {
  presetId: string
  startedAt: string
  endedAt: string
  timeSpent: number
  isoDateString: string
}
