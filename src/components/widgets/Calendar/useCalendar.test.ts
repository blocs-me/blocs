import { buildMonthGrid, getWeekNumber, CalendarDay } from './useCalendar'

describe('buildMonthGrid', () => {
  it('builds a grid for March 2026 starting Sunday', () => {
    const grid = buildMonthGrid(2026, 2, 0) // month is 0-indexed, March = 2
    const allDays = grid.flat()

    // March 2026 has 31 days
    const marchDays = allDays.filter(d => d.isCurrentMonth)
    expect(marchDays).toHaveLength(31)

    // First day should be correct (March 1, 2026 is a Sunday)
    expect(grid[0][0].dayOfMonth).toBe(1)
    expect(grid[0][0].isCurrentMonth).toBe(true)
  })

  it('builds a grid for March 2026 starting Monday', () => {
    const grid = buildMonthGrid(2026, 2, 1)
    const allDays = grid.flat()

    const marchDays = allDays.filter(d => d.isCurrentMonth)
    expect(marchDays).toHaveLength(31)

    // March 1, 2026 is Sunday, so with Monday start the first cell is Mon Feb 23
    expect(grid[0][0].isCurrentMonth).toBe(false)
    // Last day of grid's first row (Sunday) should be March 1
    expect(grid[0][6].dayOfMonth).toBe(1)
    expect(grid[0][6].isCurrentMonth).toBe(true)
  })

  it('builds a grid for February 2026 (non-leap year)', () => {
    const grid = buildMonthGrid(2026, 1, 0)
    const febDays = grid.flat().filter(d => d.isCurrentMonth)
    expect(febDays).toHaveLength(28)
  })

  it('builds a grid for February 2028 (leap year)', () => {
    const grid = buildMonthGrid(2028, 1, 0)
    const febDays = grid.flat().filter(d => d.isCurrentMonth)
    expect(febDays).toHaveLength(29)
  })

  it('always has 7 columns per row', () => {
    const grid = buildMonthGrid(2026, 5, 0) // June 2026
    grid.forEach(row => {
      expect(row).toHaveLength(7)
    })
  })

  it('fills leading days from previous month', () => {
    // April 2026 starts on Wednesday (sow=0: need Sun,Mon,Tue from March)
    const grid = buildMonthGrid(2026, 3, 0)
    const leadingDays = grid[0].filter(d => !d.isCurrentMonth)
    expect(leadingDays.length).toBeGreaterThan(0)
    expect(leadingDays[0].dayOfMonth).toBeGreaterThan(20) // late March days
  })

  it('fills trailing days from next month', () => {
    const grid = buildMonthGrid(2026, 2, 0) // March 2026
    const lastRow = grid[grid.length - 1]
    const trailingDays = lastRow.filter(d => !d.isCurrentMonth)
    if (trailingDays.length > 0) {
      expect(trailingDays[0].dayOfMonth).toBe(1) // April 1
    }
  })

  it('includes date string in YYYY-MM-DD format', () => {
    const grid = buildMonthGrid(2026, 2, 0)
    const firstDay = grid[0].find(d => d.isCurrentMonth)!
    expect(firstDay.date).toBe('2026-03-01')
  })
})

describe('getWeekNumber', () => {
  it('returns week 1 for Jan 1 2026 (Thursday)', () => {
    const wn = getWeekNumber(new Date(2026, 0, 1))
    expect(wn).toBe(1)
  })

  it('returns week 52 or 53 for late December', () => {
    const wn = getWeekNumber(new Date(2026, 11, 28))
    expect(wn).toBeGreaterThanOrEqual(52)
  })

  it('returns correct week for a mid-year date', () => {
    // June 15 2026 is a Monday — should be around week 25
    const wn = getWeekNumber(new Date(2026, 5, 15))
    expect(wn).toBeGreaterThanOrEqual(24)
    expect(wn).toBeLessThanOrEqual(25)
  })
})
