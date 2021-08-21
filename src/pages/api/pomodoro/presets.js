import Rest from "@/lambda/lib/rest"
import deletePomodoroPreset from "@/lambda/routers/pomodoro/deletePomodoroPreset"
import getPomodoroPresets from "@/lambda/routers/pomodoro/getPomodoroPresets"
import patchPomodoroPreset from "@/lambda/routers/pomodoro/patchPomodoroPreset"
import postPomodoroPreset from "@/lambda/routers/pomodoro/postPomodoroPreset"
import { query as q } from "faunadb"

const handler = async (req, res) => {
  const rest = new Rest(req, res)

  // res.use(cors)
  // rest.use(authenticateBlocsUser)
  // rest.use("*", async (req, res) => {
  //   req.user = {
  //     ref: q.Ref(q.Collection("users"), "303985067693179406"),
  //   }
  // })

  rest.get(getPomodoroPresets)
  rest.post(postPomodoroPreset)
  rest.delete(deletePomodoroPreset)
  rest.patch(patchPomodoroPreset)
}

export default handler
