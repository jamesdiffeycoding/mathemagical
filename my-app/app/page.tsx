"use client"
import { useColourContext } from "./ColourContext"
import Link from "next/link";
// FEATURES FOR FUTURE
// ---- solar power button?
// ---- bug report button?

export default function Home() {
  /* ---------------------------- COLOUR THEME -----------------------------------------------------------*/
  const { colour, changeColour } = useColourContext();

  return (
    // OUTER CONTAINER >> CONTENT CONTAINER >> CONTENT
    <section className={`flex-1 pattern-${colour}-500 pattern-paper pattern-bg-white pattern-size-6 pattern-opacity-100 flex flex-col`}>
      <section className={`flex-1 w-full flex items-center justify-center`}>
        <section className={`w-5/6 max-w-[450px] border-${colour}-600 border-4 rounded-xl bg-gray-400` /* bg-gray-400 is in case the colour theme class doesn't compile */}>
          {/* TOP --- MIDDLE --- BOTTOM BOXES */}
          <section className={`bg-${colour}-300 text-black rounded-lg min-h-[185px] flex flex-col justify-between rounded-b-none w-full text-center`}>
            {/* ____ TOP */}
            <div className={`font-bold bg-${colour}-500 w-full rounded-t-lg p-3`}>
              <h1 className="text-white opacity-90 text-[30px] italic">Mathemagical</h1>
            </div>

            {/* ____ MIDDLE */}
            <section className="flex justify-center items-center p-2">
              <div className="text-sm">This is where I deploy little mathematical projects.</div>
            </section>

            {/* ____ BOTTOM */}
            <section className={`text-left bg-white opacity-75 border-t-4 border-${colour}-500 text-black rounded-lg text-xs p-3`}>
              <Link href="/calculapp" legacyBehavior>
                <section className={`p-2 bg-${colour}-300 cursor-pointer hover:bg-gray-400 rounded-md`}>
                  <h1 className="text-bold text-[20px] text-center">
                    <a href="/calculapp">Calculapp</a>
                  </h1>
                  <br></br>
                  <p className="text-sm">Calculapp is a tested, decimal-compatible and keyboard friendly calculator with input history and clearing options.</p>
                </section>
              </Link>
              <br></br>
              <Link href="/spiraliser" legacyBehavior>
                <section className={`p-2 bg-${colour}-300 cursor-pointer hover:bg-gray-400 rounded-md`}>
                  <h1 className="text-bold text-[20px] text-center">
                    <a href="/spiraliser">Spiraliser</a>
                  </h1>
                  <br></br>
                  <p className="text-sm">Spiraliser displays an animated spiral created using HTML's canvas element.</p>
                </section>
              </Link>
              <br></br>
              <Link href="/create" legacyBehavior>
                <section className={`p-2 bg-${colour}-300 cursor-pointer hover:bg-gray-400 rounded-md`}>
                  <h1 className="text-bold text-[20px] text-center">
                    <a href="/spiraliser">Create</a>
                  </h1>
                  <br></br>
                  <p className="text-sm">Create your own trigonometric graph with this easy-to-use animation editor.</p>
                </section>
              </Link>

            </section>
          </section>
          {/* END OF BOXES */}
        </section>
      </section>
    </section >
  );
}

