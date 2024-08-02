"use client"
import { useState, useEffect, useRef } from "react"
import Decimal from "decimal.js" // Decimal JS prevents JavaScript rounding errors (e.g. 3.3+3.3 = 6.59999)
import { useColourContext } from "../ColourContext"
import ButtonComponent from "./components/Button"

// FEATURES FOR FUTURE
// ---- solar power button?
// ---- bug report button?

export default function Home() {
  /* ---------------------------- COLOUR THEME -----------------------------------------------------------*/
  const { colour, changeColour } = useColourContext();

  /* ---------------------------- CALCULATOR FUNCTIONALITY ------------------------------------------------*/
  const [entry, setEntry] = useState("")
  const [entryIsDecimal, setEntryIsDecimal] = useState(false)
  const [operation, setOperation] = useState(" ") /* Keep as " ", see footnotes. */
  const [answer, setAnswer] = useState("")
  const [history, setHistory] = useState("")
  /* REFS ----------------------------------------------------------------------*/
  /* Refs are needed because otherwise key press event listeners only work have 
  access to initial state when the event listener is mounted.  --------*/
  /* Button presses on-screen can work differently to keyboard presses. It seems to me that
      when a keyboard button is pressed and a function is assigned to it (e.g. handleEntry)
      if that function has any state-related conditions in it then it will not work properly.
      When the function is called, the state used for conditionals will be that of when the function
      was initially assigned to the button press. 
  */
  /* useRef creates a persistent reference that is maintained across re-renders. The current property of
   the ref object can be updated without causing a re-render, and the value persists between renders, 
   allowing you to keep track of state changes that should not trigger re-renders but still need to be 
   referenced by event handlers or other asynchronous logic.
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
        case 'p': case 'P': handleOperation('+'); break;
        case 'm': case 'M': handleOperation('-'); break;
        case '/': case 'd': case 'D': handleOperation('÷'); break;
        case '*': case 'x': case 'X': handleOperation('×'); break;
        case '=': case 'e': case 'E': handleEqualsPress(); break;
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
      if (entryRef.current != "") {
        handleAnswerCalculation()
      }
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
    // OUTER CONTAINER >> CONTENT CONTAINER >> CONTENT
    <section className={`flex-1 pattern-${colour}-500 pattern-paper pattern-bg-white pattern-size-6 pattern-opacity-100 flex flex-col `}>
      <section className={`flex-1 w-full flex items-center justify-center`}>
        <section className={`w-5/6 max-w-[800px] border-${colour}-600 border-4 rounded-xl text-[25px] font-bold bg-gray-300` /* bg-gray-300 is in case the colour theme class doesn't compile */}>


          {/* DARK TOP BOX */}
          <section className={`bg-${colour}-300 text-black rounded-lg min-h-[185px] flex flex-col justify-between rounded-b-none w-full text-center`}>
            <div className={`bg-${colour}-500 w-full rounded-t-lg p-3`}>
              <h1 className="text-white opacity-90 text-[30px] italic">Calculapp</h1>
              <div className="flex justify-center">
              </div>
            </div>


            {/* MEDIUM MIDDLE BOX */}
            <section className="p-2">
              <div className="text-xs">
                <span id="history">{history}</span>
              </div>
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
              <ButtonComponent colour={colour} symbol="Clear" hotkey="esc" onClickFunction={handleClearCalculator} extraClasses=""></ButtonComponent>
              <ButtonComponent colour={colour} symbol="÷" hotkey="/ d" onClickFunction={() => handleOperation("÷")} extraClasses=""></ButtonComponent>
              <ButtonComponent colour={colour} symbol="×" hotkey="* x" onClickFunction={() => handleOperation("×")} extraClasses=""></ButtonComponent>
              <ButtonComponent colour={colour} symbol="ce" hotkey="c" onClickFunction={handleClearEntry} extraClasses=""></ButtonComponent>
            </section>
            {/* CHILD GRID#2: NUMBERS 1-9 */}
            <section className="col-span-3 row-span-3 grid grid-cols-3 grid-rows-3">
              {["7", "8", "9", "4", "5", "6", "1", "2", "3"].map((num) => (
                <ButtonComponent key={num} colour={colour} symbol={num} hotkey="" onClickFunction={() => handleEntry(num)} extraClasses=""></ButtonComponent>
              ))}
            </section>


            {/* CHILD GRID#3: RIGHT COL */}
            <section className={`text-${colour}-600 row-span-3 grid grid-rows-3`}>
              <ButtonComponent colour={colour} symbol="+" hotkey="p" onClickFunction={() => handleOperation("+")} extraClasses=""></ButtonComponent>
              <ButtonComponent colour={colour} symbol="-" hotkey="m" onClickFunction={() => handleOperation("-")} extraClasses=""></ButtonComponent>
              <ButtonComponent colour={colour} symbol="Ans" hotkey="a" onClickFunction={handleGetPreviousAnswer} extraClasses=""></ButtonComponent>
            </section>

            {/* BOTTOM ROW */}
            <ButtonComponent colour={colour} symbol="0" hotkey="" onClickFunction={() => handleEntry("0")} extraClasses=""></ButtonComponent>
            <ButtonComponent colour={colour} symbol="." hotkey="" onClickFunction={handleDecimalPoint} extraClasses=""></ButtonComponent>
            <ButtonComponent colour={colour} symbol="=" hotkey="e" onClickFunction={handleEqualsPress} extraClasses={`bg-${colour}-300 border-${colour}-500 border-t-4 border-l-4 rounded-tl-lg rounded-r-lg rounded-tr-none flex col-span-2`}></ButtonComponent>

          </section>
        </section>
      </section>
    </section >
  );
}

