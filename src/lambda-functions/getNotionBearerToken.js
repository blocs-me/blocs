const getNotionBearerToken = () => {
  const clientId = process.env.NOTION_OAUTH_CLIENT_ID
  const secret = process.env.NOTION_OAUTH_SECRET

  const str = `${clientId}:${secret}` + ""
  const buff = Buffer.from(str, "utf-8")
  return buff.toString("base64")
}

export default getNotionBearerToken
