"use client"
import React, { useEffect, useState } from 'react';
import PinataClient from '@pinata/sdk';
import Image from 'next/image'
import { InterfaceAbi, JsonFragment, ethers } from 'ethers';
import BasicGNFTAddress from "../../constants/BasicGNFT/BasicGNFTAddress.json"
import BasicGNFTABI from "../../constants/BasicGNFT/BasicGNFTABI.json"
import { MoralisProvider, useMoralis, useWeb3Contract } from 'react-moralis';
import { NotificationProvider, useNotification } from 'web3uikit';

const MintToken = () => {
    const [selectedNFT, setSelectedNFT] = useState('');
    const {Moralis} = useMoralis();
    const mintNft = async () => {
        await mintBasicToken({
            onSuccess: handleSuccess,
            onError: error => console.log(error)
        })
    }
    useEffect(() => {
        Moralis.enableWeb3()
    },[])
    const dispatch = useNotification();

   
    const handleSuccess = async (tx: any) => {
        await tx.wait(1);
        handleNewNotification(tx);
    }

    const handleNewNotification = (tx: any) => {
        dispatch({
            type: "info",
            message: "Transaction compleate!",
            title: "Tx notification",
            position: "topR",
        })
    }


    const { runContractFunction: mintBasicToken } = useWeb3Contract({
        abi: BasicGNFTABI,
        contractAddress: BasicGNFTAddress["5"][0],
        functionName: "createToken",
        params: {
            _type: '0',
            _tokenURI: "Some URIIIIII"
        },
    });
    return (
        <>
            <div className='flex justify-center items-center  h-[92vh]'>
                <div>
                    <Image className={(selectedNFT === "fire" ? "border rounded-2xl border-red-400 " : "") + 'm-3 cursor-pointer'} onClick={() => setSelectedNFT('fire')} width={200} height={200} src={"https://ipfs.io/ipfs/QmQEPXdRRfBtWn3mdvd8txMRDPZ4mxR7vv43eV8XMfDw1S?filename=Fire.svg"} alt='Fire' />
                    <Image className={(selectedNFT === "wind" ? "border rounded-2xl border-red-400 " : "") + 'm-3 cursor-pointer'} onClick={() => setSelectedNFT('wind')} width={200} height={200} src={"https://ipfs.io/ipfs/QmaNhQZTHm8DAmruTXetby4zPmYG1rBgeD9uQXXkgEPjMn?filename=Wind.svg"} alt='Wind' />
                </div>
                <div>
                    <Image className={(selectedNFT === "water" ? "border rounded-2xl border-red-400 " : "") + 'm-3 cursor-pointer'} onClick={() => setSelectedNFT('water')} width={200} height={200} src={"https://ipfs.io/ipfs/QmX4BGC8Stmo9uH3N5xLQDMkZ44X9sGYbWyqtC53PgSKe9?filename=Water.svg"} alt='Water' />
                    <Image className={(selectedNFT === "earth" ? "border rounded-2xl border-red-400 " : "") + 'm-3 cursor-pointer'} onClick={() => setSelectedNFT('earth')} width={200} height={200} src={"https://ipfs.io/ipfs/Qma5ijUkg72aV4SKxpzmn8N6m77gGTownTzgxCBEFMhApb?filename=Earth.svg"} alt='Earth' />
                </div>
            </div>
            <div className='flex justify-center'>
                <button onClick={mintNft} className={(selectedNFT ? "" : "disabled cursor-not-allowed ") + 'bg-blue-500  self-center text-wheat p-2 rounded-lg font-bold w-40'}>Mint</button>
            </div>
        </>

    )
}

export default MintToken