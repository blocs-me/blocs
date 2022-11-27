import { BarChartProps } from '@/design-system/BarChart/types'

export type AnalyticsActions =
  | {
      type: 'SET_TIME_FORMAT'
      payload: BarChartProps['timePeriod']
    }
  | {
      type: 'SET_DATE_RANGE'
      payload: {
        startDate: string
        endDate: string
      }
    }
  | {
      type: 'SET_PAGE'
      payload: number
    }
