import { getBlocsUser } from '@/lambda/helpers/faunadb/getBlocsUserRef'
import Rest from '@/lambda/lib/rest'
import { getBearerToken } from '@/lambda/middlewares/getBearerToken'
import validateWidgetAuth from '@/lambda/routers/auth/validateWidgetAuth'
import deletePomodoroPreset from '@/lambda/routers/pomodoro/deletePomodoroPreset'
import getPomodoroPresets from '@/lambda/routers/pomodoro/getPomodoroPresets'
import patchPomodoroPreset from '@/lambda/routers/pomodoro/patchPomodoroPreset'
import postPomodoroPreset from '@/lambda/routers/pomodoro/postPomodoroPreset'

const handler = async (req, res) => {
  const rest = new Rest(req, res)

  await getBearerToken(req, res, rest)
  await validateWidgetAuth(req, res, rest)
  await getBlocsUser(req, res, rest)

  await rest.get(getPomodoroPresets)
  await rest.post(postPomodoroPreset)
  await rest.delete(deletePomodoroPreset)
  await rest.patch(patchPomodoroPreset)
}

export default handler
