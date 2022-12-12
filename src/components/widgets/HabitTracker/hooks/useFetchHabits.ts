import { HABITS_PATH } from '@/utils/endpoints'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'

export const useFetchHabits = () => {
  const { token, role } = useUrlHash<any>()

  const path = `${HABITS_PATH}?widgetToken=${token}&role=${role}`

  const response = useSWR(token && role ? path : null, fetcher)
  return response
}
