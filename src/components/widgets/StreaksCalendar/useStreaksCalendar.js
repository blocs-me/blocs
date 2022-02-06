/*
ALL FEATURES
============
  • returns current month metadata by default
  • returns 5 weeks dates every time
  • ability to traverse next & prev dates
  • if current month doesn't start on 1st, start calendar from previous month's 1st day
  • ability to start the month on a sunday or monday
*/

import { useState } from "react"

const getDateMetadata = (date) => ({
  day: date.getDay(),
  date: date.getDate(),
  month: date.getMonth(),
  year: date.getFullYear(),
  numberOfDays: new Date(date.getFullYear(), date.getMonth() + 1, 0),
})

const getPreviousMonth = (date) => {}
const getDaysOffset = (date, monthStartsOn) => {}
const areDatesEqual = (d1, d2) =>
  d1?.toLocaleDateString() === d2?.toLocaleDateString()
const areDatesOfSameMonth = (d1, d2) => d1.getMonth() === d2.getMonth()
const areDatesOfSameYear = (d1, d2) => d1.getFullYear() === d2.getFullYear()
const getDateEachCellData = (date, currentDate, today = new Date()) => {
  const isCurrentMonth = areDatesOfSameMonth(currentDate, date)
  const day = date.getDate()
  const isToday = areDatesEqual(date, today)

  return {
    isCurrentMonth,
    isToday,
    day,
  }
}
const getDateCellDays = (days, currentDate, today) =>
  days?.map((date) => getDateEachCellData(date, currentDate, today))

const getDays = (date, monthStartsOn) => {
  if (!date instanceof Date) return null

  const currentDate = getDateMetadata(date)
  const firstDay = new Date(currentDate.year, currentDate.month, 1)
  const daysOffset = firstDay.getDay()

  const days = []
  let startDate = firstDay

  // add offset days
  if (monthStartsOn === "monday") { // TO DO, add ability to rotate this to other days of the week
    const { date, year, month } = getDateMetadata(startDate)
    if (daysOffset > 1) {
      // assuming week starts on a monday
      // when offset is >1, then we displace by that number
      startDate.setDate(date - (daysOffset - 1))
    }

    // when offset is 0, it means that the first day is a sunday, so we need to displace by -8 days
    if (daysOffset === 0) {
      startDate.setDate(date - 8)
    }
  }

  // set the displaced date, and get 41 dates after that
  let count = 0

  while (count < 42) {
    const { year, month, date } = getDateMetadata(startDate)
    const d = new Date(year, month, date + count)
    days.push(d)
    count++
  }

  return days
}

const useStreaksCalendar = (options = {}) => {
  const { monthStartsOn = "monday" } = options
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const year = new Date(today.getFullYear(), month, 1).getFullYear()
  const currentDate = new Date(today.getFullYear(), month, 1)
  const days = getDays(currentDate, monthStartsOn)
  const dateCellDays = getDateCellDays(days, currentDate, today)

  const setToday = () => setMonth(today.getMonth())
  const nextMonth = () => setMonth(month + 1)
  const prevMonth = () => setMonth(month - 1)

  return {
    year,
    month,
    days,
    currentDate,
    dateCellDays,
    nextMonth,
    prevMonth,
    setToday,
  }
}

export default useStreaksCalendar

/* 
  ------------
  worst case :
  ------------
  displaced by one week
  ---------------------
  25  26  27  28  29  30  31  (25 = 31 - 6, 6th is a saturday, this week starts on a sunday)
  1   2   3   4   5   6   7
  8   9   10  11  12  13  14
  15  16  17  18  19  20  21
  22  23  24  25  26  27  28
  29  30  1   2   3   4   5
*/

// IF month starts on a sunday displace by 0
// IF starts on monday, displace
