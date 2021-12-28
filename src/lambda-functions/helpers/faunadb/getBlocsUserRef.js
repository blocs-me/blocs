import { query as q } from "faunadb"

export const getBlocsUser = async (req, res, rest) => {
  if (rest.terminated) return null

  const { userId } = rest

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" })
    rest.terminate()
  }

  const userRef = q.Ref(q.Collection("users"), userId)


  rest.userRef = userRef
}
