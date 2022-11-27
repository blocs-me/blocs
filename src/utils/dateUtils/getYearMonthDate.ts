const getYearMonthDate = (date: string | Date) => {
  const d = new Date(date)
  return [d.getFullYear(), d.getMonth(), d.getDay()]
}

export default getYearMonthDate
