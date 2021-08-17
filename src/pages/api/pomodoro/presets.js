import Rest from "@/lambda/lib/rest"
import getPomodoroPresets from "@/lambda/routers/pomodoro/getPomodoroPresets"

const handler = (req, res) => {
  const rest = new Rest(req, res)

  // res.use(cors)
  // rest.use(authenticateBlocsUser)
  rest.get(getPomodoroPresets)
}

export default handler
