const prefixZero = (date: string) => {
  const num = new Date(date).getDate()
  return num < 10 ? `0${num}` : num
}

export default prefixZero
