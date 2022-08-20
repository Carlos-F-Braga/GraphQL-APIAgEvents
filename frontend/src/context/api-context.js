import React, { createContext } from "react"

export const ApiContext = createContext('http://localhost:8000/graphql')
export const ApiProvider = ({ children }) => {

  return <ApiContext.Provider value={{ }}>
    {children}
  </ApiContext.Provider>
}