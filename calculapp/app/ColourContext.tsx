"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Colours array
const colours = ["lime", "indigo", "orange", "pink"];

// Create a context with default values
const ColourContext = createContext({
    colour: "indigo",
    changeColour: () => { },
});

interface ColourProviderProps {
    children: ReactNode;
}

export function ColourProvider({ children }: ColourProviderProps) {
    const [colourIndex, setColourIndex] = useState<number>(() => {
        // Only access localStorage on the client side
        if (typeof window !== 'undefined') {
            const savedIndex = localStorage.getItem('colourIndex');
            return savedIndex ? parseInt(savedIndex) : 1;
        }
        return 1; // Default to index 1 if not in the browser
    });
    const [colour, setColour] = useState(colours[colourIndex]);

    useEffect(() => {
        // Access localStorage only on the client side
        if (typeof window !== 'undefined') {
            setColour(colours[colourIndex]);
            localStorage.setItem('colourIndex', colourIndex.toString());
        }
    }, [colourIndex]);

    const changeColour = () => {
        setColourIndex((prevIndex) => (prevIndex + 1) % colours.length);
    };

    return (
        <ColourContext.Provider value={{ colour, changeColour }}>
            {children}
        </ColourContext.Provider>
    );
}

// Custom hook to use the ColourContext
export function useColourContext() {
    return useContext(ColourContext);
}
