import getNotionUser from "../../../lambda-functions/helpers/notion/getNotionUser"

const handler = async (req, res) => {
  const { access_token } = req.body

  if (!access_token)
    res.status(400).json({ err: "Client Error : Access token required" })

  if (req.method === "POST") {
    try {
      const notionUser = await getNotionUser(access_token)

      if (notionUser.person.email || notionUser.id) {
        res.status(200).json({ authValid: true })
      }
    } catch (err) {
      console.error("Notion error : Could not validate notion user")
      res
        .status(401)
        .json({ err: "Notion error : Could not validate notion user" })
    }
  }
}

export default handler
