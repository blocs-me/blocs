import React, { useReducer, useContext, Dispatch, ReactNode } from 'react'
import { WithChildren } from '@/utils/tsUtils'
import { ComponentType } from 'react'

export type Action<T = string, PL = any> = {
  type: T
  payload: PL
}

function makeStore<Store = any, Actions = any>({
  initialState,
  reducer,
  displayName = 'MakeStoreProvider'
}) {
  const context = React.createContext<Store>({} as Store)
  const dispatchContext = React.createContext(null)
  const useDispatch = (): Dispatch<Actions> => useContext(dispatchContext)
  const useStore = () => useContext(context)

  const Provider: (props: { children?: ReactNode }) => JSX.Element = ({
    children
  }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
      <dispatchContext.Provider value={dispatch}>
        <context.Provider value={state as Store}>{children}</context.Provider>
      </dispatchContext.Provider>
    )
  }

  dispatchContext.displayName = displayName

  const result = [Provider, useStore, useDispatch] as [
    (props: { children?: ReactNode }) => JSX.Element,
    typeof useStore,
    typeof useDispatch
  ]
  return result
}

export default makeStore
