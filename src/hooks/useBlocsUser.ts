import { USER_PATH } from '@/utils/endpoints'
import { useUser } from '@supabase/auth-helpers-react'
import fetchWithToken from 'src/services/fetchWithToken'
import useSWR from 'swr'
import { BlocsUserClient } from '../global-types/blocs-user'

const useBlocsUser = () => {
  const supabaseUser = useUser()
  const { data: user, ...rest } = useSWR<BlocsUserClient>(
    supabaseUser?.aud === 'authenticated' ? [USER_PATH] : null,
    fetchWithToken
  )

  return {
    user,
    ...rest
  }
}

export default useBlocsUser
