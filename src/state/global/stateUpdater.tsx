import { Dispatch, SetStateAction } from 'react'
import { GlobalStateInterface, useGlobalState } from './index'
import { PERSIST_IS_DARK_MODE } from '../../constants'

const persistDarkMode = (
  isDarkMode: boolean | undefined,
  setState: Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
) => {
  let savedIsDarkMode = isDarkMode ? true : false
  try {
    if (isDarkMode === undefined) {
      // Check saved value
      const pDarkMode = localStorage.getItem(PERSIST_IS_DARK_MODE)
      if (pDarkMode) {
        savedIsDarkMode = pDarkMode === 'true'
      } else {
        // Check global system prefered value
        const match = window?.matchMedia('(prefers-color-scheme: dark)')
        savedIsDarkMode = match.matches
      }
      setTimeout(() => {
        setState(() => ({ isDarkMode: savedIsDarkMode }))
      }, 0)
    }

    // Persist new value
    localStorage.setItem(PERSIST_IS_DARK_MODE, savedIsDarkMode.toString())
  } catch (error) {
    throw Error(error)
  }
}

export default function GlobalStateUpdater(): null {
  const { state, setState } = useGlobalState()

  persistDarkMode(state.isDarkMode, setState)

  return null
}
