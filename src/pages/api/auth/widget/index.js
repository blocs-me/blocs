import Rest from "@/lambda/lib/rest"
import loginWidgetUser from "@/lambda/routers/auth/loginWidgetUser"

const handler = async (req, res) => {
  const rest = new Rest(req, res)
  await rest.post(loginWidgetUser)
}

export default handler
