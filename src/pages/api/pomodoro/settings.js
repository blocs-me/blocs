import Rest from "@/lambda/lib/rest"
// import cors from "@/lambda/auth/cors"
import getPomdoroSettings from "@/lambda/routers/pomodoro/getPomdoroSettings"

const handler = async (req, res) => {
  const rest = new Rest(req, res)

  // rest.use("*", cors)
  rest.get(getPomdoroSettings)
}

export default handler
