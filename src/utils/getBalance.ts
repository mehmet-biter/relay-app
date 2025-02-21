import { formatEther, formatUnits } from '@ethersproject/units'

import { ChainId } from '@zeroexchange/sdk'

const myCrypto = require('./eth-scan/index');
const { getTokensBalance } = myCrypto;

export function getBalanceContract(chainId: ChainId) {
  switch (chainId) {
    case ChainId.AVALANCHE:
      return '0x2de0E94469ED1E1b2fEdD651E45036903756306F'
    case ChainId.MATIC:
      return '0xc3f90F28C0d52Da1cFbC8E6D9E231176ab731FD9'
    case ChainId.SMART_CHAIN:
      return '0xc3f90F28C0d52Da1cFbC8E6D9E231176ab731FD9'
    case ChainId.HECO:
      return '0xc3f90F28C0d52Da1cFbC8E6D9E231176ab731FD9'
    case ChainId.MOONRIVER:
      return '0x8894410c1e5617013ad0405053dd24ec8eaE9a37'
    case ChainId.FANTOM:
      return '0x0db3E7586b455588c19728e948ae1C1e3803F9c0'
    case ChainId.SHIDEN:
      return '0xa5666b11eF5E98dF0D4eEb658684C455aE442423'
    case ChainId.IOTEX:
      return '0x61169C86d4A84a11d9A1D31f80F47f653f19192D'
    case ChainId.HARMONY:
      return '0x4AEb5fB68dE1Cb0a357B3C4Ee8067761ab56024F'
    case ChainId.CRONOS:
      return '0x404BB1901167F6D4Bb99f19c5914D4345C9A5559' 
    case ChainId.OKEX:
      return '0xa0CFaB1600d51F5191cBe4F7cceD89D770858B6C'    
    default:
      // MAINNET ETH
      return '0x08A8fDBddc160A7d5b957256b903dCAb1aE512C5'
  }
}

export const getNativeTokenBalance = async (account: string) => {
  try {
    const { ethereum } = window as any
    const balance = await ethereum.request({ method: 'eth_getBalance', params: [account] })
    return parseFloat(formatEther(balance))
  } catch (err) {
    console.log('getNativeTokenBalance error', err)
    return Promise.reject(err)
  }
}

export const getAllTokenBalances = async (
  account?: string | undefined | null,
  chainId?: ChainId,
  tokens?: any,
  provider?: any
) => {
  try {
    if (!chainId || !account) {
      return
    }
    const contractAddress = getBalanceContract(chainId)

    let balances: { [key: string]: { balance: any } | any } = {}
    try {
      balances = await getTokensBalance(provider, account, tokens, { contractAddress })
    } catch (err) {
      console.log('getTokensBalance error', err)
    }

    for (let token of tokens) {
      try {
        let balance = null
        if (balances[token]) {
          balance = parseFloat(formatUnits(balances[token]))
        }
        balances[token] = {
          balance,
          chainId,
          address: token
        }
      } catch (err) {
        console.log('formatUnits Error', err);
      }
    }

    const arr = []
    // eslint-disable-next-line
    for (const [key, value] of Object.entries(balances)) {
      if (value?.balance && parseFloat(value?.balance) > 0) arr.push(value)
    }

    return Promise.resolve(arr)
  } catch (err) {
    console.log('getAllTokenBalances error', err)
    return Promise.reject(err)
  }
}
