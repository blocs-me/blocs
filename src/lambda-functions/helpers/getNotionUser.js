import { Client } from "@notionhq/client/build/src"

const getNotionUser = async (access_token) => {
  if (!access_token)
    throw new Error("Unable to sign into notion : access token undefined")

  try {
    const notionClient = new Client({ auth: access_token })

    const allUsers = await notionClient.users.list()

    const filteredUsers =
      allUsers.results?.filter((user) => user.type === "person") || []

    const { id: user_id } = filteredUsers.length > 0 ? filteredUsers[0] : {}

    if (user_id) {
      const userData = await notionClient.users.retrieve({ user_id })
      return userData
    } else {
      throw new Error("Notion Error : user data not found")
    }
  } catch (err) {
    console.error("Could not get Notion user", err)
    throw err
  }
}

export default getNotionUser
