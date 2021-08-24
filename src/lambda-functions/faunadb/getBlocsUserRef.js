import { query as q } from "faunadb"
import faunaClient from "../faunaClient"

export const getBlocsUser = async (req, res, rest) => {
  const { userId } = rest

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" })
    rest.terminate()
  }

  const userRef = q.Ref(q.Collection("users"), userId)

  // try {
  // }
  // const userExists = await faunaClient.query(q.Get(userRef))

  rest.userRef = userRef
}
