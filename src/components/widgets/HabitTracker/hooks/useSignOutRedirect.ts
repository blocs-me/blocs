import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const useSignOutRedirect = () => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    const { data } = supabaseClient.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.push('/')
      }
    })
    return () => {
      data.subscription.unsubscribe()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabaseClient])
}

export default useSignOutRedirect
