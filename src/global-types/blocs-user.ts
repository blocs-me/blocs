// Client user type is different so we acn
export type BlocsUserClient = {
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

export type BlocsUserServer = {
  id: string
  name: string
  email: string
  avatar_url?: string
  supabaseUserId?: string
  purchaseHistory: string[]
  purchasedProducts?: string[]
  stripeCustomerId?: string
  freeTrialStartedAt?: string
  isSubscribed: boolean
}
