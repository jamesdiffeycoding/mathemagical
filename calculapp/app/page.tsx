"use client"
import { useState, useEffect } from "react"
import { sum, divide, multiply, exponent, subtract, remainder } from '../basicOperations.js'
import Decimal from "decimal.js" // Decimal JS prevents JavaScript rounding errors (e.g. 3.3+3.3 = 6.59999)


// BUGS TO FIX
// ---- TYPING ".3.3" on first load
// ---- typing "." after equals
// --- pressing "=" twice resets everything
// --- "percentage" - how history is handled

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
  const [output, setOutput] = useState("")
  const [history, setHistory] = useState("")
  const [variable, setVariable] = useState("")
  const [operation, setOperation] = useState("")
  const [variableIsDecimal, setVariableIsDecimal] = useState(false)

  // FUNCTIONS
  function handleVariable(input: string) {
    if (operation == "" && variable.length == 0) handleClear() // Conditional clear ensures that after pressing "=", typing a new number with no operation will reset space. 
    setVariable(prev => prev += input)
  }
  function clearVariable() {
    setVariable("")
    setVariableIsDecimal(false)
  }
  function updateHistory() {
    if (history === "") { // Conditional ensures first entry doesn't require an operation.
      setHistory(prev => prev += variable)
    } else {
      if (variable.length >= 1) { // Conditional ensures history only appended when variable and operation specified.
        const addition = ` ${operation} ${variable}`
        setHistory(prev => prev += addition)
      }
    }
  }
  function handleDecimal() {
    if (!variableIsDecimal) {
      setVariableIsDecimal(prev => true)
      if (variable.length == 0) {
        setVariable("0.")
      } else {
        handleVariable(".")
      }
    }
  }
  function handlePercentage() {
    if (output.length >= 0 && variable === "") {
      const outputDecimal = new Decimal(ensureDecimal(output)).dividedBy("100").toString()
      setOutput(prev => outputDecimal)
    } else {
      const variableDecimal = new Decimal(ensureDecimal(variable)).dividedBy("100").toString()
      if (variableDecimal.indexOf(".") !== -1) {
        setVariableIsDecimal(prev => true)
      }
      setVariable(prev => variableDecimal);
    }
  }
  function handleOperation(input: string) {
    setOperation(input)
    updateHistory()
    if (output == "") {
      setOutput(variable)
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
    const outputDecimal = new Decimal(ensureDecimal(output))
    const variableDecimal = new Decimal(ensureDecimal(variable))
    switch (operation) {
      case "+":
        setOutput(prev => outputDecimal.add(variableDecimal).toString());
        break;
      case "-":
        setOutput(prev => outputDecimal.minus(variableDecimal).toString());
        break;
      case "×":
        setOutput(prev => outputDecimal.times(variableDecimal).toString());
        break;
      case "/":
        setOutput(prev => outputDecimal.dividedBy(variableDecimal).toString());
        break;
      default:
        setOutput(prev => variable) // Handles case where no operation specified on equals press.
    }
  }
  function handleEquals() {
    updateHistory()
    calculateOutput()
    setVariable("")
    setOperation("")
  }





  return (
    <main className={`${backgroundPattern} flex min-h-screen flex-col align-middle justify-center items-center`}>
      {/* ENTIRE CALCULATOR */}
      <section className={`w-5/6 max-w-[800px] ${outerBorderColor} ${backgroundColourPrimary} border-4 ${outerBorderRounding} text-[25px] font-bold`}>
        <section className={`${backgroundColourPrimary} ${textColourPrimary} ${innerBorderRounding} min-h-[80px] flex flex-col justify-between rounded-b-none w-full text-center p-4`}>
          {/* CALCULATION */}
          <section className="text-xs">
            <span id="history">
              {history}
            </span>
          </section>
          <title>Calculapp</title>
          <h1>Calculapp</h1>
          {/* OUTPUT */}
          <section className="text-[40px]">
            <span id="output">
              {output}
            </span>
            <span className="text-indigo-700">
              {" "}{operation} {variable}
            </span>
          </section>
        </section>
        {/* BUTTONS SECTION */}
        <section className={`${backgroundColourSecondary} ${buttonsTopBorder} ${textColourSecondary} ${innerBorderRounding} ${buttonsHeight} grid grid-cols-4`}>
          {/* TOP ROW */}
          <section className={`${textColourTertiary} col-span-4 grid grid-cols-4`}>
            <button id="Clear" className={`${hoverColour}`} onClick={() => handleClear()}>Clear</button>
            <button id="÷" className={`${hoverColour}`} onClick={() => handleOperation(event.target.textContent)}>÷</button>
            <button id="×" className={`${hoverColour}`} onClick={() => handleOperation(event.target.textContent)}>×</button>
            <button id="ce" className={`${hoverColour}`} onClick={() => clearVariable()}>ce</button>
          </section>
          <button id="7" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>7</button>
          <button id="8" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>8</button>
          <button id="9" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>9</button>
          <button id="-" className={`${hoverColour} ${textColourTertiary} `} onClick={() => handleOperation(event.target.textContent)}>-</button>
          <button id="4" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>4</button>
          <button id="5" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>5</button>
          <button id="6" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>6</button>
          <button id="+" className={`${hoverColour} ${textColourTertiary}`} onClick={() => handleOperation(event.target.textContent)}>+</button>
          <button id="1" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>1</button>
          <button id="2" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>2</button>
          <button id="3" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>3</button>
          {/* EQUAid LS */}
          <div className={`${backgroundColourPrimary} ${textColourPrimary} ${equalsBorder} row-span-2 flex align-middle`}>
            <button id="=" className="text-center w-full" onClick={() => handleEquals()}>=</button>
          </div>
          <button id="%" className={`${hoverColour}`} onClick={() => handlePercentage()}>%</button>
          <button id="0" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>0</button>
          <button id="." className={`${hoverColour}`} onClick={() => handleDecimal()}>.</button>
        </section>
      </section>
    </main >
  );
}
