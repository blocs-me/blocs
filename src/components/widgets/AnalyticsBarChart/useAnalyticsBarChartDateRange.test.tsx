import { getMonday } from './useAnalyticsBarChartDateRange'
import { renderHook } from '@testing-library/react-hooks'
import useAnalyticsBarChartDefaultValue from './useAnalyticsBarChartDefaultValue'
import { ReactNode } from 'react'
import { AnalyticsBarChartProvider } from './useAnalyticsBarChart'

describe('analytics date range hook', () => {
  it(`gets the monday of the week when provided with any date of the week`, () => {
    const result1 = getMonday(new Date(2023, 0, 24))
    expect(result1).toBe(23)

    const result2 = getMonday(new Date(2023, 1, 19))
    expect(result2).toBe(13)

    const result3 = getMonday(new Date(2023, 1, 14))
    expect(result3).toBe(13)

    const result4 = getMonday(new Date(2023, 1, 15))
    expect(result4).toBe(13)

    const result5 = getMonday(new Date(2023, 1, 16))
    expect(result5).toBe(13)

    const result6 = getMonday(new Date(2023, 1, 17))
    expect(result6).toBe(13)

    const result7 = getMonday(new Date(2023, 1, 18))
    expect(result7).toBe(13)

    const result8 = getMonday(new Date(2023, 1, 18))
    expect(result8).toBe(13)

    const result9 = getMonday(new Date(2023, 1, 19))
    expect(result9).toBe(13)

    // testing date across months
    const result10 = getMonday(new Date(2023, 2, 2))
    const date = new Date(2023, 2, result10).toISOString().split('T')[0]
    expect(date).toBe('2023-02-27')

    const result11 = getMonday(new Date(2023, 3, 2))
    const date2 = new Date(2023, 3, result11).toISOString().split('T')[0]
    expect(date2).toBe('2023-03-27')
  })

  // it('gets the correct date range', () => {
  //   const wrapper = ({ children }: { children: ReactNode }) => {
  //     return <AnalyticsBarChartProvider>{children}</AnalyticsBarChartProvider>
  //   }
  //   jest.doMock(
  //     '/src/components/widgets/AnalyticsBarChart/useAnalyticsBarChart',
  //     () => ({
  //       useAnalyticsBarChartStore: () => ({ page: 0, timePeriod: 'weekly' })
  //     })
  //   )
  //   const { result } = renderHook(() => useAnalyticsBarChartDefaultValue, {
  //     wrapper
  //   })

  //   expect(result.current[0]).toBe()
  // })
})

export {}
