import {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react'

export interface UserGlobalStateInterface {
  isDarkMode: boolean
}

const UserGlobalStateContext = createContext({
  state: {} as Partial<UserGlobalStateInterface>,
  setState: {} as Dispatch<SetStateAction<Partial<UserGlobalStateInterface>>>,
})

const UserGlobalStateProvider = ({
  children,
  value = {} as UserGlobalStateInterface,
}: {
  children: ReactNode
  value?: Partial<UserGlobalStateInterface>
}) => {
  const [state, setState] = useState(value)
  return (
    <UserGlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </UserGlobalStateContext.Provider>
  )
}

const useUserGlobalState = () => {
  const context = useContext(UserGlobalStateContext)
  if (!context) {
    throw new Error(
      'useUserGlobalState must be used within a GlobalStateContext',
    )
  }
  return context
}

export { UserGlobalStateProvider, useUserGlobalState }
