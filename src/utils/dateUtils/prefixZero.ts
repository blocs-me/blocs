const prefixZero = (date: string) => {
  const num = new Date(date).getDate()
  return num < 10 ? `0${num}` : 0
}

export default prefixZero
