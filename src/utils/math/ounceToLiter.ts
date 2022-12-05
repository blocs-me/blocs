export const ounceToLiter = (ounce: number, round: boolean = true) => {
  const liters = ounce / 33.8140227018
  if (round) return Math.round(liters)
  return liters
}
