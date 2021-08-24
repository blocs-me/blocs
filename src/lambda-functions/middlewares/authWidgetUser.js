import Cookie from "cookies"
import jwt from "jsonwebtoken"

const authWidgetUser = async (req, res, rest) => {
  const cookie = Cookie(req, res)
  const tokenCookie = cookie.get("accessToken")
  const salt = process.env.JWT_SALT

  try {
    if (!tokenCookie) {
      throw new Error("Unauthorized access")
    }

    const tokenData = jwt.verify(tokenCookie, salt, {
      algorithms: ["HS256"],
    })

    const { userId } = tokenData

    rest.userId = userId
  } catch (error) {
    console.log(error)
    if (error?.name === "TokenExpiredError") {
      const { userId } = jwt.decode(tokenCookie)
      const tokenExpires = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7

      const newAccessToken = jwt.sign(
        {
          userId,
          exp: tokenExpires,
        },
        salt,
        {
          algorithm: "HS256",
        }
      )

      const cookie = new Cookie(req, res)
      cookie.set("accessToken", newAccessToken, {
        httpOnly: true,
      })

      rest.userId = userId
    } else {
      res.status(401).json({ error: "Unauthorized" })
    }
  }
}

export default authWidgetUser
