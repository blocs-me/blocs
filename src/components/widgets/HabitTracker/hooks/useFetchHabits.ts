import { HABITS_PATH } from '@/utils/endpoints'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'

export type Habits = {
  id: string
  title: string
}[]

export const useFetchHabits = (shouldFetch = true) => {
  const { token, role } = useUrlHash<any>()

  const path = `${HABITS_PATH}?widgetToken=${token}&role=${role}`

  const response = useSWR<{ status?: number; data: Habits }>(
    token && role && shouldFetch ? path : null,
    fetcher
  )
  return response
}
