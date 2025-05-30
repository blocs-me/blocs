export type IWaterTrackerWidget = {
  user_id: string
  token: string
  shareable_token?: string
  settings: {
    goal: number
    units: 'liter' | 'ounce'
  }
  type: string
}
