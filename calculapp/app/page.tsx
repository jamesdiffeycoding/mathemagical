"use client"
import { useState } from "react"

export default function Home() {
  // STYLES CONSTANTS
  const backgroundColourPrimary = "bg-indigo-400"
  const backgroundColourSecondary = "bg-gray-300"
  const outerBorderColor = "border-indigo-600"
  const textColourPrimary = "text-black"
  const textColourSecondary = "text-black"
  const textColourTertiary = "text-indigo-600"
  const buttonsTopBorder = "border-t-4 border-indigo-500"
  const outerBorderRounding = "rounded-xl"
  const innerBorderRounding = "rounded-lg"
  const equalsBorder = "rounded-r-lg rounded-tr-none"
  const buttonsHeight = "min-h-[400px]"
  const hoverColour = "hover:bg-indigo-300"
  const backgroundPattern = "pattern-paper pattern-indigo-500 pattern-bg-white pattern-size-6 pattern-opacity-100"

  // STATES
  const [output, setOutput] = useState(300)
  const [record, setRecord] = useState("30 * 100")


  return (
    <main className={`${backgroundPattern} flex min-h-screen flex-col align-middle justify-center items-center`}>
      {/* ENTIRE CALCULATOR */}
      <section className={`w-5/6 min-w-350 max-w-1000 ${outerBorderColor} ${backgroundColourPrimary} border-4 ${outerBorderRounding} text-[25px] font-bold`}>
        <section className={`${backgroundColourPrimary} ${textColourPrimary} ${innerBorderRounding} min-h-[80px] flex flex-col justify-between rounded-b-none w-full text-right p-4`}>
          {/* CALCULATION */}
          <section className="text-xs">{record}
          </section>
          {/* OUTPUT */}
          <section className="text-[40px]">{output}
          </section>
        </section>
        {/* BUTTONS SECTION */}
        <section className={`${backgroundColourSecondary} ${buttonsTopBorder} ${textColourSecondary} ${innerBorderRounding} ${buttonsHeight} grid grid-cols-4`}>
          {/* TOP ROW */}
          <section className={`${textColourTertiary} col-span-4 grid grid-cols-4`}>
            <button className={`${hoverColour}`}>Clear</button>
            <button className={`${hoverColour}`}>÷</button>
            <button className={`${hoverColour}`}>×</button>
            <button className={`${hoverColour}`}>ce</button>
          </section>
          <button className={`${hoverColour}`}>7</button>
          <button className={`${hoverColour}`}>8</button>
          <button className={`${hoverColour}`}>9</button>
          <button className={`${hoverColour}`}>-</button>
          <button className={`${hoverColour}`}>4</button>
          <button className={`${hoverColour}`}>5</button>
          <button className={`${hoverColour}`}>6</button>
          <button className={`${hoverColour}`}>+</button>
          <button className={`${hoverColour}`}>1</button>
          <button className={`${hoverColour}`}>2</button>
          <button className={`${hoverColour}`}>3</button>
          {/* EQUALS */}
          <div className={`${backgroundColourPrimary} ${textColourPrimary} ${equalsBorder} row-span-2 flex align-middle`}>
            <button className="text-center w-full">=</button>
          </div>
          <button className={`${hoverColour}`}>%</button>
          <button className={`${hoverColour}`}>0</button>
          <button className={`${hoverColour}`}>.</button>
        </section>
      </section>
    </main >
  );
}
