import React, { useReducer, useContext } from "react"

export default function makeStore({ initialState, reducer }) {
  const context = React.createContext()
  const dispatchContext = React.createContext()
  const useDispatch = () => useContext(dispatchContext)
  const useStore = () => useContext(context)

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
      <dispatchContext.Provider value={dispatch}>
        <context.Provider value={state}>{children}</context.Provider>
      </dispatchContext.Provider>
    )
  }

  return [Provider, useStore, useDispatch]
}
