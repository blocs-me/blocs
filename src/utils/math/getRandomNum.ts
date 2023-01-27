const getRandomNum = (min: number, max: number) => {
  const randomNum = Math.round(Math.max(min, Math.random() * max))
  return randomNum
}

export default getRandomNum
