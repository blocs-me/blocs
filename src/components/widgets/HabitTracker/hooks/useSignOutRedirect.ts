import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const useSignOutRedirect = () => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/')
      }
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [supabaseClient, router])
}

export default useSignOutRedirect
