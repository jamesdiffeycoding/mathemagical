"use client"

interface ButtonProps {
    colour: string;
    symbol: string;
    hotkey?: string;
    onClickFunction: () => void;
    extraClasses?: string;
}


export default function ButtonComponent({ colour, symbol, hotkey, onClickFunction, extraClasses }: ButtonProps) {


    return (
        <div
            id={symbol}
            className={`flex relative border rounded-md pt-4 pb-4 border-${colour}-300 hover:bg-${colour}-300 ${extraClasses}`}
            onClick={() => onClickFunction()}
        >
            <button className="absolute w-full">{symbol}</button>
            <span className="absolute bottom-1 right-1 text-sm whitespace-nowrap">{hotkey}</span>
        </div>
    );
}

