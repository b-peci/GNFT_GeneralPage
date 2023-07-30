import React, { useEffect, useState } from "react"
import GameABI from "@/constants/Game/GameABI.json"
import GameAddress from "@/constants/Game/GameAddress.json"
import TokenAddress from "@/constants/Token/TokenAddress.json"
import TokenABI from "@/constants/Token/TokenABI.json"
import { MoralisProvider, useMoralis, useWeb3Contract } from 'react-moralis';
import { NotificationProvider, useNotification } from 'web3uikit';
import { ethers } from "ethers"

const CreateToken = () => {
    const [tokenURI, setTokenURI] = useState<string>();
    const [fireReq, setFireReq] = useState<number>(0);
    const [windReq, setWindReq] = useState(0)
    const [earthReq, setEarthReq] = useState(0)
    const [waterReq, setWaterReq] = useState(0)
    const [userGames, setUserGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState('');
    const [tokenFunctionality, setTokenFunctionality] = useState('')

    const { Moralis } = useMoralis();
    const dispatch = useNotification();

    useEffect(() => {
        Moralis.enableWeb3().then(() => {
            getOwnersGame({
                onSuccess: res => {
                    setUserGames(res);
                },
                onError: err => console.log(err)
            })
        })

    }, [])

    useEffect(() => {
        console.log(selectedGame)
    }, [selectedGame])

    const { runContractFunction: getOwnersGame } = useWeb3Contract({
        abi: GameABI,
        contractAddress: GameAddress["5"][0],
        functionName: "getOwnersGame",
    });
    const { runContractFunction: addGameTokenToGame } = useWeb3Contract({
        abi: GameABI,
        contractAddress: GameAddress["5"][0],
        functionName: "addGameTokenToGame",
        params: {
            _gameName: selectedGame,

        }
    });
    const { runContractFunction: createGameNFT } = useWeb3Contract({
        abi: TokenABI,
        contractAddress: TokenAddress["5"][0],
        functionName: "createGameNFT",
        params: {
            _tokenURI: tokenURI,
            _tokenReq: {
                FireReq: fireReq,
                WaterReq: waterReq,
                EarthReq: earthReq,
                WindReq: windReq
            },
            _tokenFunctionality: tokenFunctionality
        }
    });
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
    const createToken = () => {
        createGameNFT({
            onSuccess: async (transaction : any) => {
                const tx = await transaction.wait(1)
                console.log(tx.events); 
                Moralis.executeFunction({
                    contractAddress: GameAddress["5"][0],
                    abi: GameABI,
                    functionName: "addGameTokenToGame",
                    params: {
                        _gameName: selectedGame,
                        tokenId: parseInt(tx.events[1].data)
                    }
                }).then(response => {
                    handleSuccess(response);
                }).catch(err => console.log(err))
            },
            onError: err => console.log(err)
        })
    }

    return (
        <>
            <div className="mt-2">
                <label className="p-2"> Token URI</label>
                <input onChange={e => setTokenURI(e.target.value)} type="text" className="input input-bordered w-full max-w-xs ml-2" />
            </div>
            <div className="mt-2">
                <label className="p-2"> Token Functionality</label>
                <input onChange={e => setTokenFunctionality(e.target.value)} type="text" className="input input-bordered w-full max-w-xs ml-2" />
            </div>
            <div className="mt-2">
                <label className="p-2">Fire Req: </label>
                <input onChange={e => setFireReq(parseInt(e.target.value))} type="number" className="input input-bordered w-full max-w-xs ml-2" />
            </div>
            <div className="mt-2">
                <label className="p-2">Water Req: </label>
                <input onChange={e => setWaterReq(parseInt(e.target.value))} type="number" className="input input-bordered w-full max-w-xs ml-2" />
            </div>
            <div className="mt-2">
                <label className="p-2">Earth Req: </label>
                <input onChange={e => setEarthReq(parseInt(e.target.value))} type="number" className="input input-bordered w-full max-w-xs ml-2" />
            </div>
            <div className="mt-2">
                <label className="p-2">Wind Req: </label>
                <input onChange={e => setWindReq(parseInt(e.target.value))} type="number" className="input input-bordered w-full max-w-xs ml-2" />
            </div>
            <div className="mt-2">
                <label className="p-2">Game</label>
                <select className="text-black w-36" onChange={e => setSelectedGame(e.target.value)}>
                    <option>Select game</option>
                    {userGames.map(item => <option key={item} value={item}>{item}</option>)}
                </select>
            </div>
            <button onClick={createToken} className='bg-blue-500 self-center text-wheat p-1 rounded-lg m-2 font-bold w-40'>Create</button>
        </>
    )
}

export default CreateToken;