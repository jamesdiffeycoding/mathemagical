"use client"
import { useState, useEffect, useRef } from "react"
import Decimal from "decimal.js" // Decimal JS prevents JavaScript rounding errors (e.g. 3.3+3.3 = 6.59999)

// FEATURES FOR FUTURE
// ---- solar power button?
// ---- bug report button?

export default function Home() {
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
  useEffect(() => {
    setColour(colours[colourIndex])
  }, [colourIndex])
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
    <main className={`pattern-${colour}-500 pattern-paper pattern-bg-white pattern-size-6 pattern-opacity-100 flex min-h-screen flex-col align-middle justify-center items-center`}>
      {/* ENTIRE CALCULATOR */}
      <section className={`w-5/6 max-w-[800px] border-${colour}-600 bg-${colour}-300 border-4 rounded-xl text-[25px] font-bold`}>
        <section className={`bg-${colour}-300 text-black rounded-lg min-h-[145px] flex flex-col justify-between rounded-b-none w-full text-center`}>
          {/* CALCULATION */}
          <title>Calculapp</title>
          <section className={`bg-${colour}-500 w-full rounded-t-lg cursor-pointer`} onClick={changeColour}>
            <h1 className="text-black opacity-75 text-[30px] italic p-1">Calculapp</h1>
          </section>
          {/* DEV USE ONLY DEBUGGING */}
          {/* <section>
          <div className="text-black">{colours[colourIndex]}</div>
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
              <span className={`text-${colour}-700`}>
                {" "}{operation == "" ? <span className="pl-2"> </span> : operation} {variable}
              </span>
            </section>
          </section>
        </section>
        {/* PARENT GRID: BUTTONS SECTION */}
        <section className={`bg-gray-200 opacity-75 border-t-4 border-${colour}-500 text-black rounded-lg min-h-[400px] grid grid-cols-4`}>
          {/* CHILD GRID#1: TOP ROW */}
          <section className={`text-${colour}-700 col-span-4 grid grid-cols-4`}>
            <button id="Clear" className={`hover:bg-${colour}-300`} onClick={() => handleClear()}>Clear</button>
            <button id="÷" className={`hover:bg-${colour}-300`} onClick={() => handleOperation(event.target.textContent)}>÷</button>
            <button id="×" className={`hover:bg-${colour}-300`} onClick={() => handleOperation(event.target.textContent)}>×</button>
            <button id="ce" className={`hover:bg-${colour}-300`} onClick={() => clearVariable()}>ce</button>
          </section>
          {/* CHILD GRID#2: NUMBERS 1-9 */}
          <section className="col-span-3 row-span-3 grid grid-cols-3 grid-rows-3">
            {["7", "8", "9", "4", "5", "6", "1", "2", "3"].map((num) => (
              <button key={num} id={num} className={`hover:bg-${colour}-300`} onClick={() => handleVariable(event.target.textContent)}>{num}</button>
            ))}
          </section>
          {/* CHILD GRID#3: RIGHT COL */}
          <section className={`text-${colour}-600 row-span-3 grid grid-rows-3`}>
            <button id="-" className={`hover:bg-${colour}-300 text-${colour}-600 `} onClick={() => handleOperation(event.target.textContent)}>-</button>
            <button id="+" className={`hover:bg-${colour}-300 text-${colour}-600`} onClick={() => handleOperation(event.target.textContent)}>+</button>
            <button id="Ans" className={`hover:bg-${colour}-300 text-${colour}-600`} onClick={() => handleAnswer()}>Ans</button>
          </section>
          <button id="0" className={`hover:bg-${colour}-300`} onClick={() => handleVariable(event.target.textContent)}>0</button>
          <button id="." className={`hover:bg-${colour}-300  text-${colour}-600`} onClick={() => handleDecimal()}>.</button>
          <div className={`bg-${colour}-300 text-black rounded-r-lg rounded-tr-none flex col-span-2`}>
            <button id="=" className=" text-center w-full" onClick={() => handleEquals()}>=</button>
          </div>
          {/* THE BELOW ELEMENT(S) ENSURE(S) TAILWIND STYLES FOR ALL COLOUR THEMES LOAD, SINCE THEY ARE INCLUDED IN THE BUNDLE AT COMPILE TIME */}
          <div
            className="bg-lime-300 bg-indigo-300 bg-orange-300 bg-pink-300
              bg-lime-500 bg-indigo-500 bg-orange-500 bg-pink-500 
              text-lime-700 text-indigo-700 text-orange-700 text-pink-700
              text-lime-600 text-indigo-600 text-orange-600 text-pink-600
              border-lime-600 border-indigo-600 border-orange-600 border-pink-600
              border-lime-500 border-indigo-500 border-orange-500 border-pink-500
              hover:bg-lime-300 hover:bg-indigo-300 hover:bg-orange-300 hover:bg-pink-300
              pattern-lime-500 pattern-indigo-500 pattern-orange-500 pattern-pink-500
              hidden" ></div>
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