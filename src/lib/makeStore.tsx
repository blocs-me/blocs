import React, { useReducer, useContext, ReactNode, Provider } from 'react'
import { WithChildren } from '@/utils/tsUtils'

export type Action<T = string, PL = any> = {
  type: T
  payload: PL
}

export default function makeStore({ initialState, reducer }) {
  const context = React.createContext({})
  const dispatchContext = React.createContext({})
  const useDispatch = () => useContext(dispatchContext)
  const useStore = () => useContext(context)

  const Provider = ({ children }: WithChildren<{}>) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
      <dispatchContext.Provider value={dispatch}>
        <context.Provider value={state}>{children}</context.Provider>
      </dispatchContext.Provider>
    )
  }

  return [Provider, useStore, useDispatch]
}
