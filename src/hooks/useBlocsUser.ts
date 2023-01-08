import { USER_PATH } from '@/utils/endpoints'
import { useUser } from '@supabase/auth-helpers-react'
import fetchWithToken from 'src/services/fetchWithToken'
import useSWR from 'swr'

type BlocsUser = {
  data: {
    avatar_url: string
    email: string
    name?: string
    ownsPremium: boolean
    isSubscribed: boolean
  }
}

const useBlocsUser = () => {
  const supabaseUser = useUser()
  const { data: user, ...rest } = useSWR<BlocsUser>(
    supabaseUser ? [USER_PATH] : null,
    fetchWithToken
  )

  return {
    user,
    ...rest
  }
}

export default useBlocsUser
