import Rest from '@/lambda/lib/rest'
import { NextApiRequest, NextApiResponse } from 'next'
import getWaterTrackerSettings from '@/lambda/routers/water-tracker/getWaterTrackerSettings'
import updateWaterTrackerSetting from '../../../../lambda-functions/routers/water-tracker/updateWaterTrackerSettings'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const rest = new Rest(req, res)

  await rest.get(getWaterTrackerSettings as any)
  await rest.patch(updateWaterTrackerSetting as any)
}

export default handler
