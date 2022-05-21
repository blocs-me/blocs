import Rest from '@/lambda/lib/rest'
import { getBearerToken } from '@/lambda/middlewares/getBearerToken'
import getWidgetUser from '@/lambda/middlewares/getWidgetUser'
import validateWidgetAuth from '@/lambda/routers/auth/validateWidgetAuth'

const handler = async (req, res) => {
  const rest = new Rest(req, res)

  await getBearerToken(req, res, rest)
  await getWidgetUser(req, res, rest)
  await rest.post(validateWidgetAuth)
}

export default handler
