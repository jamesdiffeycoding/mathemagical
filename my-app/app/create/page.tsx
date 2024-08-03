"use client"
import CanvasCustom from "./CanvasCreate"
import { useColourContext } from "../ColourContext";

// ---- solar power button?
// ---- bug report button?

export default function Spiraliser() {
    /* ---------------------------- COLOUR THEME -----------------------------------------------------------*/
    const { colour, changeColour } = useColourContext();



    return (
        // OUTER CONTAINER >> CONTENT CONTAINER >> CONTENT
        <section className={`flex-1 pattern-${colour}-500 pattern-paper pattern-bg-white pattern-size-6 pattern-opacity-100 flex flex-col`}>
            <section className={`flex-1 w-full flex items-center justify-center`}>
                <section className={`w-5/6 max-w-[450px] border-${colour}-600 border-4 rounded-xl text-[25px] bg-gray-400` /* bg-gray-400 is in case the colour theme class doesn't compile */}>
                    {/* TOP --- MIDDLE --- BOTTOM BOXES */}
                    <section className={`bg-${colour}-300 text-black rounded-lg min-h-[185px] flex flex-col justify-between rounded-b-none w-full text-center`}>
                        {/* ____ TOP */}
                        <div className={`font-bold bg-${colour}-500 w-full rounded-t-lg p-3`}>
                            <h1 className="text-white opacity-90 text-[30px] italic">Create</h1>
                        </div>

                        {/* ____ MIDDLE */}
                        <section className="flex flex-col justify-center items-center p-2 text-sm">
                            <CanvasCustom></CanvasCustom>
                        </section>

                        {/* ____ BOTTOM */}
                        <section className={`text-left bg-white opacity-75 border-t-4 border-${colour}-500 text-black rounded-lg text-xs p-3`}>
                            <p className="">Create your own animated equations my manipulating the equations above. X and Y values on this canvas are painted according to their coefficients for constantly increasing values of θ.  </p>
                        </section>
                    </section>
                    {/* END OF BOXES */}
                </section>
            </section>
        </section >
    );
}

