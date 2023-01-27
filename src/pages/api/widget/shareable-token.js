import createShareableWidgetToken from '@/lambda/routers/auth/createShareableWidgetToken'
import Rest from '@/lambda/lib/rest'

export default async function handler(req, res) {
  const rest = new Rest(req, res)

  await rest.post(createShareableWidgetToken)
}
