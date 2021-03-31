import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import { BigNumberish } from '@ethersproject/bignumber'

function parseUpToFloat(str: string, upToDecimal: number) {
  str = str.toString()
  str = str.slice(0, str.indexOf('.') + upToDecimal + 1)
  return Number(str)
}

export function useAccountETHBalance() {
  const { account, library, chainId } = useWeb3React()

  const [balance, setBalance] = useState<BigNumberish>()
  useEffect(() => {
    if (!!account && !!library) {
      let stale = false

      library
        .getBalance(account)
        .then((balance: BigNumberish) => {
          if (!stale) setBalance(balance)
        })
        .catch(() => {
          if (!stale) setBalance(undefined)
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account, library, chainId])

  const balanceStr = balance
    ? parseUpToFloat(formatEther(balance.toString()), 2)
    : ''
  return {
    balance,
    balanceFormatStr: balanceStr || '0',
  }
}
