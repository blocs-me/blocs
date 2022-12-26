import Rest from '@/lambda/lib/rest'
import { NextApiRequest, NextApiResponse } from 'next'
import savePomodoroAnalytics from '../../../lambda-functions/routers/pomodoro/savePomodoroAnalytics'
import getPomodoroAnalytics from '@/lambda/routers/pomodoro/getPomodoroAnalytics'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const rest = new Rest(req, res)

  await rest.post(savePomodoroAnalytics as any)
  await rest.get(getPomodoroAnalytics as any)
}

export default handler
