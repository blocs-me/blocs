const CLIENT_ID = process.env.NEXT_PUBLIC_NOTION_OAUTH_CLIENT_ID
const REDIRECT_URL = process.env.NEXT_PUBLIC_NOTION_OAUTH_REDIRECT_URL

const notionOAuthData = {
  CLIENT_ID,
  REDIRECT_URL,
}

export default notionOAuthData
