const { default: faunaClient } = require("@/lambda/faunaClient")
const { query: q } = require("faunadb")
import jwt from "jsonwebtoken"
import Cookie from "cookies"

const loginWidgetUser = async (req, res) => {
  const { token: tempAccessToken } = req.body

  if (!tempAccessToken) res.status(401).json({ error: "unauthorized" })

  try {
    const tokenData = await faunaClient.query(
      q.Call(q.Function("is_temp_access_token_valid"), tempAccessToken)
    )
    const blocsUserId = tokenData?.data?.userId
    if (!blocsUserId) {
      throw new Error("Token is invalid")
    }

    const blocsUser = await faunaClient.query(
      q.Get(q.Ref(q.Collection("users"), blocsUserId))
    )

    const salt = process.env.JWT_SALT
    const tokenExpires = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
    // const tokenExpires = Math.floor(Date.now() / 1000) + 60

    const accessToken = jwt.sign(
      {
        userId: blocsUserId,
        exp: tokenExpires,
      },
      salt,
      {
        algorithm: "HS256",
      }
    )

    const cookie = new Cookie(req, res)
    cookie.set("accessToken", accessToken, {
      httpOnly: true,
    })

    res.json({
      data: blocsUser?.data,
    })
  } catch (err) {
    console.log(err)

    res.status(401).json({ error: "The link has expired." })
  }
}

export default loginWidgetUser
