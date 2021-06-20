import { Client } from "@notionhq/client"

const notionClient = new Client({
  auth: process.env.NOTION_OAUTH_SECRET,
})

export default notionClient
