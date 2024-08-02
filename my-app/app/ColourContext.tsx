"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Colours array
const colours = ["green", "indigo", "orange", "pink"];

// Create a context with default values
const ColourContext = createContext({
    colour: "indigo",
    changeColour: () => { },
});

interface ColourProviderProps {
    children: ReactNode;
}

export function ColourProvider({ children }: ColourProviderProps) {
    const [colourIndex, setColourIndex] = useState(1);
    const [colour, setColour] = useState(colours[colourIndex]);

    useEffect(() => {
        setColour(colours[colourIndex]);
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
