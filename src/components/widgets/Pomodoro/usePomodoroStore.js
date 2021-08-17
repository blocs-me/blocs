import makeStore from "src/lib/makeStore"
import { SET_CURRENT_POMODORO_PRESET } from "./pomodoroActions"
import pomodoroReducer from "./pomodoroReducer"

const getCachedPomodoroPreferences = () => {
  if (global.window) {
    const preferences = window.localStorage.getItem("pomodoroPreferences")
    if (preferences) return JSON.parse(preferences)
  }

  return {}
}

const initialState = {
  favorites: [],
  session: {
    startedAt: null,
    endedAt: null,
  },
  preferences: {
    autoSetTheme: true,
    deepFocus: true,
    startLongBreakAfter: 5,
    alarmVolume: 50,
    ...getCachedPomodoroPreferences(),
  },
  currentPreset: {
    ...JSON.parse(
      global?.window?.localStorage.getItem(SET_CURRENT_POMODORO_PRESET) ||
        JSON.stringify({})
    ),
  },
  sessionSettings: {
    interval: 25,
    longBreakInterval: 10,
    shortBreakInterval: 5,
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
