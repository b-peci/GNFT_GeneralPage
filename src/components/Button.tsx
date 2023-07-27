import React from "react"

interface iButtonProps {
    text: string,
    onClick: () => {};
}

export const PrimaryButton = (props: iButtonProps) => {
    return (
        <button onClick={props.onClick}
         className="bg-blue-500 text-wheat p-1  rounded-lg m-2 font-bold">
            {props.text}
        </button>
    )
}

