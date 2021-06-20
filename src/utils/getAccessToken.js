import { USER_PATH } from "./paths"

const getAccessToken = () =>
  JSON.parse(
    global.window?.localStorage.getItem(USER_PATH) || JSON.stringify("")
  )

export default getAccessToken
