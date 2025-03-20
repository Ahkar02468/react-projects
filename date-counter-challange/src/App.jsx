import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(1);
  const today = new Date();
  today.setDate(today.getDate() + count);
  // const handleStepDown = () => {
  //   setStep((s) => s - 1);
  // };
  // const handleStepUp = () => {
  //   setStep((s) => s + 1);
  // };
  const handleCountDown = () => {
    setCount((c) => c - step);
  };
  const handleCountUp = () => {
    setCount((c) => c + step);
  };
  const handleReset = () => {
    setCount(1);
    setStep(1);
  };

  return (
    <div className="app">
      {/* <button onClick={handleStepDown}>-</button> */}
      <div>
        <input
          type="range"
          min="1"
          max="100"
          value={step}
          onChange={(e) => setStep(+e.target.value)}
        />
      </div>
      <span> Step: {step} </span>
      <br />
      {/* <button onClick={handleStepUp}>+</button>
       */}
      <button onClick={handleCountDown}>-</button>
      <span> Count: {count} </span>
      <button onClick={handleCountUp}>+</button>
      <br />
      {(step > 1 || count > 1) && <button onClick={handleReset}>Reset</button>}
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
