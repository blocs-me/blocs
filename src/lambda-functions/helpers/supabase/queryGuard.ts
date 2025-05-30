import {
  PostgrestResponse,
  PostgrestSingleResponse
} from '@supabase/supabase-js'

export const supabaseQueryGuard = async <T>(
  fn: () => PromiseLike<PostgrestSingleResponse<T> | null>,
  noLog?: boolean
) => {
  try {
    const { data, error } = await fn()
    if (error && !noLog) {
      console.error(error)
      return null
    }
    return data
  } catch (err) {
    if (!noLog) {
      console.error(err)
    }
    return null
  }
}
