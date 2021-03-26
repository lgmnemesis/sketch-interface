import { useUserGlobalState } from '../../context/User'

export function useIsDarkMode() {
  const { state, setState } = useUserGlobalState()

  const toggleDarkMode = () => {
    setState((current) => ({ isDarkMode: !current.isDarkMode }))
  }
  const isDarkMode = state.isDarkMode
  return { isDarkMode, toggleDarkMode }
}
