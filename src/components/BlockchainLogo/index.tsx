import AvaxLogo from '../../assets/images/avax-logo.png'
import BSCLogo from '../../assets/images/binance-logo.png'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import HecoLogo from '../../assets/images/heco-icon.jpg'
import PolkadotLogo from '../../assets/images/polkadot-logo.png'
import PolygonLogo from '../../assets/images/polygon-logo.png'
import MoonriverLogo from '../../assets/images/crosschain/MOVR.png'
import React from 'react'
import styled from 'styled-components'

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
  margin-left: 5px;
  margin-right: 5px;
`

export default function BlockchainLogo({
  blockchain,
  size = '24px',
  style
}: {
  blockchain?: string
  size?: string
  style?: React.CSSProperties
}) {
  if (['Ethereum', 'ETH', 'Ether'].includes(String(blockchain))) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  }

  if (blockchain === 'Avalanche' || blockchain === 'AVAX') {
    return <StyledEthereumLogo src={AvaxLogo} size={size} style={style} />
  }

  if (blockchain === 'Polkadot' || blockchain === 'DOT') {
    return <StyledEthereumLogo src={PolkadotLogo} size={size} style={style} />
  }

  if (blockchain === 'Smart Chain' || blockchain === 'BNB' || blockchain === 'SmartChain') {
    return <StyledEthereumLogo src={BSCLogo} alt="BNB" size={size} style={style} />
  }

  if (blockchain === 'Moonbeam' || blockchain === 'DEV' || blockchain === 'MoonbeamAlpha') {
    return <StyledEthereumLogo src="" alt="DEV" size={size} style={style} />
  }

  if (blockchain === 'Mumbai' || blockchain === 'Polygon' || blockchain === 'Matic') {
    return <StyledEthereumLogo src={PolygonLogo} alt="MATIC" size={size} style={style} />
  }

  if (blockchain === 'HECO' || blockchain === 'heco') {
    return <StyledEthereumLogo src={HecoLogo} alt="HECO" size={size} style={style} />
  }

  if (blockchain === 'Moonriver') {
    return <StyledEthereumLogo src={MoonriverLogo} alt="HECO" size={size} style={style} />
  }
  return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
}
