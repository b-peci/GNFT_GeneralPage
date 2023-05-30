"use client"
import Image from 'next/image'
import { ethers } from "ethers"
import { useEffect, useState } from 'react'
import WalletSelectionModal from './WalletSelectionModal'
export default function Home() {
  const [accountAddress, setAccountAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let ethereum, provider;

  useEffect(() => {
    // @ts-ignore
    ethereum = window.ethereum;
    if (!ethereum) return;
    // @ts-ignore
    provider = new ethers.BrowserProvider(window.ethereum)
    // @ts-ignore
    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccountAddress(accounts[0])
    })
  }, [])

  const connectWallet = async () => {
    try {
      const accounts = await getAccounts();
      if (accounts.length > 0) {
        setAccountAddress(accounts[0])
        setIsConnected(true)
        localStorage.setItem("isConnected", "true");
        setShowModal(false)
      }
      setIsConnected(localStorage.getItem("isConnected") === "true");
    }
    catch (err: any) {
      if (err.code === 4001) {
        alert("Please connect wallet in order to user our application")
      }
      console.log(err)
    }
  }

  const handleButtonClick = async () => {
    if (isConnected) return;
    setShowModal(true);
  }


  const getAccounts = async () => {
    // @ts-ignore
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    return accounts;
  }

  return (
    <>
      <div className='flex justify-end' >
        <button onClick={handleButtonClick} className={"bg-blue-500 text-wheat " + (isConnected && accountAddress ? "w-80" : "w-40") + " p-1 rounded-lg m-2 font-bold"}> {isConnected && accountAddress ? accountAddress.substring(0, 11) + "..." + accountAddress.substring(30, 41) : "Connect"} </button>
      </div>
      {showModal &&
        <WalletSelectionModal
          closeFunctionality={() => setShowModal(false)}
          metaMaskSelected={async () => await connectWallet()}
          walletConnectSelected={() => alert("Wallet connect selected")}
          coinbaseWalletSelected={() => alert('Coinbase wallet selected')}
        />
      }

    </>

  )
}
