export default function Home() {
  let backgroundColourPrimary = "bg-indigo-400"
  let backgroundColourSecondary = "bg-gray-300"
  let outerBorderColor = "border-indigo-600"
  let textColourPrimary = "text-black"
  let textColourSecondary = "text-black"
  let textColourTertiary = "text-indigo-600"
  let outerBorder = "rounded-xl"
  let innerBorder = "rounded-lg"
  let equalsBorder = "rounded-r-lg rounded-tr-none"
  let buttonsHeight = "min-h-[400px]"
  let hoverColour = "hover:bg-indigo-300"
  let backgroundPattern = "pattern-paper pattern-indigo-500 pattern-bg-white pattern-size-6 pattern-opacity-100"

  return (
    <main className={`${backgroundPattern} flex min-h-screen flex-col align-middle justify-center items-center`}>
      {/* ENTIRE CALCULATOR */}
      <section className={`w-5/6 min-w-350 max-w-1000 ${outerBorderColor} ${backgroundColourPrimary} border-4 ${outerBorder} text-[25px] font-bold`}>
        <section className={`${backgroundColourPrimary} ${textColourPrimary} ${innerBorder} min-h-[80px] flex flex-col justify-between rounded-b-none w-full text-right p-4`}>
          {/* CALCULATION */}
          <section className="text-xs"> 30*10
          </section>
          {/* OUTPUT */}
          <section className="text-[40px]">300
          </section>
        </section>
        {/* BUTTONS SECTION */}
        <section className={`${backgroundColourSecondary} ${textColourSecondary} ${innerBorder} ${buttonsHeight} grid grid-cols-4`}>
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
