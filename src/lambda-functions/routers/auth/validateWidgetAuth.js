import Cookie from "cookies"
import jwt from "jsonwebtoken"

const validateWidgetAuth = async (req, res) => {
  const cookie = new Cookie(req, res)
  const tokenCookie = cookie.get("accessToken")

  if (!tokenCookie) res.status(401).json({ error: "Unauthorized acccess" })

  const salt = process.env.JWT_SALT
  let tokenData = null

  try {
    try {
      tokenData = jwt.verify(tokenCookie, salt, {
        algorithms: ["HS256"],
      })
    } catch (error) {
      error.data = tokenData
      throw error
    }

    const { userId } = tokenData
    if (!userId) {
      throw new Error("Unauthorized access")
    }

    res.status(200).json({
      data: {
        valid: true,
      },
    })
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

      return res.status(200).json({
        data: {
          valid: true,
        },
      })
    }

    res.status(500).json({
      error: "Something went wrong when logging in",
      data: {
        valid: false,
      },
    })
  }
}

export default validateWidgetAuth
