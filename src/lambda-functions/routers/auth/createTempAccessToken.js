import faunaClient from "@/lambda/faunaClient"
import getNotionUser from "@/lambda/helpers/getNotionUser"
import { query as q, Ref } from "faunadb"
import { v4 as uuid } from "uuid"

const createTempAccessToken = async (req, res) => {
  try {
    const accessToken = req.body.access_token
    const notionUser = await getNotionUser(accessToken)

    const userEmail = notionUser?.person?.email
    const blocsUser = await faunaClient.query(
      q.Get(q.Match(q.Index("all_users_by_email"), userEmail))
    )
    if (!blocsUser?.ref) throw new Error("blocs user not defined")

    const blocsUserId = blocsUser?.ref?.id
    const token = uuid()
    const tempAccessToken = await faunaClient.query(
      q.Call(q.Function("create_temp_access_token"), [token, blocsUserId])
    )

    res.status(200).json({
      data: {
        token,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error?.message || "interval serverError" })
  }
}

export default createTempAccessToken
