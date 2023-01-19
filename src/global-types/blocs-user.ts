// Client user type is different so we acn
export type BlocsUserClient = {
  data: {
    avatar_url: string
    email: string
    name?: string
    isSubscribed: boolean
    isDeleted?: boolean
    scheduledForDeletion: boolean
    stripeCustomerId: string
    purchasedProducts: string[]
    freeTrialStartedAt?: string
  }
}

export type BlocsUserServer = {
  ref: any
  data: {
    name: string
    email: string
    avatar_url?: string
    supabaseUserId?: string
    scheduledForDeletion: boolean
    isDeleted?: boolean
    purchaseHistory: string[]
    stripeCustomerId?: string
    freeTrialStartedAt?: string
  }
}
