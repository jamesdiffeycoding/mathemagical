"use client";

import { useColourContext } from "../ColourContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import ATagLinks from "./ATagLinks";
import ReactLinks from "./ReactLinks";
interface ButtonProps {
    colour: string;
    symbol: string;
    hotkey?: string;
    onClickFunction: () => void;
    extraClasses?: string;
}

export default function Header() {
    const { colour, changeColour } = useColourContext();
    const [aTagsNeeded, setATagsNeeded] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility

    function updateUrl() {
        const currentPage = window.location.href.split('/').pop();
        if (currentPage === "spiraliser" || currentPage === "create") {
            setATagsNeeded(true);
        } else {
            setATagsNeeded(false);
        }
    }

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const buttonClasses = "bg-black p-2 rounded-md hover:bg-gray-400 text-white";

    const handlePopupToggle = () => {
        setIsPopupVisible(prev => !prev);
    };

    useEffect(() => {
        updateUrl();
    }, []);

    const handlePopupClose = () => {
        setIsPopupVisible(false);
    };

    return (
        <>
            {windowWidth >= 600 ? (
                // large screen sizes display the banner ------------------------------------
                aTagsNeeded ? (
                    <section className={`bg-${colour}-500 flex gap-5 w-full justify-center p-2 z-10`} onClick={updateUrl}>
                        <ATagLinks></ATagLinks>
                    </section>
                ) : (
                    <section className={`bg-${colour}-500 flex gap-5 w-full justify-center p-2 z-10`} onClick={updateUrl}>
                        <ReactLinks></ReactLinks>
                    </section>
                )
            ) : (
                // small screen sizes display a popup  ------------------------------------
                <>
                    <div className={`bg-${colour}-500 flex flex-col gap-5 w-full justify-center`}>
                        <button onClick={handlePopupToggle} className="p-2 rounded-md text-white">
                            {/* Hamburger Icon SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                            </svg>
                        </button>
                    </div>

                    {isPopupVisible && (
                        <section className={`bg-${colour}-500 flex flex-col gap-5 w-full justify-center p-4 z-10 absolute top-0 left-0`} onClick={updateUrl}>
                            {aTagsNeeded ? (
                                <ATagLinks></ATagLinks>
                            ) : (
                                <ReactLinks></ReactLinks>
                            )}
                            <div className="flex justify-center">

                                <button onClick={handlePopupClose} className="p-2 bg-red-500 rounded-md text-white">
                                    {/* Close Icon SVG */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 10.293l5.293-5.293a1 1 0 0 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 1.414-1.414L12 10.293z" />
                                    </svg>
                                </button>
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    );
}
