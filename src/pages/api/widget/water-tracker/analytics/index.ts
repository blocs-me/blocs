import Rest from '@/lambda/lib/rest'
import saveWaterTrackerAnalytics from '@/lambda/routers/water-tracker/saveWaterTrackerAnalytics'
import { NextApiResponse, NextApiRequest } from 'next'
import getWaterTrackerAnalyticsRange from '../../../../../lambda-functions/routers/water-tracker/getWaterTrackerAnalyticsDataRange'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const rest = new Rest(req, res)

  await rest.get(getWaterTrackerAnalyticsRange as any)
  await rest.post(saveWaterTrackerAnalytics as any)
}

export default handler
