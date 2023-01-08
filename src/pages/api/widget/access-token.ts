import Rest from '@/lambda/lib/rest'
import createWidgetAccessToken from '@/lambda/routers/auth/createWidgetAccessToken'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rest = new Rest(req, res)

  await rest.post(createWidgetAccessToken)
}
