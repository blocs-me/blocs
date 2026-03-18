import storage from '@/utils/storage'
import makeStore from 'src/utils/makeStore'
import {
  SET_CURRENT_POMODORO_PRESET,
  SET_DOCUMENT_TIMELINE_OFFSET,
  SET_DOCUMENT_TIMELINE_START,
  SET_PAUSED_AT,
  SET_POMODORO_PRESET_MODE,
  SET_POMODORO_SESSION_COUNT,
  SET_STARTED_AT
} from './pomodoroActions'
import { POMODORO_INTERVAL_MODE } from './pomodoroPresetModes'
import pomodoroReducer from './pomodoroReducer'

const getCachedPomodoroPreferences = () => {
  const preferences =
    storage.getItem('pomodoroPreferences') || JSON.stringify('')
  if (preferences) return JSON.parse(preferences)

  return {}
}

const initialState = {
  favorites: [],
  activeSessionMenu: false,
  sessionCount: Number(storage.getItem(SET_POMODORO_SESSION_COUNT)) || 0,

  presetMode:
    storage.getItem(SET_POMODORO_PRESET_MODE) || POMODORO_INTERVAL_MODE,
  documentTimelineStart: 0,
  session: {
    startedAt: null,
    endedAt: null,
    pausedAt: Number(storage.getItem(SET_PAUSED_AT))
  },
  preferences: {
    autoSetTheme: true,
    autoStartBreak: true,
    deepFocus: true,
    startLongBreakAfter: 4,
    alarmVolume: 30,
    ...getCachedPomodoroPreferences()
  },
  currentPreset: {
    id: '0',
    longBreakInterval: 900000,
    shortBreakInterval: 300000,
    pomodoroInterval: 1500000,
    label: 'work',
    labelColor: '#00d1e0',
    ...JSON.parse(
      storage.getItem(SET_CURRENT_POMODORO_PRESET) || JSON.stringify({})
    )
  }
}

const [PomodoroProvider, usePomodoroStore, usePomodoroDispatch] = makeStore({
  initialState,
  reducer: pomodoroReducer,
  displayName: 'PomodoroProvider'
})

export { PomodoroProvider, usePomodoroStore, usePomodoroDispatch, initialState }
