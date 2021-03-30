import { useGlobalState } from '../../state/global'

export function useWalletModalToggle() {
  const { state, setState } = useGlobalState()

  const toggleWalletModal = () => {
    setState((current) => ({
      ...current,
      isOpenWalletModal: !current.isOpenWalletModal,
    }))
  }
  return { isOpenWalletModal: state.isOpenWalletModal, toggleWalletModal }
}
