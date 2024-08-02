"use client"
import { useColourContext } from "./ColourContext";
import { useState, useEffect } from "react";
import Link
    from "next/link";
interface ButtonProps {
    colour: string;
    symbol: string;
    hotkey?: string;
    onClickFunction: () => void;
    extraClasses?: string;
}
export default function Header() {
    const { colour, changeColour } = useColourContext();
    const [legacyButtonsNeeded, setLegacyButtonsNeeded] = useState(false)
    function updateUrl() {
        if (window.location.href.split('/').pop() == "spiraliser") {
            setLegacyButtonsNeeded(true)
        } else {
            setLegacyButtonsNeeded(false)
        }
    }
    useEffect(() => {
        updateUrl()
    }, [])


    // {window.location.href.split('/').pop()}
    const buttonClasses = "bg-black p-2 rounded-md hover:bg-gray-500"
    return (
        <section className={`bg-${colour}-500 flex gap-5 w-full justify-center p-2 z-10`} onClick={updateUrl}>
            {legacyButtonsNeeded ?
                (<>
                    <a href="/" className={buttonClasses}>Home</a>
                    <a href="/calculapp" className={buttonClasses}>Calculapp</a>
                    <a href="/spiraliser" className={buttonClasses}>Spiraliser</a>
                </>
                ) : (<>
                    <Link href="/" legacyBehavior>
                        <a href="/" className={buttonClasses}>Home</a>
                    </Link>
                    <Link href="/calculapp" legacyBehavior>
                        <a href="/" className={buttonClasses}>Calculapp</a>
                    </Link>
                    <Link href="/spiraliser" legacyBehavior>
                        <a href="/" className={buttonClasses}>Spiraliser</a>
                    </Link>
                </>
                )
            }
            <p className={`text-black p-2 bg-${colour}-400 cursor-pointer rounded-md hover:bg-${colour}-300`} onClick={changeColour}>Theme</p>
        </section>
    );
}

