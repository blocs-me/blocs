import faunaClient from "@/lambda/faunaClient"
import { getBlocsUser } from "@/lambda/faunadb/getBlocsUserRef"
import Cookie from "cookies"
import { query as q } from "faunadb"
import jwt from "jsonwebtoken"

const validateWidgetAuth = async (req, res, rest) => {
  const token = rest.bearerToken
  if (!token) res.status(401).json({ error: "Unauthorized acccess" })

  // const salt = process.env.JWT_SALT

  try {
    // const tokenData = jwt.verify(token, salt, {
    //   algorithms: ["HS256"],
    // })

    const tokenData = await faunaClient.query(
      q.Get(q.Match(q.Index("temp_access_tokens_by_token"), token))
    )

    if (!tokenData?.data?.userId) {
      throw new Error("Unauthorized access")
    }

    rest.userId = tokenData?.data?.userId

    await getBlocsUser(req, res, rest)

    const user = await faunaClient.query(q.Get(rest.userRef))

    res.status(200).json({
      data: {
        valid: true,
        user: {
          avatar_url: user?.data.avatar_url,
        },
      },
    })
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong when logging in",
      data: {
        valid: false,
      },
    })
  }
}

export default validateWidgetAuth
