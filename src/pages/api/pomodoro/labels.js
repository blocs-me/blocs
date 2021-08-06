import Rest from "@/lambda/lib/rest"
import getPomodoroLabels from "@/lambda/routers/pomodoro/getPomodoroLabels"

const handler = (req, res) => { 
  const rest = new Rest(req, res)
  
  rest.get(getPomodoroLabels)

}

export default handler