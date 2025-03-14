import { useState } from "react";

function App() {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const today = new Date();
  today.setDate(today.getDate() + count);
  const handleStepDown = () => {
    setStep((s) => s - 1);
  };
  const handleStepUp = () => {
    setStep((s) => s + 1);
  };
  const handleCountDown = () => {
    setCount((c) => c - step);
  };
  const handleCountUp = () => {
    setCount((c) => c + step);
  };
  const handleReset = () => {
    setCount(0);
    setStep(0);
  };

  return (
    <div className="app">
      <button onClick={handleStepDown}>-</button>
      <span> Step: {step} </span>
      <button onClick={handleStepUp}>+</button>
      <br />
      <button onClick={handleCountDown}>-</button>
      <span> Count: {count} </span>
      <button onClick={handleCountUp}>+</button>
      <br />
      <button onClick={handleReset}>Reset</button>
      <p>
        {count === 0
          ? `Today is ${today.toDateString()}`
          : count > 0
          ? `${count} days from today is ${today.toDateString()}`
          : `${Math.abs(count)} days ago was ${today.toDateString()}`}
      </p>
    </div>
  );
}

export default App;
