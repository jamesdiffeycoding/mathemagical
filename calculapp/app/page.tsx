"use client"
import { useState } from "react"
import { sum, divide, multiply, exponent, subtract, remainder } from '../basicOperations.js'
import Decimal from "decimal.js"

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
  const [record, setRecord] = useState("")
  const [variable, setVariable] = useState("")
  const [operation, setOperation] = useState("")
  const [variableIsDecimal, setVariableIsDecimal] = useState(false)

  // FUNCTIONS
  function handleVariable(input: string) {
    if (operation == "" && variable.length == 0) {
      handleClear()
    }
    setVariable(prev => prev += input)
  }
  function clearVariable() {
    setVariable("")
    setVariableIsDecimal(false)
  }
  function handleDecimal() {
    if (variableIsDecimal) {
      return
    }
    setVariableIsDecimal(true)
    handleVariable(".")
  }
  function handleOperation(input: string) {
    if (output == "") {
      setOutput(variable)
      setOperation(input)
      clearVariable()
    } else {
      setOperation(input)
      calculateOutput()
      clearVariable()
    }
  }
  function handleClear() {
    setOutput("")
    setVariable("")
    setRecord("")
    setOperation("")
    setVariableIsDecimal(false)
  }
  function ensureDecimal(num) {
    if (num % 1 === 0) {
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
        setOutput(prev => Number(output) - Number(variable));
        break;
      case "×":
        setOutput(prev => Number(output) * Number(variable));
        break;
      case "/":
        setOutput(prev => Number(output) / Number(variable));
        break;
      default:
    }
  }
  function handleEquals() {
    calculateOutput()
    setVariable("")
    setOperation("")
  }




  return (
    <main className={`${backgroundPattern} flex min-h-screen flex-col align-middle justify-center items-center`}>
      {/* ENTIRE CALCULATOR */}
      <section className={`w-5/6 min-w-350 max-w-1000 ${outerBorderColor} ${backgroundColourPrimary} border-4 ${outerBorderRounding} text-[25px] font-bold`}>
        <div className="text-red-500">
          <p>Type number</p>
          <p>Press +</p>
          <p>Type number</p>
          <p>Press =</p>
        </div>
        <div>Variable: {variable}</div>
        <div>Operation: {operation}</div>
        <div>Output: {output}</div>

        <section className={`${backgroundColourPrimary} ${textColourPrimary} ${innerBorderRounding} min-h-[80px] flex flex-col justify-between rounded-b-none w-full text-right p-4`}>
          {/* CALCULATION */}
          <section className="text-xs">{record}
          </section>
          {/* OUTPUT */}
          <section className="text-[40px]">{output == "" ? (variable == "" ? "0" : "") : output} {operation} {variable}
          </section>
        </section>
        {/* BUTTONS SECTION */}
        <section className={`${backgroundColourSecondary} ${buttonsTopBorder} ${textColourSecondary} ${innerBorderRounding} ${buttonsHeight} grid grid-cols-4`}>
          {/* TOP ROW */}
          <section className={`${textColourTertiary} col-span-4 grid grid-cols-4`}>
            <button className={`${hoverColour}`} onClick={() => handleClear()}>Clear</button>
            <button className={`${hoverColour}`} onClick={() => handleOperation(event.target.textContent)}>÷</button>
            <button className={`${hoverColour}`} onClick={() => handleOperation(event.target.textContent)}>×</button>
            <button className={`${hoverColour}`} onClick={() => clearVariable()}>ce</button>
          </section>
          <button className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>7</button>
          <button className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>8</button>
          <button className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>9</button>
          <button className={`${hoverColour} ${textColourTertiary} `} onClick={() => handleOperation(event.target.textContent)}>-</button>
          <button className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>4</button>
          <button className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>5</button>
          <button className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>6</button>
          <button className={`${hoverColour} ${textColourTertiary}`} onClick={() => handleOperation(event.target.textContent)}>+</button>
          <button className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>1</button>
          <button className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>2</button>
          <button className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>3</button>
          {/* EQUALS */}
          <div className={`${backgroundColourPrimary} ${textColourPrimary} ${equalsBorder} row-span-2 flex align-middle`}>
            <button className="text-center w-full" onClick={() => handleEquals()}>=</button>
          </div>
          <button className={`${hoverColour}`} onClick={() => handleOperation(event.target.textContent)}>%</button>
          <button className={`${hoverColour}`} onClick={() => handleVariable(event.target.textContent)}>0</button>
          <button className={`${hoverColour}`} onClick={() => handleDecimal()}>.</button>
        </section>
      </section>
    </main >
  );
}
