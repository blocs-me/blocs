import Rest from "@/lambda/lib/rest"
import validateWidgetAuth from "@/lambda/routers/auth/validateWidgetAuth"

const handler = async (req, res) => {
  const rest = new Rest(req, res)

  await rest.post(validateWidgetAuth)
}

export default handler
