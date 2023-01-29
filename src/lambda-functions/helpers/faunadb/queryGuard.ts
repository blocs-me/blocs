export const queryGuard = async <T>(
  fn: () => Promise<null | T>,
  noLog?: boolean
) => {
  try {
    const data = await fn()
    return data
  } catch (err) {
    if (!noLog) {
      console.error(err)
    }
    return null
  }
}
