import fetch from "isomorphic-fetch"
import getNotionBearerToken from "../../getNotionBearerToken"

const authenticateNotionUser = async (code) => {
  const notionUrl = "https://api.notion.com/v1/oauth/token"
  const Bearer = getNotionBearerToken()

  try {
    const authData = await fetch(notionUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Bearer}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.NEXT_PUBLIC_NOTION_OAUTH_REDIRECT_URL,
      }),
    })

    const data = await authData.json()

    if (authData.status !== 200) {
      console.error("auth error", data, "status", authData.status)
      throw new Error(data.error)
    }

    return data
  } catch (err) {
    console.error("auth error", "Unable to sign into notion : auth data issue")
    throw err
  }
}

export default authenticateNotionUser
