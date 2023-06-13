import { useEffect, useState } from "react"
import Abi from "@/constants/Game/GameABI.json"
import Address from "@/constants/Game/GameAddress.json"
import { MoralisProvider, useMoralis, useWeb3Contract } from 'react-moralis';
import { NotificationProvider, useNotification } from 'web3uikit';

const CreateGame = () => {
    const {Moralis} = useMoralis();
    const dispatch = useNotification();
    const [gameName, setGameName] = useState('');

    useEffect(() => {
        Moralis.enableWeb3();
    }, [])
    
    const { runContractFunction: createGame } = useWeb3Contract({
        abi: Abi,
        contractAddress: Address["5"][0],
        functionName: "createGame",
        params: {
            _name: gameName
        },
    });

    const handleClick = async () => {
        await createGame({
            onSuccess: handleSuccess,
            onError: err => console.log(err)
        })
    }

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
    return (
        <>
            <div className="mt-2">
                <label className="p-2">Game Name</label>
                <input value={gameName} name="gameName"  onChange={e => setGameName(e.target.value)} type="text" className="rounded-sm text-black" />
                <button onClick={handleClick} className='bg-blue-500 self-center text-wheat p-1 rounded-lg m-2 font-bold w-40'>Create</button>
            </div>

        </>
    )
}


export default CreateGame