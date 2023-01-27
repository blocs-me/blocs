export const queryGuard = async <T>(fn: () => Promise<null | T>) => {
  try {
    const data = await fn()
    return data
  } catch (err) {
    console.error(err)
    return null
  }
}
