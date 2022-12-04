import Rest from '@/lambda/lib/rest'
import getWaterTrackerAnalytics from '@/lambda/routers/water-tracker/getWaterTrackerAnalytics'
import saveWaterTrackerAnalytics from '@/lambda/routers/water-tracker/saveWaterTrackerAnalytics'
import { NextApiResponse, NextApiRequest } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const rest = new Rest(req, res)
  await rest.post(saveWaterTrackerAnalytics as any)
  await rest.get(getWaterTrackerAnalytics as any)
}

export default handler
