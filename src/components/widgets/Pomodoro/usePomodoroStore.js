import makeStore from "src/lib/makeStore"
import pomodoroReducer from "./pomodoroReducer"

const initialState = {
  favorites: [],
  session: {
    startedAt: null,
    endedAt: null,
  },
  sessionSettings: {
    interval: 1000 * 60 * 25,
    label: "work",
    labelColor: "#0070e0",
    id: "",
  },
}

const [PomodoroProvider, usePomodoroStore, usePomodoroDispatch] = makeStore({
  initialState,
  reducer: pomodoroReducer,
})

export { PomodoroProvider, usePomodoroStore, usePomodoroDispatch, initialState }
