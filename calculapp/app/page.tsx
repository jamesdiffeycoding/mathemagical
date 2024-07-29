"use client"
import { useState, useEffect, useRef } from "react"
import Decimal from "decimal.js" // Decimal JS prevents JavaScript rounding errors (e.g. 3.3+3.3 = 6.59999)

// FEATURES FOR FUTURE
// ---- solar power button?
// ---- bug report button?

export default function Home() {

  /* ---------------------------- COLOUR THEME -----------------------------------------------------------*/
  const colours = ["lime", "indigo", "orange", "pink"]
  let randomColourIndex = Math.floor(Math.random() * colours.length)
  const [colourIndex, setColourIndex] = useState(randomColourIndex)
  const [colour, setColour] = useState(colours[colourIndex])

  function changeColour() {
    let newIndex: number
    if (colourIndex < colours.length - 1) {
      newIndex = colourIndex + 1
    } else {
      newIndex = 0
    }
    setColourIndex(newIndex)
  }
  useEffect(() => { /* Update colour state whenever index changes */
    setColour(colours[colourIndex])
  }, [colourIndex])


  /* ---------------------------- CALCULATOR FUNCTIONALITY ------------------------------------------------*/
  const [answer, setAnswer] = useState("")
  const [history, setHistory] = useState("")
  const [entry, setEntry] = useState("")
  const [operation, setOperation] = useState(" ") /* Keep as " ", see footnotes. */

  const [entryIsDecimal, setEntryIsDecimal] = useState(false)
  /* REFS ----------------------------------------------------------------------*/
  /* Refs are needed because otherwise key press event listeners only work have 
  access to initial state when the event listener is mounted.  --------*/
  /* Button presses on-screen can work differently to keyboard presses. It seems to me that
      when a keyboard button is pressed and a function is assigned to it (e.g. handleEntry)
      if that function has any state-related conditions in it then it will not work properly.
      When the function is called, the state used for conditionals will be that of when the function
      was initially assigned to the button press. 
  */
  const answerRef = useRef(answer);
  const entryRef = useRef(entry);
  const operationRef = useRef(operation);
  const entryIsDecimalRef = useRef(entryIsDecimal)
  const historyRef = useRef(history)
  /* Update refs whenever state changes */
  useEffect(() => { answerRef.current = answer; }, [answer]);
  useEffect(() => { entryRef.current = entry; }, [entry]);
  useEffect(() => { operationRef.current = operation; }, [operation]);
  useEffect(() => { entryIsDecimalRef.current = entryIsDecimal; }, [entryIsDecimal]);
  useEffect(() => { historyRef.current = history; }, [history]);
  /* Mount key-press event listener*/
  useEffect(() => {
    function detectKeyDown(e: KeyboardEvent) {
      let keyPressed = e.key
      switch (keyPressed) {
        case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': handleEntry(keyPressed); break;
        case '.': handleDecimalPoint(); break;
        case '+': case '-': /* '×' amd '÷' are not keys*/ handleOperation(keyPressed); break;
        case '/': handleOperation('÷'); break;
        case '*': case 'x': handleOperation('×'); break;
        case '=': handleEqualsPress(); break;
        case 'c': case 'C': handleClearEntry(); break;
        case 'Escape': handleClearCalculator(); break;
        case 'a': case 'A': handleGetPreviousAnswer(); break;
        default: /* NO ACTION FOR OTHER KEYS*/
          break;
      }
    }
    document.addEventListener('keydown', detectKeyDown, true)
    return () => {
      document.removeEventListener('keydown', detectKeyDown, true);
    };
  }, [])

  /* Calculator functions ----------------------------------------------------------------------*/
  // handleEntry: number presses appended to variable or reset calculator after equals press
  // handleDecimalPoint: decimal point presses create decimal if not already a decimal
  // handleOperation: +, -, *, / presses trigger calculation and reset the entry for a new entry
  // handleEqualsPress: equals press finishes calculation if an operation is specified
  // handleAnswerCalculation: calculates answer. Triggered by equals press and operation presses when appropriate.
  // handleClearEntry: "ce" presses. Wipes the entry.
  // handleClearCalculator: "Clear" presses or when a new equation is started one number, decimal point or operation press after equals button
  // handleHistoryUpdate: updates the history on operation, equals, or post-equals presses
  // handleGetPreviousAnswer: "Ans" presses. Replaces the entry with answer.
  function handleEntry(input: string) {
    if (operationRef.current == "" && entryRef.current.length == 0) { // Ensure after "=", typing with no operation will reset calculator. 
      handleClearCalculator()
    }
    setEntry(prev => prev += input)
  }
  function handleDecimalPoint() {
    if (operationRef.current == "") {
      setAnswer("")
      setHistory("")
    }
    if (!entryIsDecimalRef.current) {
      setEntryIsDecimal(prev => true)
      if (entryRef.current.length == 0) {
        setEntry("0.")
      } else {
        handleEntry(".")
      }
    }
  }
  function handleOperation(input: string) {
    setOperation(input)
    handleHistoryUpdate()
    if (answerRef.current == "") {
      setAnswer(entryRef.current)
    } else {
      handleAnswerCalculation()
    }
    handleClearEntry()
  }
  function handleEqualsPress() {
    if (operationRef.current !== "" && entryRef.current !== "") {
      handleHistoryUpdate()
      handleAnswerCalculation()
      setEntry("")
      setOperation("")
    }
  }
  function handleAnswerCalculation() {
    const ensureDecimal = (num: string) => {
      // Conditional below ensures ".0" is appended if not already a decimal.
      if (Number(num) % 1 === 0 && num.indexOf(".") === -1) {
        return num + '.0';
      } else {
        return num.toString();
      }
    }
    const answerDecimal = new Decimal(ensureDecimal(answerRef.current)) /* Decimal avoids rounding errors */
    const entryDecimal = new Decimal(ensureDecimal(entryRef.current))
    switch (operationRef.current) {
      case "+":
        setAnswer(prev => answerDecimal.add(entryDecimal).toString());
        break;
      case "-":
        setAnswer(prev => answerDecimal.minus(entryDecimal).toString());
        break;
      case "×":
        setAnswer(prev => answerDecimal.times(entryDecimal).toString());
        break;
      case "÷":
        setAnswer(prev => answerDecimal.dividedBy(entryDecimal).toString());
        break;
      default:
    }
  }
  function handleClearEntry() {
    setEntry("")
    setEntryIsDecimal(false)
  }
  function handleClearCalculator() {
    setAnswer("")
    setEntry("")
    setHistory("")
    setOperation("")
    setEntryIsDecimal(false)
  }
  function handleHistoryUpdate() {
    if (historyRef.current === "") { // Ensure first entry doesn't require an operation.
      setHistory(prev => prev += entryRef.current)
    } else {
      if (entryRef.current.length >= 1) { // Ensure history only appended when entry and operation specified.
        const addition = ` ${operationRef.current} ${entryRef.current}`
        setHistory(prev => prev += addition)
      }
    }
  }
  function handleGetPreviousAnswer() {
    setEntry(answerRef.current)
    if (operationRef.current == "") {
      setAnswer("")
      setHistory("")
    }
  }


  return (
    <main className={`pattern-${colour}-500 pattern-paper pattern-bg-white pattern-size-6 pattern-opacity-100 flex min-h-screen flex-col align-middle justify-center items-center`}>
      {/* ENTIRE CALCULATOR */}
      <section className={`w-5/6 max-w-[800px] border-${colour}-600 border-4 rounded-xl text-[25px] font-bold bg-gray-300`} /* bg-gray-300 is in case the colour theme class doesn't compile */>
        <section className={`bg-${colour}-300 text-black rounded-lg min-h-[145px] flex flex-col justify-between rounded-b-none w-full text-center`}>
          {/* CALCULATION */}
          <title>Calculapp</title>
          <section className={`bg-${colour}-500 w-full rounded-t-lg cursor-pointer`} onClick={changeColour}>
            <h1 className="text-black opacity-75 text-[30px] italic p-1">Calculapp</h1>
          </section>
          {/* DEV USE ONLY DEBUGGING */}
          {/* <section>
          <div className="text-black">{colours[colourIndex]}</div>
            <div>OUTPUT {answer}</div>
            <div>VARIABLE {entry}</div>
            <div>VARIABLELENGTH {entry.length}</div>
            <div>OPERATION {operation}</div>
            <div>CONDITION {(operation == "" && entry.length == 0) ? "true" : "false"}</div>
            <div></div>
          </section> */}

          <section className="p-2">
            <section className="text-xs">
              <span id="history">
                {history}
              </span>
            </section>
            {/* DISPLAY */}
            <section className="text-[40px]">
              <span id="answer">
                {Number(Number(answer).toPrecision(10))}
              </span>
              <span className={`text-${colour}-700`}>
                {" "}{operation == "" ? <span className="pl-2"> </span> : operation} {entry}
              </span>
            </section>
          </section>
        </section>
        {/* PARENT GRID: BUTTONS SECTION */}


        <section className={`bg-gray-200 opacity-75 border-t-4 border-${colour}-500 text-black rounded-lg min-h-[400px] grid grid-cols-4`}>


          {/* CHILD GRID#1: TOP ROW */}
          <section className={`text-${colour}-700 col-span-4 grid grid-cols-4`}>
            <button id="Clear" className={`hover:bg-${colour}-300`} onClick={() => handleClearCalculator()}>Clear</button>
            <button id="÷" className={`hover:bg-${colour}-300`} onClick={(event) => handleOperation(event.currentTarget.textContent || "")}>÷</button>
            <button id="×" className={`hover:bg-${colour}-300`} onClick={(event) => handleOperation(event.currentTarget.textContent || "")}>×</button>
            <button id="ce" className={`hover:bg-${colour}-300`} onClick={() => handleClearEntry()}>ce</button>
          </section>


          {/* CHILD GRID#2: NUMBERS 1-9 */}
          <section className="col-span-3 row-span-3 grid grid-cols-3 grid-rows-3">
            {["7", "8", "9", "4", "5", "6", "1", "2", "3"].map((num) => (
              <button key={num} id={num} className={`hover:bg-${colour}-300`} onClick={(event) => handleEntry(event.currentTarget.textContent || "")}>{num}</button>
            ))}
          </section>


          {/* CHILD GRID#3: RIGHT COL */}
          <section className={`text-${colour}-600 row-span-3 grid grid-rows-3`}>
            <button id="-" className={`hover:bg-${colour}-300 text-${colour}-600 `} onClick={(event) => handleOperation(event.currentTarget.textContent || "")}>-</button>
            <button id="+" className={`hover:bg-${colour}-300 text-${colour}-600`} onClick={(event) => handleOperation(event.currentTarget.textContent || "")}>+</button>
            <button id="Ans" className={`hover:bg-${colour}-300 text-${colour}-600`} onClick={() => handleGetPreviousAnswer()}>Ans</button>
          </section>
          <button id="0" className={`hover:bg-${colour}-300`} onClick={(event) => handleEntry(event.currentTarget.textContent || "")}>0</button>
          <button id="." className={`hover:bg-${colour}-300  text-${colour}-600`} onClick={() => handleDecimalPoint()}>.</button>
          <div className={`bg-${colour}-300 text-black rounded-r-lg rounded-tr-none flex col-span-2`}>
            <button id="=" className=" text-center w-full" onClick={() => handleEqualsPress()}>=</button>
          </div>


          {/* THE BELOW SECTION ENSURES TAILWIND STYLES FOR ALL COLOUR THEMES LOAD, SINCE THEY ARE INCLUDED IN THE BUNDLE AT COMPILE TIME */}
          {/* The extra DOM elements are inconvenient but necessary for loading the styles for the colour themes. */}
          <section className="hidden">
            <div className="text-lime-700"></div>
            <div className="text-indigo-700"></div>
            <div className="text-orange-700"></div>
            <div className="text-pink-700"></div>
            <div className="text-lime-600"></div>
            <div className="text-indigo-600"></div>
            <div className="text-orange-600"></div>
            <div className="text-pink-600"></div>
            <div className="border-lime-600"></div>
            <div className="border-indigo-600"></div>
            <div className="border-orange-600"></div>
            <div className="border-pink-600"></div>
            <div className="border-lime-500"></div>
            <div className="border-indigo-500"></div>
            <div className="border-orange-500"></div>
            <div className="border-pink-500"></div>
            <div className="hover:bg-lime-300"></div>
            <div className="hover:bg-indigo-300"></div>
            <div className="hover:bg-orange-300"></div>
            <div className="hover:bg-pink-300"></div>
            <div className="pattern-lime-500"></div>
            <div className="pattern-indigo-500"></div>
            <div className="pattern-orange-500"></div>
            <div className="pattern-pink-500"></div>
          </section>

        </section>
      </section>
    </main >
  );
}

