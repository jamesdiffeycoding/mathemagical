// IMPORTS -------------------------------------------------------------------------------------------------------- 
import { useState, useEffect, useRef } from 'react';
import { coloursArray } from '../rainbowRGBvalues';
import Link from 'next/link';
import { useColourContext } from '../ColourContext';

// COMPONENT -------------------------------------------------------------------------------------------------------- 
export default function CanvasCreate() {
    const { colour, changeColour } = useColourContext();

    // THETA
    const [theta, setTheta] = useState(0.4);
    const [thetaIncrement, setThetaIncrement] = useState(0.0008);
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

    const [x1Mod, setX1Mod] = useState(1)
    const [x2Mod, setX2Mod] = useState(1)
    const [x3Mod, setX3Mod] = useState(1)
    const [y1Mod, setY1Mod] = useState(-1)
    const [y2Mod, setY2Mod] = useState(-1)
    const [y3Mod, setY3Mod] = useState(-1)

    function tweakParameterByPointTwo(value: number, direction: string) {
        if (direction == "increase") {
            value += 0.2;
            if (value >= 2) {
                value = 2;
            }
        }
        if (direction == "decrease") {
            value -= 0.2;
            if (value <= -2) {
                value = -2;
            }
        }
        return value;

    }
    // ... FUNCTION
    // SCALAR MODIFICATION FUNCTION
    function handleCoefficientTweak(coefficient: string, direction: string) {
        handleRestartAnimation()

        switch (coefficient) {
            case "x1": setX1Mod(tweakParameterByPointTwo(x1Mod, direction)); break;
            case "x2": setX2Mod(tweakParameterByPointTwo(x2Mod, direction)); break;
            case "x3": setX3Mod(tweakParameterByPointTwo(x3Mod, direction)); break;
            case "y1": setY1Mod(tweakParameterByPointTwo(y1Mod, direction)); break;
            case "y2": setY2Mod(tweakParameterByPointTwo(y2Mod, direction)); break;
            case "y3": setY3Mod(tweakParameterByPointTwo(y3Mod, direction)); break;
            default: console.log("Invalid coefficient passed to handleCoefficientTweak"); break;
        }
    }
    function handleResetToDefaults() {
        setThetaIncrement(0.002);
        setColorIndex(0);
        setRainbowMode(true);
        setColorCount(0);
        setX1Mod(1)
        setX2Mod(0)
        setX3Mod(0)
        setY1Mod(1)
        setY2Mod(0)
        setY3Mod(0)
        handleRestartAnimation()
    }

    // ... STATE MANAGEMENT
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)




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
            const realPart = x1Mod * (Math.sin(theta)) + x2Mod * (Math.cos(theta)) + x3Mod * (Math.sin(Math.PI * theta))
            const imagPart = y1Mod * (Math.sin(theta)) + y2Mod * (Math.cos(theta)) + y3Mod * (Math.cos(Math.PI * theta))
            setX(centerX + realPart * 50)
            setY(centerY + imagPart * 50)

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
    }, [colorCount, colorIndex, rainbowMode, theta, thetaIncrement, graphColor, handleTheta, handleThetaIncrement, x1Mod, x2Mod, x3Mod, y1Mod, y2Mod, y3Mod]);


    const buttonValues = [
        0.000002, 0.0001, 0.0008,
        0.002, 0.008
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

            {/* SECTION 1 */}
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

            {/* SECTION 2 */}
            <section className="flex gap-2 p-1">
                <input type="color" onChange={(event) => handleColourChange((event.currentTarget as HTMLInputElement).value)} />
                <button className="bg-white hover:bg-gray-400 gap-300 border-2 border-gray-400 rounded-md pl-2 pr-2" onClick={() => toggleRainbowMode()}>{rainbowMode ? ("Rainbow off") : ("Rainbow on")}</button>
                <button className="bg-white hover:bg-gray-400 gap-300 border-2 border-gray-400 rounded-md pl-2 pr-2" onClick={handleRestartAnimation}>Restart</button>
            </section>
            {/* <hr></hr> */}



            {/* EQUATIONS */}
            {/* X- */}
            <section className="text-xs p-1 border rounded-md">
                <span className="text-[14px] font-bold p-2">X = </span>
                <span className={`text-${colour}-700 font-bold`}>
                    <button className={`bg-${colour}-500 text-white ml-1 mr-1 hover:bg-gray-400 w-5 border-1 border-gray-400 rounded-md pl-1 pr-1`} onClick={() => handleCoefficientTweak("x1", "decrease")}>-</button>
                    {x1Mod.toFixed(1)}
                    <button className={`bg-${colour}-500 text-white ml-1 mr-1 hover:bg-gray-400 w-5 border-1 border-gray-400 rounded-md pl-1 pr-1`} onClick={() => handleCoefficientTweak("x1", "increase")}>+</button>
                </span>
                sin(θ)
                {x2Mod >= 0 ? ' + ' : ' - '}
                <span className={`text-${colour}-700 font-bold`}>
                    <button className={`bg-${colour}-500 text-white ml-1 mr-1 hover:bg-gray-400 w-5 border-1 border-gray-400 rounded-md pl-1 pr-1`} onClick={() => handleCoefficientTweak("x2", "decrease")}>-</button>
                    {Math.abs(x2Mod).toFixed(1)}
                    <button className={`bg-${colour}-500 text-white ml-1 mr-1 hover:bg-gray-400 w-5 border-1 border-gray-400 rounded-md pl-1 pr-1`} onClick={() => handleCoefficientTweak("x2", "increase")}>+</button>
                </span>
                cos(θ)
                {x3Mod >= 0 ? ' + ' : ' - '}
                <span className={`text-${colour}-700 font-bold`}>
                    <button className={`bg-${colour}-500 text-white ml-1 mr-1 hover:bg-gray-400 w-5 border-1 border-gray-400 rounded-md pl-1 pr-1`} onClick={() => handleCoefficientTweak("x3", "decrease")}>-</button>
                    {Math.abs(x3Mod).toFixed(1)}
                    <button className={`bg-${colour}-500 text-white ml-1 mr-1 hover:bg-gray-400 w-5 border-1 border-gray-400 rounded-md pl-1 pr-1`} onClick={() => handleCoefficientTweak("x3", "increase")}>+</button>
                </span>
                sin(π * θ)
            </section>
            {/* Y- */}

            <section className="text-xs p-1 border rounded-md">
                <p>
                    <span className="text-[14px] font-bold p-2 text-left">Y = </span>
                    <span className={`text-${colour}-700 font-bold`}>
                        <button className={`bg-${colour}-500 text-white ml-1 mr-1 hover:bg-gray-400 w-5 border-1 border-gray-400 rounded-md pl-1 pr-1`} onClick={() => handleCoefficientTweak("y1", "decrease")}>-</button>
                        {y1Mod.toFixed(1)}
                        <button className={`bg-${colour}-500 text-white ml-1 mr-1 hover:bg-gray-400 w-5 border-1 border-gray-400 rounded-md pl-1 pr-1`} onClick={() => handleCoefficientTweak("y1", "increase")}>+</button>
                    </span>
                    sin(θ)
                    {y2Mod >= 0 ? ' + ' : ' - '}
                    <span className={`text-${colour}-700 font-bold`}>
                        <button className={`bg-${colour}-500 text-white ml-1 mr-1 hover:bg-gray-400 w-5 border-1 border-gray-400 rounded-md pl-1 pr-1`} onClick={() => handleCoefficientTweak("y2", "decrease")}>-</button>
                        {Math.abs(y2Mod).toFixed(1)}
                        <button className={`bg-${colour}-500 text-white ml-1 mr-1 hover:bg-gray-400 w-5 border-1 border-gray-400 rounded-md pl-1 pr-1`} onClick={() => handleCoefficientTweak("y2", "increase")}>+</button>
                    </span>
                    cos(θ)
                    {y3Mod >= 0 ? ' + ' : ' - '}
                    <span className={`text-${colour}-700 font-bold`}>
                        <button className={`bg-${colour}-500 text-white ml-1 mr-1 hover:bg-gray-400 w-5 border-1 border-gray-400 rounded-md pl-1 pr-1`} onClick={() => handleCoefficientTweak("y3", "decrease")}>-</button>
                        {Math.abs(y3Mod).toFixed(1)}
                        <button className={`bg-${colour}-500 text-white ml-1 mr-1 hover:bg-gray-400 w-5 border-1 border-gray-400 rounded-md pl-1 pr-1`} onClick={() => handleCoefficientTweak("y3", "increase")}>+</button>
                    </span>
                    cos(π * θ)
                </p>
            </section>
            <div className="p-2">
                <button className={`bg-${colour}-500 text-white ml-1 mr-1 hover:bg-gray-400 border-1 border-gray-400 rounded-md pl-1 pr-1`} onClick={handleResetToDefaults}>Reset coefficients</button>
            </div>

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
            <div className="grid grid-cols-3 text-left">
                <div>
                    Theta: {(theta).toFixed(0)}
                </div>
                <div>
                    x: {(x - 175).toFixed(0)}

                </div>
                <div>
                    y = {(y - 175).toFixed(0)}
                </div>

            </div>
        </>
    );
}