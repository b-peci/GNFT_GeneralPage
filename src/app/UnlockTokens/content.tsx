'use client'
import React, { useEffect, useState } from "react";
import TokenAddress from "@/constants/Token/TokenAddress.json"
import TokenABI from "@/constants/Token/TokenABI.json"
import { useMoralis, useWeb3Contract } from "react-moralis";
import { iTokenData } from "../BasicTokenToGNFT/content";


const UnlockTokensContent = () => {
    const { Moralis } = useMoralis();
    const [tokenData, setTokenData] = useState<iTokenData[]>([]);
    useEffect(() => {
        Moralis.enableWeb3().then(() => {
            getHolderTokenIds().then(
            (res : any) => {
                console.log(res);
                res.forEach((element: number) => {
                    Moralis.executeFunction({
                        contractAddress: TokenAddress["5"][0],
                        abi: TokenABI,
                        functionName: "getTokenData",
                        params: {
                            tokenId: element.toString()
                        }
                    }).then((response: any) => {
                        setTokenData([...tokenData, response as iTokenData])
                    })
                });
            }
        ).catch((err : any) => console.log(err))
        })
    }, [])

    const { runContractFunction: getHolderTokenIds } = useWeb3Contract({
        abi: TokenABI,
        contractAddress: TokenAddress["5"][0],
        functionName: "getHolderTokenIds",
    });

    useEffect(() => {
       
    }, [])

    return (
        <div className="flex">
            {
                tokenData.map((item, index) =>
                    <div key={index} className="my-10 mx-5">
                        <div className="card w-96 bg-neutral text-neutral-content">
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Token {index + 1}</h2>
                                <p>Token URI: {item.tokenUri}</p>
                                <p>Token Functionality: {item.tokenFunctionality}</p>
                                <p>Is available {item.canBeSwaped.toString()}</p>
                                <button className="btn btn-error" onClick={() => {
                                      Moralis.executeFunction({
                                        contractAddress: TokenAddress["5"][0],
                                        abi: TokenABI,
                                        functionName: "disassembleToken",
                                        params: {
                                            tokenId: item.tokenId
                                        }
                                    })
                                }} >Unlock token</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}


export default UnlockTokensContent;