const getMonthStr = (date: Date | string) => {
  const intl = new Intl.DateTimeFormat('en', {
    month: 'long'
  })

  return intl.format(new Date(date))
}

export default getMonthStr
