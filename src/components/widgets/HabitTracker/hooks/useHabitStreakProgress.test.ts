import useHabitStreakProgress from './useHabitStreakProgress'
import useFetchHabitsAnalytics from './useFetchHabitsAnalytics'

jest.mock<typeof import('./useFetchHabitsAnalytics')>(
  './useFetchHabitsAnalytics.ts'
)

const mockedFetchHabits = jest.mocked(useFetchHabitsAnalytics)
describe('useHabitStreakProgress hook', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  it('returns progress realtive to best streak when current streak < best streak', () => {
    mockedFetchHabits.mockImplementationOnce(
      () =>
        ({
          data: {
            data: {
              currentStreak: 20,
              bestStreak: 40
            }
          }
        } as any)
    )

    expect(useHabitStreakProgress()).toBe(50)
  })

  it('returns streaks progress relative to multiples of 50 when above 30 days', () => {
    mockedFetchHabits.mockImplementationOnce(
      () =>
        ({
          data: {
            data: {
              currentStreak: 55,
              bestStreak: 0
            }
          }
        } as any)
    )
    expect(useHabitStreakProgress()).toBe(100)

    mockedFetchHabits.mockImplementationOnce(
      () =>
        ({
          data: {
            data: {
              currentStreak: 100,
              bestStreak: 0
            }
          }
        } as any)
    )
    expect(useHabitStreakProgress()).toBe(150)
  })
})

export {}
