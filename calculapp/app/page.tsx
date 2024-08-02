"use client"
import { useColourContext } from "./ColourContext"

// FEATURES FOR FUTURE
// ---- solar power button?
// ---- bug report button?

export default function Home() {
  /* ---------------------------- COLOUR THEME -----------------------------------------------------------*/
  const { colour, changeColour } = useColourContext();

  return (
    <section className="min-h-screen">
      <main className={`pattern-${colour}-500 pattern-paper pattern-bg-white pattern-size-6 pattern-opacity-100 flex min-h-screen flex-col align-middle justify-center items-center`}>
      </main >
    </section>
  );
}

