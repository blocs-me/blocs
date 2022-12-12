import getYearMonthDate from './getYearMonthDate'

const prefixZero = (num: number) => (num < 10 ? `0${num}` : num)

export const getCurrentISOString = (date?: Date) => {
  const [year, month, day] = getYearMonthDate(date ? date : new Date())
  const isoString = `${year}-${prefixZero(month + 1)}-${prefixZero(day)}`

  return isoString
}
