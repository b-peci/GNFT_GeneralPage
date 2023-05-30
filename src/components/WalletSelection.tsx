import React from 'react';
import Image from 'next/image';

export interface walletListProps {
    imageSrc: string;
    name: string;
    onClickEvent: () => void;
}
export const WalletSelection = (props: walletListProps) => {
    return (
        <>
            <div
                onClick={props.onClickEvent}
                className="rounded-lg 
                 font-bold uppercase text-md m-2 p-4 flex cursor-pointer"
                style={{
                    background: "rgb(31, 41, 55)"
                }}
            >
                <Image src={props.imageSrc} alt='Image' width={30} />
                <p className='ml-2'>{props.name}</p>
            </div>
        </>
    );
};
