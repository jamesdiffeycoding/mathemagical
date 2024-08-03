"use client";

import { useColourContext } from "../ColourContext";
import Link from "next/link";

interface ButtonProps {
    colour: string;
    symbol: string;
    hotkey?: string;
    onClickFunction: () => void;
    extraClasses?: string;
}

export default function ReactLinks() {
    const { colour, changeColour } = useColourContext();



    const buttonClasses = `bg-${colour}-500 p-2 rounded-md hover:bg-${colour}-300 text-white`;

    return (
        <>
            <Link href="/" legacyBehavior>
                <a className={buttonClasses}>Home</a>
            </Link>
            <Link href="/calculapp" legacyBehavior>
                <a className={buttonClasses}>Calculapp</a>
            </Link>
            <Link href="/spiraliser" legacyBehavior>
                <a className={buttonClasses}>Spiraliser</a>
            </Link>
            <Link href="/create" legacyBehavior>
                <a className={buttonClasses}>Create</a>
            </Link>
            <Link href="/blog" legacyBehavior>
                <a className="bg-yellow-200 text-black p-2 rounded-md hover:bg-gray-400">Blog</a>
            </Link>

            <p className={`text-black p-2 bg-${colour}-400 cursor-pointer rounded-md hover:bg-${colour}-300`} onClick={changeColour}>Theme</p>

        </>
    );
}
