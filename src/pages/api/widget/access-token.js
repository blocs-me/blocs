import Rest from "@/lambda/lib/rest"
import createWidgetAccessToken from "@/lambda/routers/auth/createWidgetAccessToken"

export default async function handler(req, res) {
  const rest = new Rest(req, res)

  if (!req.body.access_token) {
    res.status(200).json({ error: "access_token needed" })
  }

  
  await rest.post(createWidgetAccessToken)
}
