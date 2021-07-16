import useContextProvider from "@/hooks/useContextProvider"
import pomodoroContext from "./pomodoroContext"
import pomodoroReducer from "./pomodoroReducer"

const initialState = {
  favourites: [],
  timer: {
    settings: {},
  },
}

const PomodoroContextProvider = ({ children }) => {
  const [Provider, props] = useContextProvider({
    context: pomodoroContext,
    initialState,
    reducer: pomodoroReducer,
  })

  return <Provider {...props}>{children}</Provider>
}

export default PomodoroContextProvider
