import { getBlocsUser } from "@/lambda/faunadb/getBlocsUserRef"
import Rest from "@/lambda/lib/rest"
import authWidgetUser from "@/lambda/middlewares/authWidgetUser"
import deletePomodoroPreset from "@/lambda/routers/pomodoro/deletePomodoroPreset"
import getPomodoroPresets from "@/lambda/routers/pomodoro/getPomodoroPresets"
import patchPomodoroPreset from "@/lambda/routers/pomodoro/patchPomodoroPreset"
import postPomodoroPreset from "@/lambda/routers/pomodoro/postPomodoroPreset"
import { query as q } from "faunadb"

const handler = async (req, res) => {
  const rest = new Rest(req, res)

  await authWidgetUser(req, res, rest)
  await getBlocsUser(req, res, rest)

  await rest.get(getPomodoroPresets)
  await rest.post(postPomodoroPreset)
  await rest.delete(deletePomodoroPreset)
  await rest.patch(patchPomodoroPreset)
}

export default handler
