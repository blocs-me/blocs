import { daysOfTheWeek } from './constants'

const getDayOfTheWeek = (date: string | Date) =>
  daysOfTheWeek[new Date(date).getDay()]

export default getDayOfTheWeek
