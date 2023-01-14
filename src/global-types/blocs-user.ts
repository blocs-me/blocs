export type BlocsUserClient = {
  data: {
    avatar_url: string
    email: string
    name?: string
    ownsPremium: boolean
    isSubscribed: boolean
    isDeleted?: boolean
  }
}

export type BlocsUserServer = {
  ref: any
  data: {
    name: string
    email: string
    avatar_url?: string
    supabaseUserId?: string
  }
}
