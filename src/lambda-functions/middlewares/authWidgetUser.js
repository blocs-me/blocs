import Cookie from "cookies"
import jwt from "jsonwebtoken"

const authWidgetUser = async (req, res, rest) => {
  const token = rest.bearerToken
  const salt = process.env.JWT_SALT

  try {
    if (!token) {
      throw new Error("Unauthorized access")
    }

    const tokenData = jwt.verify(token, salt, {
      algorithms: ["HS256"],
    })
    const { userId } = tokenData
    rest.userId = userId
  } catch (error) {
    if (error?.name === "TokenExpiredError") {
      const { userId } = jwt.decode(token)
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

      rest.refreshToken = newAccessToken
      rest.userId = userId
    } else {
      rest.terminate()
      res.status(401).json({ error: "Unauthorized" })
    }
  }
}

export default authWidgetUser
