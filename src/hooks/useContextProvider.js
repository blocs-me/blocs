import React, { useReducer } from "react"

const useContextProvider = ({ context, initialState, reducer }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return [context.Provider, { value: [state, dispatch] }]
}

export default useContextProvider
