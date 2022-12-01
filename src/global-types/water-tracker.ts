export type IWaterTrackerWidget = {
  userId: string
  token: string
  shareableToken?: string
  settings: {
    goal: number
    units: 'liter' | 'ounce'
  }
  type: string
}
