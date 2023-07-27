'use client'

import { useEffect, useState } from "react";
import { PrimaryButton } from "../../components/Button"
import { useMoralis, useWeb3Contract } from 'react-moralis';
import GameContractAbi from "@/constants/Game/GameABI.json"
import GameContractAddress from "@/constants/Game/GameAddress.json"
import TokenAddress from "@/constants/Token/TokenAddress.json"
import TokenABI from "@/constants/Token/TokenABI.json"

const ConvertBasicTokenToGNFT = () => {
    const [gameTokens, setGameTokens] = useState<Array<object>>([]);
    const [gameName, setGameName] = useState('');
    const { Moralis } = useMoralis();


    useEffect(() => {
        Moralis.enableWeb3();
    }, [])

    const { runContractFunction: getGameTokens } = useWeb3Contract({
        abi: GameContractAbi,
        contractAddress: GameContractAddress["5"][0],
        functionName: "getGameTokens",
        params: {
            _name: gameName
        },
    });


    const btnClickHandler = async () => {
        getGameTokens().then((res : any) => {
            res.forEach((element: any) => {
                Moralis.executeFunction({
                    contractAddress: TokenAddress["5"][0],
                    abi: TokenABI,
                    functionName: "getTokenData",
                    params: {
                        tokenId: element.toString()
                    }
                }).then(response => {
                    setGameTokens([...gameTokens, response]);
                    console.log(response)
                }).catch(err => console.log(err))
            });
            console.log(res)
        }).catch(err => {
            console.error(err);
        })
    }


    return (
        <>
            <input type="text" placeholder="Name of the Game"
             className="input input-bordered w-full max-w-xs ml-2"
             onChange={e => {
                setGameName(e.target.value)
            }} />
            <button className="btn btn-primary ml-2"
             onClick={btnClickHandler}>Search</button>
             <div className="flex">
             {
                gameTokens.map((item, index) =>
                    <div key={index} className="my-10 mx-5">
                        <div className="card w-96 bg-neutral text-neutral-content">
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Token {index + 1}</h2>
                                <p>Token URI: {item.tokenUri}</p>
                                <p>Token Functionality: {item.tokenFunctionality}</p>
                                <p>Is available {item.canBeSwaped.toString()}</p>
                                <button className="btn btn-accent">Swap</button>
                            </div>
                        </div>
                    </div>)
            }
             </div>
            
        </>
    )
}

export default ConvertBasicTokenToGNFT;