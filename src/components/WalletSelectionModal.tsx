import React from 'react'
import MetaMaskImage from "../../public/metamask.svg"
import CoinbaseWalletImage from "../../public/coinbase-wallet-logo.svg"
import WalletConnectionLogo from "../../public/wallet-connect-Logo.svg"
import { WalletSelection } from './WalletSelection'

interface walletSelectionModalProps {
    closeFunctionality: () => void;
    metaMaskSelected: () => void;
    walletConnectSelected: () => void;
    coinbaseWalletSelected: () => void;
}

const WalletSelectionModal = (props : walletSelectionModalProps) => {
    return (
        <div className='flex-col h-80 w-96 justify-center rounded-lg m-auto z-50'
            style={{
                border: "4px solid rgb(31, 41, 55)",
                position: 'absolute',
                left: '40%',
                top: '5%'
            }}>
            <div className='m-1 p-2'
            >
                <div className='flex justify-between'>
                    <h1 className='text-2xl text-center p-4'>Connect wallet</h1>
                    <button onClick={props.closeFunctionality} className='mr-2'>✖</button>
                </div>
                <WalletSelection onClickEvent={props.metaMaskSelected} name={"MetaMask"} imageSrc={MetaMaskImage} />
                <WalletSelection onClickEvent={props.walletConnectSelected} name={"Wallet Connect"} imageSrc={WalletConnectionLogo} />
                <WalletSelection onClickEvent={props.coinbaseWalletSelected} name={"Coinbase Wallet"} imageSrc={CoinbaseWalletImage} />
            </div>
        </div>
    )
}

export default WalletSelectionModal;