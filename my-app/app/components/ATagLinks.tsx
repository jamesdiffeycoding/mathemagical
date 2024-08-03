"use client";

import { useColourContext } from "../ColourContext";
import { useState, useEffect } from "react";
import Link from "next/link";

interface ButtonProps {
    colour: string;
    symbol: string;
    hotkey?: string;
    onClickFunction: () => void;
    extraClasses?: string;
}

export default function ATagLinks() {
    const { colour, changeColour } = useColourContext();



    const buttonClasses = `bg-${colour}-500 p-2 rounded-md hover:bg-${colour}-300 text-white`;

    return (
        <>
            <a href="/" className={buttonClasses}>Home</a>
            <a href="/calculapp" className={buttonClasses}>Calculapp</a>
            <a href="/spiraliser" className={buttonClasses}>Spiraliser</a>
            <a href="/create" className={buttonClasses}>Create</a>
            <a href="/blog" className="bg-yellow-200 text-black p-2 rounded-md hover:bg-gray-400">Blog</a>
            <p className={`text-black p-2 bg-${colour}-400 cursor-pointer rounded-md hover:bg-${colour}-300`} onClick={changeColour}>Theme</p>
        </>
    );
}
