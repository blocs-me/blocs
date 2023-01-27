const daysBetween = (date1: Date | string, date2: Date | string) => {
  const timeDiffInMs = Math.abs(
    new Date(date1).getTime() - new Date(date2).getTime()
  )

  const days = Math.round(timeDiffInMs / (1000 * 60 * 60 * 24))

  return days
}

export default daysBetween
