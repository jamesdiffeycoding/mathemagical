"use client"
import { useState, useEffect } from "react"
import { sum, divide, multiply, exponent, subtract, remainder } from '../basicOperations.js'
import Decimal from "decimal.js" // Decimal JS prevents JavaScript rounding errors (e.g. 3.3+3.3 = 6.59999)

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
    if (operation == "") {
      setOutput("")
      setHistory("")
    }
    if (!variableIsDecimal) {
      setVariableIsDecimal(prev => true)
      if (variable.length == 0) {
        setVariable("0.")
      } else {
        handleVariable(".")
      }
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
      case "÷":
        setOutput(prev => outputDecimal.dividedBy(variableDecimal).toString());
        break;
      default:
    }
  }
  function handleEquals() {
    if (operation !== "" && variable !== "") {
      updateHistory()
      calculateOutput()
      setVariable("")
      setOperation("")
    }
  }
  function handleAnswer() {
    setVariable(output)
    if (operation == "") {
      setOutput("")
      setHistory("")
    }
  }





  return (
    <main className={`${backgroundPattern} flex min-h-screen flex-col align-middle justify-center items-center`}>
      {/* ENTIRE CALCULATOR */}
      <section className={`w-5/6 max-w-[800px] ${outerBorderColor} ${backgroundColourPrimary} border-4 ${outerBorderRounding} text-[25px] font-bold`}>
        <section className={`${backgroundColourPrimary} ${textColourPrimary} ${innerBorderRounding} min-h-[145px] flex flex-col justify-between rounded-b-none w-full text-center`}>
          {/* CALCULATION */}
          <title>Calculapp</title>
          <section className="bg-indigo-500 w-full rounded-t-lg">
            <h1 className="text-white text-[30px] italic p-1">Calculapp</h1>
          </section>
          {/* DEV USE ONLY DEBUGGING */}
          {/* <section>
            <div>OUTPUT {output}</div>
            <div>VARIABLE {variable}</div>
            <div>OPERATION {operation}</div>
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
                {Number(Number(output).toPrecision(14))}
              </span>
              <span className="text-indigo-700">
                {" "}{operation == "" ? <span className="pl-2"> </span> : operation} {variable}
              </span>
            </section>
          </section>
        </section>
        {/* PARENT GRID: BUTTONS SECTION */}
        <section className={`${backgroundColourSecondary} ${buttonsTopBorder} ${textColourSecondary} ${innerBorderRounding} ${buttonsHeight} grid grid-cols-4`}>
          {/* CHILD GRID#1: TOP ROW */}
          <section className={`${textColourTertiary} col-span-4 grid grid-cols-4`}>
            <button id="Clear" className={`${hoverColour}`} onClick={() => handleClear()}>Clear</button>
            <button id="÷" className={`${hoverColour}`} onClick={() => handleOperation(event.target.textContent)}>÷</button>
            <button id="×" className={`${hoverColour}`} onClick={() => handleOperation(event.target.textContent)}>×</button>
            <button id="ce" className={`${hoverColour}`} onClick={() => clearVariable()}>ce</button>
          </section>
          {/* CHILD GRID#2: NUMBERS 1-9 */}
          <section className="col-span-3 row-span-3 grid grid-cols-3 grid-rows-3">
            <button id="7" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>7</button>
            <button id="8" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>8</button>
            <button id="9" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>9</button>
            <button id="4" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>4</button>
            <button id="5" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>5</button>
            <button id="6" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>6</button>
            <button id="1" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>1</button>
            <button id="2" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>2</button>
            <button id="3" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>3</button>
          </section>
          {/* CHILD GRID#3: RIGHT COL */}
          <section className={`${textColourTertiary} row-span-3 grid grid-rows-3`}>
            <button id="-" className={`${hoverColour} ${textColourTertiary} `} onClick={() => handleOperation(event.target.textContent)}>-</button>
            <button id="+" className={`${hoverColour} ${textColourTertiary}`} onClick={() => handleOperation(event.target.textContent)}>+</button>
            <button id="Ans" className={`${hoverColour} ${textColourTertiary}`} onClick={() => handleAnswer()}>Ans</button>
          </section>
          <button id="0" className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>0</button>
          <button id="." className={`${hoverColour}  ${textColourTertiary}`} onClick={() => handleDecimal()}>.</button>
          <div className={`${backgroundColourPrimary} ${textColourPrimary} ${equalsBorder} flex col-span-2`}>
            <button id="=" className="text-center w-full" onClick={() => handleEquals()}>=</button>
          </div>
        </section>
      </section>
    </main >
  );
}
