const msToMins = (ms) => {
  if (typeof ms !== "number") return 0
  return ms / 1000 / 60
}

export default msToMins
