export const getPercent = (
  denomination: number,
  total: number,
  format?: 'round' | 'toFixedTwo'
) => {
  const formatter = (() => {
    if (format === 'round') return Math.round
    if (format === 'toFixedTwo') return (num: number) => num.toFixed(2)
    return (num: number) => num
  })()

  return formatter((denomination / total) * 100)
}
