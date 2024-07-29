import { useState, useEffect } from 'react';

const colours = ["lime", "indigo", "orange", "pink"];

function useColour() {
    const [colourIndex, setColourIndex] = useState(Math.floor(Math.random() * colours.length));
    const [colour, setColour] = useState(colours[colourIndex]);

    useEffect(() => {
        setColour(colours[colourIndex]);
    }, [colourIndex]);

    const changeColour = () => {
        setColourIndex((prevIndex) => (prevIndex + 1) % colours.length);
    };

    return { colour, changeColour };
}

export default useColour