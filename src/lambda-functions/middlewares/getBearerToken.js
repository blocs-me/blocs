export const getBearerToken = async (req, res, rest) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401).json({ error: "Unauthorized" })
    rest.terminate()
    return
  }

  const token = bearer.split(" ")[1]
  rest.bearerToken = token

  return token
}
