// IMPORTS -------------------------------------------------------------------------------------------------------- 
import { useState, useEffect, useRef } from 'react';
import { coloursArray } from '../rainbowRGBvalues';
import Link from 'next/link';
// COMPONENT -------------------------------------------------------------------------------------------------------- 
export default function CanvasSpiral() {
    // THETA
    const [theta, setTheta] = useState(0.4);
    const [thetaIncrement, setThetaIncrement] = useState(0.001);
    function handleTheta() {
        setTheta(prev => prev + thetaIncrement)
    }
    function handleThetaIncrement(newIncrement: number) {
        setThetaIncrement(newIncrement);
    }

    const canvasRef = useRef(null)

    // (2) COLOURS -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
    // ... STATE MANAGEMENT
    const [graphColor, setGraphColor] = useState('#ffffff');
    const [rainbowMode, setRainbowMode] = useState(true);
    const [colorIndex, setColorIndex] = useState(0);
    const [colorCount, setColorCount] = useState(0);


    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - 
    // 🔗 ⭐ USE EFFECT - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(() => {
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        // (1) CANVAS REFERENCE 
        const canvas = canvasRef.current; //@ts-expect-error canvas will be defined
        const ctx = canvas.getContext('2d');
        // (3) ADJUSTING CANVAS WIDTH AND HEIGHT
        // (4) UPDATING CENTER POINT VALUES ON GRAPH
        //@ts-expect-error canvas will be defined
        const centerX = canvas.width / 2;
        //@ts-expect-error canvas will be defined
        const centerY = canvas.height / 2;
        // DRAW NEXT FRAME FUNCTION
        let animationFrameId: number;
        function drawNextFrame() {
            // ⭐ UNIQUE EQUATIONS
            const x = centerX + 80 * (Math.cos(theta) + Math.cos(Math.PI * theta))
            const y = centerY + 80 * (Math.sin(theta) + Math.sin(Math.PI * theta))
            // INCREMENT THETA VALUE
            handleTheta()

            // LINE COLOURS
            // (1) CHANGE COLOUR STATE FOR RAINBOW MODE
            // logic: index increases every 20 refreshes
            if (rainbowMode) {
                const newColour = `rgb(${coloursArray[colorIndex][0]}, ${coloursArray[colorIndex][1]}, ${coloursArray[colorIndex][2]})`
                setGraphColor(newColour);
                if (colorCount == 20) {
                    setColorCount(0);
                    if (colorIndex != coloursArray.length - 1) {
                        setColorIndex(colorIndex + 1)
                    }
                    else { setColorIndex(0); }
                } else { setColorCount(colorCount + 1) }
            }
            // (2) SPECIFY CHOSEN COLOUR AND DRAW LINE
            ctx.fillStyle = graphColor
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x, y, 0.4 /* line thickness */, 0, 2 * Math.PI);
        }
        drawNextFrame();
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [colorCount, colorIndex, rainbowMode, theta, thetaIncrement, graphColor, handleTheta, handleThetaIncrement]);


    const buttonValues = [
        0.0001, 0.0005, 0.001,
        0.0011, 0.004
    ];


    function resetColourToWhite() {
        setGraphColor('#ffffff')
    }
    function toggleRainbowMode() {
        if (rainbowMode) {
            setRainbowMode(false)
            resetColourToWhite()
        } else {
            setRainbowMode(true)
        }
    }
    function handleRestartAnimation() {
        const canvas = canvasRef.current;
        //@ts-expect-error canvas will be defined
        const ctx = canvas.getContext('2d');
        // Clear the entire canvas
        //@ts-expect-error canvas will be defined
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Reset theta to start the animation over
        setTheta(0);
    }
    function handleColourChange(value: string) {
        setGraphColor(value)
        setRainbowMode(false)
    }

    return (
        <>
            <section className="flex gap-2 p-1">
                <span>Speed: </span>
                {buttonValues.map((value, index) => (
                    <button
                        key={index}
                        className="bg-white hover:bg-gray-400 gap-300 border-2 border-gray-400 rounded-md pl-2 pr-2"
                        onClick={() => handleThetaIncrement(value)}
                    >
                        {index + 1}
                    </button>
                ))}
            </section>
            <section className="flex gap-2 p-1">
                <input type="color" onChange={(event) => handleColourChange((event.currentTarget as HTMLInputElement).value)} />
                <button className="bg-white hover:bg-gray-400 gap-300 border-2 border-gray-400 rounded-md pl-2 pr-2" onClick={() => toggleRainbowMode()}>{rainbowMode ? ("Rainbow off") : ("Rainbow on")}</button>
                <button className="bg-white hover:bg-gray-400 gap-300 border-2 border-gray-400 rounded-md pl-2 pr-2" onClick={handleRestartAnimation}>Restart</button>
            </section>

            <canvas
                ref={canvasRef}
                className="graph-canvas border-4 border-white"
                width="350px"
                height="350px"
                style={{
                    backgroundColor: "black",
                    pointerEvents: "none"
                }}
            >
            </canvas>
        </>
    );
}