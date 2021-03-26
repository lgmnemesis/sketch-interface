import { NetworkContextName } from '../../constants'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'

function Web3StatusInner() {
  return <p>Inner web3</p>
}

export default function Web3Status() {
  const { active } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  if (!contextNetwork.active && !active) {
    return null
  }

  return (
    <>
      <Web3StatusInner />
    </>
  )
}
