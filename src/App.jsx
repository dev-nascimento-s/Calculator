import { useState } from "react";
import Result from "./components/Result";
import Button from "./components/Button";

function App() {
  // ESTADOS
  const [result, setResult] = useState("0");
  const [expression, setExpression] = useState("");
  const [previousNumber, setPreviousNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);


  const addNumber = (number) => {
    if (waitingForNewNumber) {
      setResult(number);
      setExpression((prev) => prev + number);
      setWaitingForNewNumber(false);
    } else {
      setResult((prev) => (prev === "0" ? number : prev + number));
      setExpression((prev) => prev + number);
    }
  };

  const chooseOperator = (op) => {
    if (previousNumber === null) {
      setPreviousNumber(result);
    }
    setOperator(op);
    setExpression((prev) => prev + op);
    setWaitingForNewNumber(true);
  };

  const calculateResult = () => {
    if (previousNumber === null || operator === null) return;

    const num1 = Number(previousNumber);
    const num2 = Number(result);



    let newResult;

    switch (operator) {
      case "+":
        newResult = num1 + num2;
        break;

      case "-":
        newResult = num1 - num2;
        break;

      case "*":
        newResult = num1 * num2;
        break;

      case "/":
        newResult = num2 !== 0 ? num1 / num2 : "Error";
        break;

      default:
        newResult = "Operator invalid";
    }


    setResult(String(newResult));
    setExpression(String(newResult));
    setPreviousNumber(null);
    setOperator(null);
    setWaitingForNewNumber(true);
  };

  const clearAll = () => {
    setResult("0");
    setExpression("");
    setPreviousNumber(null);
    setOperator(null);
    setWaitingForNewNumber(false);
  };


  const buttons = [
    { label: "C", action: clearAll, type: "special" },
    { label: "/", action: () => chooseOperator("/") },
    { label: "*", action: () => chooseOperator("*") },
    { label: "-", action: () => chooseOperator("-") },

    { label: "7", action: () => addNumber("7") },
    { label: "8", action: () => addNumber("8") },
    { label: "9", action: () => addNumber("9") },
    { label: "+", action: () => chooseOperator("+") },

    { label: "4", action: () => addNumber("4") },
    { label: "5", action: () => addNumber("5") },
    { label: "6", action: () => addNumber("6") },
    { label: "=", action: calculateResult, type: "special" },

    { label: "1", action: () => addNumber("1") },
    { label: "2", action: () => addNumber("2") },
    { label: "3", action: () => addNumber("3") },
    { label: ".", action: () => addNumber(".") },

    { label: "0", action: () => addNumber("0") },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 rounded-3xl shadow-2xl p-6 w-full max-w-sm">
        <Result value={expression || "0"} />

        <div className="grid grid-cols-4 gap-4">
          {buttons.map((btn) => (
            <Button key={btn.label} type={btn.type} onClick={btn.action}>
              {btn.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
