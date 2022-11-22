import { daysOfTheWeek } from './constants'

const getDayOfTheWeek = (date: string) => daysOfTheWeek[new Date(date).getDay()]

export default getDayOfTheWeek
