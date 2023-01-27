import useUrlHash from '@/hooks/useUrlHash'
import { HABITS_ANALYTICS_PATH } from '@/utils/endpoints'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { getCurrentISOString } from '../../../../utils/dateUtils/getCurrentISOString'

const useFetchHabitsAnalytics = () => {
  const { token, role } = useUrlHash<any>()
  const shouldFetch = token && role

  const isoDateString = getCurrentISOString()

  const path = `${HABITS_ANALYTICS_PATH}?widgetToken=${token}&role=${role}&isoDateString=${isoDateString}`

  const res = useSWR(shouldFetch ? path : null, fetcher)

  return res
}

export default useFetchHabitsAnalytics
