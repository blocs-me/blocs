import useUrlHash from '@/hooks/useUrlHash'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'

type HistoryDay = {
  date: string
  habitsDone: string[]
}

const useFetchHabitHistory = () => {
  const { token, role } = useUrlHash<any>()
  const shouldFetch = token && role

  const path = `/api/widget/habit-tracker/history?widgetToken=${token}&role=${role}&days=30`

  const { data, ...rest } = useSWR<{ data: HistoryDay[] }>(
    shouldFetch ? path : null,
    fetcher
  )

  return { history: data?.data || [], ...rest }
}

export default useFetchHabitHistory
