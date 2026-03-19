import { getMonday } from './useAnalyticsBarChartDateRange'
import { renderHook } from '@testing-library/react'
import useAnalyticsBarChartDefaultValue from './useAnalyticsBarChartDefaultValue'
import { ReactNode } from 'react'
import { AnalyticsBarChartProvider } from './useAnalyticsBarChart'

const getDay = (dateStr: number) => new Date(dateStr).getDay()

describe('analytics date range hook', () => {
  it(`getMonday() works when given any date of the week`, () => {
    expect(getDay(getMonday(new Date(2023, 0, 24)))).toBe(1)

    expect(getDay(getMonday(new Date(2023, 1, 19)))).toBe(1)

    expect(getDay(getMonday(new Date(2023, 1, 14)))).toBe(1)

    expect(getDay(getMonday(new Date(2023, 1, 15)))).toBe(1)

    expect(getDay(getMonday(new Date(2023, 1, 16)))).toBe(1)

    expect(getDay(getMonday(new Date(2023, 1, 17)))).toBe(1)

    expect(getDay(getMonday(new Date(2023, 1, 18)))).toBe(1)

    expect(getDay(getMonday(new Date(2023, 1, 18)))).toBe(1)

    expect(getDay(getMonday(new Date(2023, 1, 19)))).toBe(1)

    // testing date across months
    const result10 = getDay(getMonday(new Date(2023, 2, 2)))
    expect(result10).toBe(1)

    const result11 = getDay(getMonday(new Date(2023, 3, 2)))
    expect(result11).toBe(1)
  })

  it('gets the correct default date range for "weekly setting"', () => {
    const wrapper = ({ children }: { children: ReactNode }) => {
      return <AnalyticsBarChartProvider>{children}</AnalyticsBarChartProvider>
    }
    jest.doMock('./useAnalyticsBarChart', () => ({
      useAnalyticsBarChartStore: () => ({ page: 2, timePeriod: 'weekly' })
    }))

    jest.doMock('./')

    const { result } = renderHook(() => useAnalyticsBarChartDefaultValue(), {
      wrapper
    })

    expect(new Date(result.current[0].date).getDay()).toBe(1)
  })

  it('gets the correct default date range for "monthly setting"', () => {
    const wrapper = ({ children }: { children: ReactNode }) => {
      return <AnalyticsBarChartProvider>{children}</AnalyticsBarChartProvider>
    }
    jest.doMock('./useAnalyticsBarChart', () => ({
      useAnalyticsBarChartStore: () => ({ page: 2, timePeriod: 'monthly' })
    }))

    const { result } = renderHook(() => useAnalyticsBarChartDefaultValue(), {
      wrapper
    })

    expect(new Date(result.current[0].date).getDay()).toBe(1)
  })
})

export {}
