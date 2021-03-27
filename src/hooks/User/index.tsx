import { useGlobalState } from '../../state/global'

export function useIsDarkMode() {
  const { state, setState } = useGlobalState()

  const toggleDarkMode = () => {
    setState((current) => ({ isDarkMode: !current.isDarkMode }))
  }
  const isDarkMode = state.isDarkMode
  return { isDarkMode, toggleDarkMode }
}
