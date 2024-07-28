"use client"
import { useState, useEffect, useRef } from "react"
import { sum, divide, multiply, exponent, subtract, remainder } from '../basicOperations.js'
import Decimal from "decimal.js" // Decimal JS prevents JavaScript rounding errors (e.g. 3.3+3.3 = 6.59999)

// FEATURES FOR FUTURE
// ---- solar power button?
// ---- bug report button?


export default function Home() {
  // STYLES CONSTANTS
  // -- backgrounds
  const backgroundGrid = "pattern-paper pattern-indigo-500 pattern-bg-white pattern-size-6 pattern-opacity-100"
  const backgroundColour = "bg-indigo-400"
  const textColour1 = "text-black"
  const textColour2 = "text-indigo-600"
  const textColour3 = "text-indigo-700"

  // -- borders
  const outerBorderColor = "border-indigo-600"
  const buttonsTopBorder = "border-t-4 border-indigo-500"
  const equalsBorder = "rounded-r-lg rounded-tr-none"
  const hoverColour = "hover:bg-indigo-300"

  // STATES
  const [output, setOutput] = useState("")
  const [history, setHistory] = useState("")
  const [variable, setVariable] = useState("")
  const [operation, setOperation] = useState(" ") /* Keep as " ", see footnotes. */
  const [variableIsDecimal, setVariableIsDecimal] = useState(false)



  // REFS=================================================================
  const outputRef = useRef(output);
  const variableRef = useRef(variable);
  const operationRef = useRef(operation);
  const variableIsDecimalRef = useRef(variableIsDecimal)
  const historyRef = useRef(history)


  // Update refs whenever state changes
  useEffect(() => {
    outputRef.current = output;
  }, [output]);

  useEffect(() => {
    variableRef.current = variable;
  }, [variable]);

  useEffect(() => {
    operationRef.current = operation;
  }, [operation]);

  useEffect(() => {
    variableIsDecimalRef.current = variableIsDecimal;
  }, [variableIsDecimal]);


  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  // KEYDOWN
  useEffect(() => {
    function detectKeyDown(e) {
      let keyPressed = e.key
      switch (keyPressed) {
        // Handle numeric keys
        case '0': case '1': case '2': case '3': case '4':
        case '5': case '6': case '7': case '8': case '9':
          handleVariable(keyPressed);
          break;
        // Handle decimal point
        case '.':
          handleDecimal();
          break;

        // Handle basic operations
        case '+': case '-': /* '×' amd '÷' are not keys*/
          handleOperation(keyPressed);
          break;
        // Handle 'hotkey' operations
        case '/':
          handleOperation('÷');
          break;
        case '*': case 'x':
          handleOperation('×');
          break;
        case '=':
          handleEquals()
          break;
        // Clear variable with 'C' or 'c'
        case 'c': case 'C':
          clearVariable();
          break;
        // Handle 'Escape' key for clearing
        case 'Escape':
          handleClear();
          break;
        // Handle 'A' or 'a' for answer
        case 'a': case 'A':
          handleAnswer();
          break;
        default:
          // No action for other keys
          break;
      }

    }
    document.addEventListener('keydown', detectKeyDown, true)
    return () => {
      document.removeEventListener('keydown', detectKeyDown, true);
    };
  }, [])


  // FUNCTIONS
  function handleVariable(input: string) {
    if (operationRef.current == "" && variableRef.current.length == 0) {
      // Conditional clear ensures that after pressing "=", typing a new number with no operation will reset space. 
      handleClear()
    }
    setVariable(prev => prev += input)
  }
  function clearVariable() {
    setVariable("")
    setVariableIsDecimal(false)
  }
  function updateHistory() {
    if (historyRef.current === "") { // Conditional ensures first entry doesn't require an operation.
      setHistory(prev => prev += variableRef.current)
    } else {
      if (variableRef.current.length >= 1) { // Conditional ensures history only appended when variable and operation specified.
        const addition = ` ${operationRef.current} ${variableRef.current}`
        setHistory(prev => prev += addition)
      }
    }
  }
  function handleDecimal() {
    if (operationRef.current == "") {
      setOutput("")
      setHistory("")
    }
    if (!variableIsDecimalRef.current) {
      setVariableIsDecimal(prev => true)
      if (variableRef.current.length == 0) {
        setVariable("0.")
      } else {
        handleVariable(".")
      }
    }
  }


  function handleOperation(input: string) {
    setOperation(input)
    updateHistory()
    if (outputRef.current == "") {
      setOutput(variableRef.current)
    } else {
      calculateOutput()
    }
    clearVariable()
  }
  function handleClear() {
    setOutput("")
    setVariable("")
    setHistory("")
    setOperation("")
    setVariableIsDecimal(false)
  }
  function ensureDecimal(num) {
    // Conditional below ensures ".0" is appended if not already a decimal. 
    if (num % 1 === 0 && num.indexOf(".") === -1) {
      return num + '.0';
    } else {
      return num.toString();
    }
  }

  function calculateOutput() {
    const outputDecimal = new Decimal(ensureDecimal(outputRef.current))
    const variableDecimal = new Decimal(ensureDecimal(variableRef.current))
    switch (operationRef.current) {
      case "+":
        setOutput(prev => outputDecimal.add(variableDecimal).toString());
        break;
      case "-":
        setOutput(prev => outputDecimal.minus(variableDecimal).toString());
        break;
      case "×":
        setOutput(prev => outputDecimal.times(variableDecimal).toString());
        break;
      case "÷":
        setOutput(prev => outputDecimal.dividedBy(variableDecimal).toString());
        break;
      default:
    }
  }
  function handleEquals() {
    if (operationRef.current !== "" && variableRef.current !== "") {
      updateHistory()
      calculateOutput()
      setVariable("")
      setOperation("")
    }
  }
  function handleAnswer() {
    setVariable(outputRef.current)
    if (operationRef.current == "") {
      setOutput("")
      setHistory("")
    }
  }



  return (
    <main className={`${backgroundGrid} flex min-h-screen flex-col align-middle justify-center items-center`}>
      {/* ENTIRE CALCULATOR */}
      <section className={`w-5/6 max-w-[800px] ${outerBorderColor} ${backgroundColour} border-4 rounded-xl text-[25px] font-bold`}>
        <section className={`${backgroundColour} ${textColour1} rounded-lg min-h-[145px] flex flex-col justify-between rounded-b-none w-full text-center`}>
          {/* CALCULATION */}
          <title>Calculapp</title>
          <section className="bg-indigo-500 w-full rounded-t-lg">
            <h1 className="text-white text-[30px] italic p-1">Calculapp</h1>
          </section>
          {/* DEV USE ONLY DEBUGGING */}
          {/* <section>
            <div>OUTPUT {output}</div>
            <div>VARIABLE {variable}</div>
            <div>VARIABLELENGTH {variable.length}</div>
            <div>OPERATION {operation}</div>
            <div>CONDITION {(operation == "" && variable.length == 0) ? "true" : "false"}</div>
            <div></div>
          </section> */}

          <section className="p-2">
            <section className="text-xs">
              <span id="history">
                {history}
              </span>
            </section>
            {/* OUTPUT */}
            <section className="text-[40px]">
              <span id="output">
                {Number(Number(output).toPrecision(10))}
              </span>
              <span className={`${textColour3}`}>
                {" "}{operation == "" ? <span className="pl-2"> </span> : operation} {variable}
              </span>
            </section>
          </section>
        </section>
        {/* PARENT GRID: BUTTONS SECTION */}
        <section className={`bg-gray-300 ${buttonsTopBorder} ${textColour1} rounded-lg min-h-[400px] grid grid-cols-4`}>
          {/* CHILD GRID#1: TOP ROW */}
          <section className={`${textColour2} col-span-4 grid grid-cols-4`}>
            <button id="Clear" className={`${hoverColour}`} onClick={() => handleClear()}>Clear</button>
            <button id="÷" className={`${hoverColour}`} onClick={() => handleOperation(event.target.textContent)}>÷</button>
            <button id="×" className={`${hoverColour}`} onClick={() => handleOperation(event.target.textContent)}>×</button>
            <button id="ce" className={`${hoverColour}`} onClick={() => clearVariable()}>ce</button>
          </section>
          {/* CHILD GRID#2: NUMBERS 1-9 */}
          <section className="col-span-3 row-span-3 grid grid-cols-3 grid-rows-3">
            {["7", "8", "9", "4", "5", "6", "1", "2", "3"].map((num) => (
              <button key={num} id={num} className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>{num}</button>
            ))}
          </section>
          {/* CHILD GRID#3: RIGHT COL */}
          <section className={`${textColour2} row-span-3 grid grid-rows-3`}>
            <button id="-" className={`${hoverColour} ${textColour2} `} onClick={() => handleOperation(event.target.textContent)}>-</button>
            <button id="+" className={`${hoverColour} ${textColour2}`} onClick={() => handleOperation(event.target.textContent)}>+</button>
            <button id="Ans" className={`${hoverColour} ${textColour2}`} onClick={() => handleAnswer()}>Ans</button>
          </section>
          <button id="0" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>0</button>
          <button id="." className={`${hoverColour}  ${textColour2}`} onClick={() => handleDecimal()}>.</button>
          <div className={`${backgroundColour} ${textColour1} ${equalsBorder} flex col-span-2`}>
            <button id="=" className="text-center w-full" onClick={() => handleEquals()}>=</button>
          </div>
        </section>
      </section>
    </main >
  );
}

// FOOTNOTES
// Button presses on-screen can work differently to keyboard presses. It seems to me that
// --- when a keyboard button is pressed and a function is assigned to it (e.g. handleVariable)
// --- if that function has any state-related conditions in it then it will not work properly.
// --- When the function is called, the state used for conditionals will be that of when the function
// --- was initially assigned to the button press. 