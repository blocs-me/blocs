export const getPercent = (
  denomination: number,
  total: number,
  format?: 'round' | 'toFixedTwo' | 'floor'
) => {
  const formatter = (() => {
    if (['round', 'floor', 'ceil'].includes(format)) return Math[format]
    if (format === 'toFixedTwo') return (num: number) => num.toFixed(2)
    return (num: number) => num
  })()

  return formatter((denomination / total) * 100)
}
