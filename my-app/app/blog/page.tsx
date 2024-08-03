"use client"
import { useColourContext } from "../ColourContext"
import Link from "next/link";
// FEATURES FOR FUTURE
// ---- solar power button?
// ---- bug report button?

export default function Blog() {
    /* ---------------------------- COLOUR THEME -----------------------------------------------------------*/
    const { colour, changeColour } = useColourContext();

    return (
        // OUTER CONTAINER >> CONTENT CONTAINER >> CONTENT
        <section className={`flex-1 pattern-${colour}-500 pattern-paper pattern-bg-white pattern-size-6 pattern-opacity-100 flex flex-col p-2`}>
            <section className={`flex-1 w-full flex items-center justify-center`}>
                <section className={`w-5/6 max-w-[450px] border-${colour}-600 border-4 rounded-xl bg-gray-400` /* bg-gray-400 is in case the colour theme class doesn't compile */}>
                    {/* TOP --- MIDDLE --- BOTTOM BOXES */}
                    <section className={`bg-${colour}-300 text-black rounded-lg min-h-[185px] flex flex-col justify-between rounded-b-none w-full text-center`}>
                        {/* ____ TOP */}
                        <div className={`font-bold bg-${colour}-500 w-full rounded-t-lg p-3`}>
                            <h1 className="text-white opacity-90 text-[30px] italic">Blog</h1>
                        </div>

                        {/* ____ MIDDLE */}
                        <section className="flex justify-center items-center p-2">
                        </section>

                        {/* ____ BOTTOM */}
                        <section className={`text-left bg-white opacity-75 border-t-4 border-${colour}-500 text-black rounded-lg text-xs p-3`}>
                            <Link href="/calculapp" legacyBehavior>
                                <section className={`p-2 bg-${colour}-300 cursor-pointer hover:bg-gray-400 rounded-md`}>
                                    <h1 className="text-bold text-[20px] text-center">
                                        <a href="/calculapp">Calculapp</a>
                                    </h1>
                                    <br></br>
                                    <p className="">Calculapp is a tested, decimal-compatible and keyboard friendly calculator with input history and clearing options. Here are some reflections from building it:</p>
                                    <br></br>
                                    <ol className="list-decimal list-inside ml-4">
                                        <li className="mb-2">Base JavaScript has trouble accurately <strong>evaluating floating point calculations</strong>. I used the <strong>Decimal JS</strong> library to overcome this.</li>
                                        <li className="mb-2"><strong>Test-driven development (TDD)</strong> was invaluable for ensuring iterative improvement. I used the Playwright package to create over <strong>40 end-to-end tests</strong> to simulate user inputs, testing both keyboard and on-screen button functionality. <strong> Unhappy input paths fixed and tested include: </strong> </li>
                                        <ol className="list-disc list-inside ml-5">
                                            <li className="mb-2">multiple sequential operations if a user changes their mind</li>
                                            <li className="mb-2">multiple 'decimal place' inputs</li>
                                        </ol>
                                        <li className="mb-2"><strong>Stale state data: </strong>I learned from adding keyboard event listeners that in React state-dependent function added via event-listeners by the useEffect hook can only access the state when the event-listener was added. The <strong> useRef hook</strong> is an effective way to provide this latest state data to the function. </li>

                                    </ol>
                                </section>
                            </Link>
                            <br></br>
                            <Link href="/spiraliser" legacyBehavior>
                                <section className={`p-2 bg-${colour}-300 cursor-pointer hover:bg-gray-400 rounded-md`}>
                                    <h1 className="text-bold text-[20px] text-center">
                                        <a href="/spiraliser">Spiraliser & Create</a>
                                    </h1>
                                    <br></br>
                                    <p className="">Spiraliser displays an animated spiral created using HTML's canvas element. Create lets you produce your own animated trigonometric graph. Here are some reflections from building them:</p>
                                    <br />
                                    <ol className="list-decimal list-inside ml-4">
                                        <li className="mb-2">Canvas appears to present some <strong>undocumented compatability challenges</strong> with React. The drawing functionality of canvas appears to interfere with use of React's Link component (which enables cross-page navigation without page reloads). To overcome this I implemented {`<a></a>`} tags instead of {`<Link></Link>`} on the Spiraliser and Create pages .</li>
                                        <li className="mb-2">Once learned, canvas feature is an <strong>efficient and performant method </strong> for animating graph equations with an increasing variable. Other methods (such as progressively mapping increasing indices of a co-ordinate array) are inefficient and significantly reduce performance as increasing numbers of coordinates are mapped out. </li>
                                        <li className="mb-2">The <strong>useRef hook</strong> (for creating a mutable object that persists throughout the component's lifecycle)  was useful for creating a reference the canvas element.
                                        </li>
                                        <li className="mb-2">The <strong>useEffect hook</strong> (for side effects in functional components) was useful for handling canvas drawing updates as X and Y-coordinate states change is used to handle the animation and drawing on the canvas. It runs the animation loop and updates the canvas based on the state changes.</li>
                                    </ol>

                                </section>
                            </Link>
                            <br></br>
                            <Link href="/" legacyBehavior>
                                <section className={`p-2 bg-${colour}-300 cursor-pointer hover:bg-gray-400 rounded-md`}>
                                    <h1 className="text-bold text-[20px] text-center">
                                        <a href="/spiraliser">Misc</a>
                                    </h1>
                                    <br></br>
                                    <p className="">In the making of this portfoli</p>
                                    <ol className="list-decimal list-inside ml-4">
                                        <li className="mb-2">Tailwind bundles only used class names at compile time for efficiency. In order to use classes (e.g. colours from different themes), you need to ensure those colours are included in the <strong> compilation bundle</strong>. </li>
                                        <li className="mb-2"><strong>Local storage</strong> would be useful for storing the preferred colour theme in the absence of {"<Link> compatability with the canvas element."}. I can add this later. </li>
                                        <li className="mb-2">React's <strong>useContext hook</strong> makes it easy to share colour theme state across components without <strong>prop drilling</strong>.</li>
                                    </ol>
                                </section>
                            </Link>

                        </section>
                    </section>
                    {/* END OF BOXES */}

                </section>
            </section >
        </section >
    );
}

