export type BlocsUserClient = {
  data: {
    avatar_url: string
    email: string
    name?: string
    ownsPremium: boolean
    isSubscribed: boolean
  }
}

export type BlocsUserServer = {
  ref: any
  data: {
    name: string
    email: string
    avatar_url?: string
  }
}
