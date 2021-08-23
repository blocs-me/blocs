import makeStore from "src/lib/makeStore"
import {
  SET_CURRENT_POMODORO_PRESET,
  SET_POMODORO_SESSION_COUNT,
} from "./pomodoroActions"
import { POMODORO_INTERVAL_MODE } from "./pomodoroPresetModes"
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
  activeSessionMenu: false,
  sessionCount:
    Number(global.window?.localStorage.getItem(SET_POMODORO_SESSION_COUNT)) ||
    0,
  presetMode: POMODORO_INTERVAL_MODE,
  session: {
    startedAt: null,
    endedAt: null,
  },
  preferences: {
    autoSetTheme: true,
    autoStartBreak: false,
    deepFocus: true,
    startLongBreakAfter: 5,
    alarmVolume: 50,
    ...getCachedPomodoroPreferences(),
  },
  currentPreset: {
    id: "0",
    longBreakInterval: 600000,
    shortBreakInterval: 300000,
    pomodoroInterval: 1500000,
    label: "work",
    labelColor: "#00d1e0",
    ...JSON.parse(
      global?.window?.localStorage.getItem(SET_CURRENT_POMODORO_PRESET) ||
        JSON.stringify({})
    ),
  },
}

const [PomodoroProvider, usePomodoroStore, usePomodoroDispatch] = makeStore({
  initialState,
  reducer: pomodoroReducer,
})

export { PomodoroProvider, usePomodoroStore, usePomodoroDispatch, initialState }
