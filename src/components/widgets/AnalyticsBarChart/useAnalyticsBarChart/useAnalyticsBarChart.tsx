import makeStore from '@/utils/makeStore'
import { BarChartProps } from '../../../design-system/BarChart/types'
import { AnalyticsActions } from './types'
import { Dispatch } from 'react'
import storage from '@/utils/storage'

const initialState = {
  timePeriod: storage.getItem('SET_TIME_FORMAT') || 'weekly',
  page: 0,
  dateRange: null
} as State

type State = {
  timePeriod: BarChartProps['timePeriod']
  dateRange: {
    startDate: string
    endDate: string
  }
  page: number
}

const reducer = (state: State, action: AnalyticsActions) => {
  switch (action.type) {
    case 'SET_TIME_FORMAT':
      storage.setItem('SET_TIME_FORMAT', action.payload)
      return {
        ...state,
        timePeriod: action.payload
      }
    case 'SET_DATE_RANGE':
      return {
        ...state,
        dateRange: [action.payload.startDate, action.payload.endDate]
      }
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload
      }
    default:
      return state
  }
}

const [
  AnalyticsBarChartProvider,
  useAnalyticsBarChartStore,
  useAnalyticsBarChartDispatch
] = makeStore<State, AnalyticsActions>({
  initialState,
  reducer,
  displayName: 'AnalyticsBarChartProvider'
})

const useAnalyticsBarChart = () => {
  const store = useAnalyticsBarChartStore()
  const dispatch = useAnalyticsBarChartDispatch()

  return [store, dispatch] as [State, Dispatch<AnalyticsActions>]
}

export default useAnalyticsBarChart

export {
  AnalyticsBarChartProvider,
  useAnalyticsBarChartStore,
  useAnalyticsBarChartDispatch
}
