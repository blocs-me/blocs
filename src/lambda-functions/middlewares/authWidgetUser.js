import Cookie from "cookies"
import { query as q } from "faunadb"
import jwt from "jsonwebtoken"
import faunaClient from "../faunaClient"

const authWidgetUser = async (req, res, rest) => {
  const token = rest.bearerToken
  const salt = process.env.JWT_SALT

  try {
    if (!token) {
      throw new Error("Unauthorized access")
    }

    // const tokenData = jwt.verify(token, salt, {
    //   algorithms: ["HS256"],
    // })

    const user = await faunaClient.query(
      q.Get(q.Match(q.Index("temp_access_tokens_by_token"), token))
    )

    if (!user?.data?.userId) {
      throw new Error("Unauthorized access")
    }

    const { userId } = user?.data
    rest.userId = userId
  } catch (error) {
    rest.terminate()
    res.status(401).json({ error: "Unauthorized" })
  }
}

export default authWidgetUser
